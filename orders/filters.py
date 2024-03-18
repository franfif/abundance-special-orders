from django.db.models import Q
from django_filters import (
    BooleanFilter,
    CharFilter,
    OrderingFilter,
)
from utils.filters import FilterWithAny
from .models import Order
from .widgets import BooleanRadioSelect


class OrderFilter(FilterWithAny):
    has_bottle_deposit = BooleanFilter(
        widget=BooleanRadioSelect, label="Bottle Deposit"
    )
    is_stand_by = BooleanFilter(widget=BooleanRadioSelect, label="Stand By")
    is_cancelled = BooleanFilter(widget=BooleanRadioSelect, label="Cancelled")
    paid = BooleanFilter(widget=BooleanRadioSelect, label="Paid")
    customer_full_info = CharFilter(
        label="Customer (first, last and/or phone number)", method="search_customer"
    )

    ordering = OrderingFilter(
        choices=(
            ("-date_created", "Date Created (newest first)"),
            ("date_created", "Date Created (oldest first)"),
            ("vendor__name", "Vendor (A-Z)"),
            ("-vendor__name", "Vendor (Z-A)"),
            ("status", "Status (A-Z)"),
            ("-status", "Status (Z-A)"),
            ("customer__first_name", "Customer First Name (A-Z)"),
            ("-customer__first_name", "Customer First Name (Z-A)"),
            ("customer__last_name", "Customer Last Name (A-Z)"),
            ("-customer__last_name", "Customer Last Name (Z-A)"),
            ("-date_ordered", "Date Ordered (newest first)"),
            ("date_ordered", "Date Ordered (oldest first)"),
            ("-date_received", "Date Received (newest first)"),
            ("date_received", "Date Received (oldest first)"),
            ("-date_called", "Date Called (newest first)"),
            ("date_called", "Date Called (oldest first)"),
            ("-date_picked_up", "Date Picked Up (newest first)"),
            ("date_picked_up", "Date Picked Up (oldest first)"),
        ),
    )

    def search_customer(self, queryset, name, value):
        for term in value.split():
            queryset = queryset.filter(
                Q(customer__first_name__icontains=term)
                | Q(customer__last_name__icontains=term)
                | Q(customer__company__icontains=term)
                | Q(customer__phone_number__icontains=term)
            )
        return queryset

    class Meta:
        model = Order
        fields = {
            "vendor",
            "has_bottle_deposit",
            "paid",
            "status",
            "is_stand_by",
            "is_cancelled",
        }
