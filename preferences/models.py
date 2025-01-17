from django.contrib.auth.models import User
from django.db import models


class Preference(models.Model):
    CARDS = "CARDS"
    LIST = "LIST"

    VIEW_CHOICES = [
        (CARDS, "Cards"),
        (LIST, "List"),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    customer_view = models.CharField(choices=VIEW_CHOICES, max_length=64, default=LIST)
    vendor_view = models.CharField(choices=VIEW_CHOICES, max_length=64, default=CARDS)
    order_view = models.CharField(choices=VIEW_CHOICES, max_length=64, default=CARDS)

    def __str__(self):
        return self.user.username
