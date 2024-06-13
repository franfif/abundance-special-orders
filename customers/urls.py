from django.urls import path

from .views import (
    CustomerListCreateView,
    CustomerUpdateView,
    CustomerDeleteView,
    filter_customers,
)
import orders.views

app_name = "customers"
urlpatterns = [
    path("", CustomerListCreateView.as_view(), name="list-customers"),
    path("filter/", filter_customers, name="filter-customers"),
    path(
        "<int:pk>/edit_customer/",
        CustomerUpdateView.as_view(),
        name="edit-customer",
    ),
    path(
        "<int:pk>/delete_customer/",
        CustomerDeleteView.as_view(),
        name="delete-customer",
    ),
    path(
        "<int:customer_id>/orders/",
        orders.views.CustomerOrderListView.as_view(),
        name="customer-orders",
    ),
    path(
        "<int:customer_id>/orders/orders/filter/",
        orders.views.filter_orders,
        name="customer-filter-orders",
    ),
]
