from django.urls import path

from . import views

app_name = "vendors"
urlpatterns = [
    path("", views.list_vendors, name="list_vendors"),
    path("create_vendor/", views.create_vendor, name="create_vendor"),
    # path("<int:vendor_id>/edit_vendor", views.edit_vendor, name="edit_vendor"),
    # path("trash/", views.trash, name="trash"),
]
