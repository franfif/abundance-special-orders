from django_filters import CharFilter
from .models import Customer

from utils.filters import FilterWithAny


class CustomerFilter(FilterWithAny):
    customer_full_info = CharFilter(
        label="Customer (first, last and/or phone number)",
        method="search_customer",
    )

    class Meta:
        model = Customer
        fields = ["customer_full_info", "status"]
