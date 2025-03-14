from django import forms
from django.shortcuts import get_object_or_404
from django_select2 import forms as s2forms
from bootstrap_datepicker_plus.widgets import DatePickerInput

from .models import Order, Vendor
from customers.models import Customer, CustomerStatus

from customers.forms import CustomerForm


class CustomerWidget(s2forms.ModelSelect2Widget):
    search_fields = [
        "first_name__icontains",
        "last_name__icontains",
        "phone_number__icontains",
        "email__icontains",
    ]

    def build_attrs(self, base_attrs, extra_attrs=None):
        attrs = super().build_attrs(base_attrs, extra_attrs)
        attrs["data-minimum-input-length"] = 0
        attrs["data-placeholder"] = "Search a customer by their name or phone number"
        return attrs

    def get_queryset(self):
        return Customer.objects.order_by("last_name", "first_name")


class VendorWidget(s2forms.ModelSelect2Widget):
    search_fields = [
        "name__icontains",
    ]

    def build_attrs(self, base_attrs, extra_attrs=None):
        attrs = super().build_attrs(base_attrs, extra_attrs)
        attrs["data-minimum-input-length"] = 0
        attrs["data-placeholder"] = "Search a vendor by their name"
        return attrs


class CreateOrderForm(forms.ModelForm):
    new_customer_form = CustomerForm()
    create_new_customer = forms.BooleanField(
        required=False, label="Create a new customer", initial="false"
    )

    class Meta:
        model = Order
        fields = [
            "description",
            "vendor",
            "product_number",
            "quantity",
            "book_price",
            "paid",
            "is_suspended",
            "has_bottle_deposit",
            "number_bottle_deposit",
            "memo",
            "employee_initials",
            "customer",
            "create_new_customer",
            "is_stand_by",
            "is_cancelled",
            "date_ordered",
            "date_received",
            "date_called",
            "date_picked_up",
        ]

        date_picker_options = {
            "format": "MM/DD/YYYY",
            "extraFormats": ["MM/DD/YY"],
            "showClose": True,
            "showClear": True,
            "showTodayButton": True,
            "widgetPositioning": {
                "vertical": "bottom",
            },
        }

        widgets = {
            "customer": CustomerWidget,
            "vendor": VendorWidget,
            "date_ordered": DatePickerInput(options=date_picker_options),
            "date_received": DatePickerInput(options=date_picker_options),
            "date_called": DatePickerInput(options=date_picker_options),
            "date_picked_up": DatePickerInput(options=date_picker_options),
        }

        labels = {
            "product_number": "Product #",
            "has_bottle_deposit": "Bottle Deposit",
            "is_suspended": "Suspended",
            "is_stand_by": "Stand By",
            "is_cancelled": "Cancelled",
            "date_picked_up": "Date picked-up",
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Set the custom label for the Vendor field
        self.fields["vendor"].empty_label = "Vendor"

    def clean(self):
        cleaned_data = super().clean()

        if self.data.get("create_new_customer") == "true":
            # Create a new customer
            new_customer_data = {
                "first_name": self.data.get("first_name"),
                "last_name": self.data.get("last_name"),
                "company": self.data.get("company"),
                "phone_number": self.data.get("phone_number"),
                "email": self.data.get("email"),
            }
            if any(new_customer_data.values()):
                if self.data.get("status"):
                    new_customer_data["status"] = get_object_or_404(
                        CustomerStatus, id=self.data.get("status")
                    )
                new_customer = Customer.objects.create(**new_customer_data)
                cleaned_data["customer"] = new_customer

        return cleaned_data
