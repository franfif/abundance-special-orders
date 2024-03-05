from django.urls import path

from . import views

app_name = "customers"
urlpatterns = [
    path("", views.CustomerListCreateView.as_view(), name="list-customers"),
    path(
        "<int:pk>/edit_customer",
        views.CustomerUpdateView.as_view(),
        name="edit-customer",
    ),
    path(
        "<int:pk>/delete_customer",
        views.CustomerDeleteView.as_view(),
        name="delete-customer",
    ),
]
