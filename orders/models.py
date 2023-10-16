from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.urls import reverse


class Vendor(models.Model):
    name = models.CharField(max_length=128)
    ordering_method = models.CharField(max_length=64, blank=True, null=True)


class CustomerStatus(models.Model):
    class Meta:
        verbose_name_plural = "customer statuses"

    NON_SHAREHOLDER = "NON_SHAREHOLDER"
    SHAREHOLDER = "SHAREHOLDER"
    SHAREHOLDER_RESALE = "SHAREHOLDER_RESALE"
    EMPLOYEE = "EMPLOYEE"

    STATUS_CHOICES = [
        (NON_SHAREHOLDER, "Non-shareholder"),
        (SHAREHOLDER, "Shareholder"),
        (SHAREHOLDER_RESALE, "Shareholder Resale"),
        (EMPLOYEE, "Employee"),
    ]
    status = models.CharField(choices=STATUS_CHOICES, max_length=64, unique=True)
    margin = models.DecimalField(
        decimal_places=2,
        max_digits=6,
        validators=[MinValueValidator(0.0), MaxValueValidator(100.0)],
    )

    def __str__(self):
        return f"{dict(self.STATUS_CHOICES)[str(self.status)]}, {self.margin}%"


class Customer(models.Model):
    first_name = models.CharField(max_length=128)
    last_name = models.CharField(max_length=128)
    company = models.CharField(max_length=128, null=True, blank=True)
    phone_number = models.CharField(max_length=128)
    status = models.ForeignKey(CustomerStatus, on_delete=models.PROTECT)


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
    has_bottle_deposit = models.BooleanField(null=True, blank=True)
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
