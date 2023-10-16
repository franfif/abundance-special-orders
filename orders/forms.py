from django import forms

from . import models


class CreateOrderForm(forms.ModelForm):
    class Meta:
        model = models.Order
        fields = [
            "description",
            "vendor",
            "product_number",
            "quantity",
            "book_price",
            "customer",
            "paid",
            "employee_initials",
        ]
