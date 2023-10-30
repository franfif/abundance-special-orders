from django.db import models


class Vendor(models.Model):
    DAYS_OF_WEEK = (
        (0, "Monday"),
        (1, "Tuesday"),
        (2, "Wednesday"),
        (3, "Thursday"),
        (4, "Friday"),
        (5, "Saturday"),
        (6, "Sunday"),
    )

    name = models.CharField(max_length=128)
    ordering_method = models.CharField(max_length=64, blank=True, null=True)
    order_day = models.CharField(
        max_length=1, choices=DAYS_OF_WEEK, blank=True, null=True
    )
    delivery_day = models.CharField(
        max_length=1, choices=DAYS_OF_WEEK, blank=True, null=True
    )

    def __str__(self):
        return self.name
