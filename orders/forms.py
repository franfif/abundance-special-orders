from django import forms
from django_select2 import forms as s2forms

from .models import Order
from customers.models import Customer, CustomerStatus

from customers.forms import CustomerForm


class CustomerWidget(s2forms.ModelSelect2Widget):
    search_fields = [
        "first_name__icontains",
        "last_name__icontains",
    ]


class CreateOrderForm(forms.ModelForm):
    new_customer_form = CustomerForm()

    class Meta:
        model = Order
        fields = [
            "description",
            "vendor",
            "product_number",
            "quantity",
            "book_price",
            "paid",
            "has_bottle_deposit",
            "number_bottle_deposit",
            "memo",
            "employee_initials",
            "customer",
            "is_stand_by",
        ]
        widgets = {
            "customer": CustomerWidget,
        }
        labels = {
            "product_number": "Product #",
            "has_bottle_deposit": "Bottle Deposit",
            "number_bottle_deposit": "BD",
            "is_stand_by": "Stand By",
            "phone_number": "Phone #",
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Set the custom label for the ForeignKey field
        self.fields['vendor'].empty_label = 'Vendor'

    def clean(self):
        new_customer_data = None
        if not self.data.get("customer"):
            new_customer_data = {
                "first_name": self.data.get("first_name"),
                "last_name": self.data.get("last_name"),
                "company": self.data.get("company"),
                "phone_number": self.data.get("phone_number"),
            }
            if self.data.get("status"):
                new_customer_data["status"] = CustomerStatus.objects.get(
                    id=self.data.get("status")
                )

        cleaned_data = super().clean()
        customer = cleaned_data.get("customer")

        if not customer and new_customer_data is None:
            raise forms.ValidationError(
                "Select an existing customer or enter a new customer's first name."
            )

        if not customer and any(new_customer_data.values()):
            # Create a new customer if it doesn't exist
            new_customer = Customer.objects.create(**new_customer_data)
            cleaned_data["customer"] = new_customer

        return cleaned_data


class EditOrderForm(forms.ModelForm):
    class Meta:
        model = Order
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
