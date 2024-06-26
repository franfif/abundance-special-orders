from django_filters import (
    BooleanFilter,
    CharFilter,
    OrderingFilter,
)
from utils.filters import FilterWithAny
from .models import Order
from utils.widgets import BooleanRadioSelect


class OrderFilter(FilterWithAny):
    has_bottle_deposit = BooleanFilter(
        widget=BooleanRadioSelect, label="Bottle Deposit"
    )
    is_stand_by = BooleanFilter(widget=BooleanRadioSelect, label="Stand By")
    is_cancelled = BooleanFilter(
        widget=BooleanRadioSelect, label="Cancelled", initial=False
    )
    paid = BooleanFilter(widget=BooleanRadioSelect, label="Paid")
    customer_full_info = CharFilter(
        label="Customer information", method="search_customer"
    )

    ordering = OrderingFilter(
        choices=(
            ("-date_created", "Date Created (newest first)"),
            ("date_created", "Date Created (oldest first)"),
            ("customer__first_name", "Customer First Name (A-Z)"),
            ("customer__last_name", "Customer Last Name (A-Z)"),
            ("-date_ordered", "Date Ordered (newest first)"),
            ("-date_received", "Date Received (newest first)"),
            ("-date_called", "Date Called (newest first)"),
            ("-date_picked_up", "Date Picked Up (newest first)"),
        ),
        empty_label=None,
        null_label=None,
    )

    def __init__(self, *args, **kwargs):
        initial = kwargs.pop("initial", {})
        super().__init__(*args, **kwargs)
        print("init initial:", initial)
        # Set initial values for BooleanFilter fields
        for field_name, value in initial.items():
            print("field_name:", field_name)
            print("value:", value)
            if field_name in self.filters:
                self.filters[field_name].field.initial = value
                print(self.filters[field_name].field.initial)

        self.has_bottle_deposit = BooleanFilter(
            widget=BooleanRadioSelect,
            label="Bottle Deposit",
            initial=initial.get("has_bottle_deposit", ""),
        )
        self.is_stand_by = BooleanFilter(
            widget=BooleanRadioSelect,
            label="Stand By",
            initial=initial.get("is_stand_by", ""),
        )
        self.is_cancelled = BooleanFilter(
            widget=BooleanRadioSelect,
            label="Cancelled",
            initial=initial.get("is_cancelled", False),
        )
        self.paid = BooleanFilter(
            widget=BooleanRadioSelect, label="Paid", initial=initial.get("paid", "")
        )
        self.customer_full_info = CharFilter(
            label="Customer information",
            method="search_customer",
            initial=initial.get("customer_full_info", ""),
        )

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


# Filter orders for a given customer
class CustomerOrderFilter(OrderFilter):
    # Show cancelled orders by default
    is_cancelled = BooleanFilter(widget=BooleanRadioSelect, label="Cancelled")
