from django.urls import path

from . import views

app_name = "orders"
urlpatterns = [
    path("", views.home, name="home"),
    path("new_order/", views.OrderCreateView.as_view(), name="create-order"),
    path("<int:order_id>/edit_order", views.edit_order, name="edit-order"),
    path("trash/", views.trash, name="trash"),
]
