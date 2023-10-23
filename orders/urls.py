from django.urls import path

from . import views

app_name = "orders"
urlpatterns = [
    path("", views.home, name="home"),
    path("create_order/", views.create_order, name="create_order"),
    path("<int:order_id>/edit_order", views.edit_order, name="edit_order"),
]
