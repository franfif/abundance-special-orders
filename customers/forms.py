from django import forms

from . import models


class CustomerForm(forms.ModelForm):
    class Meta:
        model = models.Customer
        fields = [
            "first_name",
            "last_name",
            "company",
            "phone_number",
            "status",
        ]
        labels = {
            "phone_number": "Phone #",
        }