from django.db import models
from django.core.validators import MinValueValidator

from datetime import date, timedelta

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

    ORDER_STATUS = [
        (INCOMPLETE, "Incomplete"),
        (PENDING, "Pending"),
        (READY_TO_ORDER, "Ready to order"),
        (ORDERED, "Ordered"),
        (RECEIVED, "Received"),
        (CALLED, "Called"),
        (PICKED_UP, "Picked-Up"),
        (CANCELED, "Canceled"),
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
    memo = models.TextField(max_length=500, null=True, blank=True)
    employee_initials = models.CharField(max_length=5)

    date_created = models.DateField(auto_now_add=True)
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
            ]
        )

    def send_to_trash(self):
        self.date_deleted = date.today()

    def permanently_delete(self):
        # Permanently delete an order after 30 days
        if self.date_deleted and (
            date.today() - self.date_deleted > timedelta(days=30)
        ):
            self.delete()
