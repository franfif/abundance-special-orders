from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

from decimal import *


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
    first_name = models.CharField(max_length=128, null=True, blank=True)
    last_name = models.CharField(max_length=128, null=True, blank=True)
    company = models.CharField(max_length=128, null=True, blank=True)
    phone_number = models.CharField(max_length=128, null=True, blank=True)
    status = models.ForeignKey(
        CustomerStatus, on_delete=models.PROTECT, null=True, blank=True
    )

    def save(self, *args, **kwargs):
        if self.phone_number:
            self.phone_number = "".join(filter(str.isdigit, self.phone_number))
        super(Customer, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.last_name}, {self.first_name}, {self.phone_number_formatted()}"

    def add_margin(self, book_price):
        return book_price / (Decimal(100) - self.status.margin) * 100

    def phone_number_formatted(self):
        if self.phone_number:
            if len(self.phone_number) == 10:
                return f"({self.phone_number[:3]}) {self.phone_number[3:6]}-{self.phone_number[6:]}"
            if len(self.phone_number) == 7:
                return f"(585) {self.phone_number[:3]}-{self.phone_number[3:]}"
            return self.phone_number
        return None
