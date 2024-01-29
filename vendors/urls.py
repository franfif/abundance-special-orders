from django.urls import path

from . import views

app_name = "vendors"
urlpatterns = [
    path("", views.VendorListCreateView.as_view(), name="list-vendors"),
    path("<int:pk>/edit_vendor", views.VendorUpdateView.as_view(), name="edit-vendor"),
    path(
        "<int:pk>/delete_vendor", views.VendorDeleteView.as_view(), name="delete-vendor"
    ),
]
