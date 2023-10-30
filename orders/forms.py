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
            "paid",
            "memo",
            "employee_initials",
        ]


class EditOrderForm(forms.ModelForm):
    class Meta:
        model = models.Order
        fields = [
            "description",
            "vendor",
            "product_number",
            "quantity",
            "book_price",
            "paid",
            "memo",
            "employee_initials",
            "date_ordered",
            "date_received",
            "date_called",
            "date_picked_up",
        ]
