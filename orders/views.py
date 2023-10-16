from django.shortcuts import render
from django.views.generic.edit import CreateView

from . import models, forms


class CreateOrderView(CreateView):
    model = models.Order
    fields = [
        "description",
        "vendor",
        "product_number",
        "quantity",
        "book_price",
        # customer needs to be a form in itself
        "customer",
        "paid",
        "memo",
        "employee_initials",
    ]

    # form_class = forms.CreateOrderForm
