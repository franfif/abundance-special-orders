from django.db import models
from django.core.validators import MinValueValidator

from datetime import date, timedelta
from decimal import *

from customers.models import Customer
from vendors.models import Vendor


class Order(models.Model):
    INCOMPLETE = "INCOMPLETE"
    PENDING = "PENDING"
    READY_TO_ORDER = "READY_TO_ORDER"
    ORDERED = "ORDERED"
    RECEIVED = "RECEIVED"
    CALLED = "CALLED"
    PICKED_UP = "PICKED_UP"
    CANCELED = "CANCELED"
    DELETED = "DELETED"

    ORDER_STATUS = [
        (INCOMPLETE, "Incomplete"),
        (PENDING, "Pending"),
        (READY_TO_ORDER, "Ready to order"),
        (ORDERED, "Ordered"),
        (RECEIVED, "Received"),
        (CALLED, "Called"),
        (PICKED_UP, "Picked-Up"),
        (CANCELED, "Canceled"),
        (DELETED, "Deleted"),
    ]

    description = models.CharField(max_length=128)
    vendor = models.ForeignKey(Vendor, on_delete=models.PROTECT, blank=True, null=True)
    product_number = models.CharField(max_length=64, blank=True, null=True)

    quantity = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(1)], blank=True, null=True
    )
    book_price = models.DecimalField(
        decimal_places=2,
        max_digits=6,
        validators=[MinValueValidator(0.0)],
        blank=True,
        null=True,
    )
    has_bottle_deposit = models.BooleanField(default=False)
    number_bottle_deposit = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(1)], blank=True, null=True
    )

    customer = models.ForeignKey(
        Customer, on_delete=models.PROTECT, blank=True, null=True
    )
    paid = models.BooleanField(default=False)

    status = models.CharField(choices=ORDER_STATUS, max_length=64, null=True)
    is_stand_by = models.BooleanField(default=False)
    is_cancelled = models.BooleanField(default=False)
    memo = models.TextField(max_length=500, null=True, blank=True)
    employee_initials = models.CharField(max_length=5)

    date_created = models.DateTimeField(auto_now_add=True)
    date_ordered = models.DateField(null=True, blank=True)
    date_received = models.DateField(null=True, blank=True)
    date_called = models.DateField(null=True, blank=True)
    date_picked_up = models.DateField(null=True, blank=True)

    date_deleted = models.DateField(null=True, blank=True)

    def is_complete(self):
        return all(
            [
                self.vendor is not None,
                self.product_number is not None,
                self.quantity is not None,
                self.book_price is not None,
                not self.has_bottle_deposit or self.number_bottle_deposit is not None,
                self.customer is not None,
                self.total_price() is not None,
            ]
        )

    def previous_status(self):
        match self.status:
            case self.INCOMPLETE:
                self.send_to_trash()
            case self.READY_TO_ORDER:
                self.send_to_trash()
            case self.ORDERED:
                self.date_ordered = None
            case self.RECEIVED:
                self.date_received = None
            case self.CALLED:
                self.date_called = None
            case self.PICKED_UP:
                self.date_picked_up = None
        self.update_status()

    def next_status(self):
        match self.status:
            case self.INCOMPLETE:
                pass
            case self.READY_TO_ORDER:
                self.date_ordered = date.today()
            case self.ORDERED:
                self.date_received = date.today()
            case self.RECEIVED:
                self.date_called = date.today()
            case self.CALLED:
                self.date_picked_up = date.today()
        self.update_status()

    def update_status(self):
        # Order is deleted
        if self.date_deleted is not None:
            self.status = self.DELETED
            self.save()
            return

        # Not using pending status anymore
        # All pending orders are switched to ready to order
        if self.status == self.PENDING:
            self.status = self.READY_TO_ORDER

        # Revive a deleted item with temporary status
        if self.status == self.DELETED and self.date_deleted is None:
            self.status = self.INCOMPLETE
        # Make sure all orders have a status
        if self.status is None:
            self.status = self.INCOMPLETE

        # Order is incomplete
        if not self.is_complete():
            self.status = self.INCOMPLETE
            self.save()
            return

        # Order has a date-related status
        if self.date_picked_up is not None:
            self.status = self.PICKED_UP
        elif self.date_called is not None:
            self.status = self.CALLED
        elif self.date_received is not None:
            self.status = self.RECEIVED
        elif self.date_ordered is not None:
            self.status = self.ORDERED
        # Order is complete and does not have a date-related status
        elif self.is_complete():
            self.status = self.READY_TO_ORDER

        self.save()

    def send_to_trash(self):
        self.date_deleted = date.today()
        self.update_status()

    def restore(self):
        self.date_deleted = None
        self.update_status()

    def permanently_delete(self):
        # Permanently delete an order after 30 days
        if self.date_deleted and (
            date.today() - self.date_deleted > timedelta(days=30)
        ):
            self.delete()

    def total_price(self):
        try:
            return Decimal(
                self.customer.add_margin(self.book_price * self.quantity)
            ).quantize(Decimal("0.01"))
        except TypeError:
            return None
        except AttributeError:
            return None
