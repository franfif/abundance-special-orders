from django.db.models import Q
from django_filters import CharFilter
from .models import Customer

from utils.filters import FilterWithAny


class CustomerFilter(FilterWithAny):
    customer_full_info = CharFilter(
        label="Customer (first, last and/or phone number)",
        method="search_customer",
    )

    def search_customer(self, queryset, name, value):
        for term in value.split():
            queryset = queryset.filter(
                Q(first_name__icontains=term)
                | Q(last_name__icontains=term)
                | Q(company__icontains=term)
                | Q(phone_number__icontains=term)
            )
        return queryset

    class Meta:
        model = Customer
        fields = ["customer_full_info", "status"]
