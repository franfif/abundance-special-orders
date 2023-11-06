from django import forms
from django_select2 import forms as s2forms

from . import models


class CustomerWidget(s2forms.ModelSelect2Widget):
    search_fields = [
        "first_name__icontains",
        "last_name__icontains",
    ]


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
            "memo",
            "employee_initials",
        ]
        # fields = "__all__"
        widgets = {
            "customer": CustomerWidget,
        }


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
