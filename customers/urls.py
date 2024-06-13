from django.urls import path

from orders.views import OrderListCreateView
from .views import (
    CustomerListCreateView,
    CustomerUpdateView,
    CustomerDeleteView,
    CustomerOrderListView,
    filter_customers,
)

app_name = "customers"
urlpatterns = [
    path("", CustomerListCreateView.as_view(), name="list-customers"),
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
        OrderListCreateView.as_view(),
        name="customer-orders",
    ),
]
