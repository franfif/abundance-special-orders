from django.urls import path

from . import views

app_name = "vendors"
urlpatterns = [
    path("", views.list_vendors, name="list-vendors"),
    # path("<int:vendor_id>/edit_vendor", views.edit_vendor, name="edit-vendor"),
    # path("trash/", views.trash, name="trash"),
]
