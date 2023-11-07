from django.urls import path

from . import views

app_name = "orders"
urlpatterns = [
    path("", views.OrderListView.as_view(), name="home"),
    path("new_order/", views.OrderCreateView.as_view(), name="create-order"),
    path("<int:pk>/edit_order/", views.OrderUpdateView.as_view(), name="edit-order"),
    path("trash/", views.trash, name="trash"),
]
