from django.urls import path, include

from .views import (
    CustomerListCreateView,
    CustomerUpdateView,
    CustomerDeleteView,
    filter_customers,
    display_cards,
    display_list,
)
import orders.views

app_name = "customers"

filter_and_display_paths = [
    path("filter/", filter_customers, name="filter-orders"),
    path("display_cards/", display_cards, name="display-cards"),
    path("display_list/", display_list, name="display-list"),
]

urlpatterns = [
    path("",
        include(
            [
                path("", CustomerListCreateView.as_view(), name="list-customers"),
                *filter_and_display_paths,
            ]
        ),
    ),
    path("<int:pk>/edit_customer/",
        include(
            [
                path("", CustomerUpdateView.as_view(), name="edit-customer"),
                *filter_and_display_paths,
            ]
        ),
    ),
    path(
        "<int:pk>/delete_customer/",
        CustomerDeleteView.as_view(),
        name="delete-customer",
    ),
    path(
        "<int:customer_id>/orders/",
        include(
            [
                path("", orders.views.CustomerOrderListView.as_view(), name="customer-orders"),
                path("filter/", orders.views.filter_orders, name="customer-filter-orders"),
                path("display_cards/", orders.views.display_cards, name="order-display-cards"),
                path("display_list/", orders.views.display_list, name="order-display-list"),
            ]
        ),
    ),
]
