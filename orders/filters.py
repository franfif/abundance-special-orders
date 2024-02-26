from django.db.models import Q
from django_filters import (
    FilterSet,
    ChoiceFilter,
    BooleanFilter,
    CharFilter,
    OrderingFilter,
)
from .models import Order
from .widgets import BooleanRadioSelect


class FilterWithAny(FilterSet):
    def __init__(self, *args, **kwargs):
        super(FilterWithAny, self).__init__(*args, **kwargs)

        for name, field in self.filters.items():
            if isinstance(field, ChoiceFilter):
                # Add "Any" entry to choice fields.
                field.extra["empty_label"] = "Any " + name


class OrderFilter(FilterWithAny):
    has_bottle_deposit = BooleanFilter(
        widget=BooleanRadioSelect, label="Bottle Deposit"
    )
    is_stand_by = BooleanFilter(widget=BooleanRadioSelect, label="Stand By")
    paid = BooleanFilter(widget=BooleanRadioSelect, label="Paid")
    customer_full_info = CharFilter(
        label="Customer (first, last and/or phone number)", method="search_customer"
    )

    ordering = OrderingFilter(
        fields=(
            ("customer__first_name", "customer first name"),
            ("customer__last_name", "customer last name"),
            ("vendor__name", "vendor"),
            ("status", "status"),
            ("date_created", "date created"),
            ("date_ordered", "date ordered"),
            ("date_received", "date received"),
            ("date_called", "date called"),
            ("date_picked_up", "date picked up"),
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
        }
