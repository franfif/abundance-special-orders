from django import forms

from . import models


class VendorForm(forms.ModelForm):
    class Meta:
        model = models.Vendor
        fields = [
            "name",
            "ordering_method",
            "order_day",
            "delivery_day",
        ]
