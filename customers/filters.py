from django.db.models.functions import Lower
from django_filters import CharFilter, OrderingFilter

from .models import Customer

from utils.filters import FilterWithAny


class CustomerFilter(FilterWithAny):
    customer_full_info = CharFilter(
        label="Customer information",
        method="search_customer",
    )

    ordering = OrderingFilter(
        choices=(
            ("lower_last_name", "Last Name (A-Z)"),
            ("-lower_last_name", "Last Name (Z-A)"),
            ("lower_first_name", "First Name (A-Z)"),
            ("-lower_first_name", "First Name (Z-A)"),
        ),
        empty_label=None,
        null_label=None,
    )

    def filter_queryset(self, queryset):
        # Annotate the queryset with lowercase versions of the fields
        queryset = queryset.annotate(
            lower_first_name=Lower("first_name"),
            lower_last_name=Lower("last_name"),
        )
        return super().filter_queryset(queryset)

    class Meta:
        model = Customer
        fields = ["customer_full_info", "status"]
