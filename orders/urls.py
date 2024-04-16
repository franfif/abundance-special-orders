from django.urls import path

from . import views

app_name = "orders"
urlpatterns = [
    path("", views.OrderListView.as_view(), name="home"),
    path("new_order/", views.OrderCreateView.as_view(), name="create-order"),
    path("<int:pk>/edit_order/", views.OrderUpdateView.as_view(), name="edit-order"),
    path("<int:pk>/delete_order/", views.send_order_to_trash, name="delete-order"),
    path("<int:pk>/restore_order/", views.restore_order, name="restore-order"),
    path(
        "order_update_status/<int:order_id>/<action>/",
        views.order_update_status,
        name="order-update-status",
    ),
]
