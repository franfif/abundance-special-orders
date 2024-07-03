from django.urls import path

from . import views

app_name = "orders"
urlpatterns = [
    path("", views.OrderListCreateView.as_view(), name="home"),
    path("filter/", views.filter_orders, name="filter-orders"),
    path("<int:pk>/edit_order/", views.OrderUpdateView.as_view(), name="edit-order"),
    path("<int:pk>/edit_order/filter/", views.filter_orders, name="filter-orders"),
    path(
        "<int:pk>/copy_order/", views.OrderListCreateView.as_view(), name="copy-order"
    ),
    path("<int:pk>/copy_order/filter/", views.filter_orders, name="filter-orders"),
    path(
        "orders/<status>/", views.OrderListCreateView.as_view(), name="filtered-orders"
    ),
    path(
        "orders/<status>/filter/",
        views.filter_orders,
        name="filter-orders",
    ),
    path("<int:pk>/delete_order/", views.send_order_to_trash, name="delete-order"),
    path("<int:pk>/restore_order/", views.restore_order, name="restore-order"),
    path(
        "order_update_status/<int:order_id>/<action>/",
        views.order_update_status,
        name="order-update-status",
    ),
    path(
        "<int:pk>/force_delete_order/",
        views.force_delete_order,
        name="force-delete-order",
    ),
    path(
        "<int:pk>/unpaid_pickup/",
        views.unpaid_pickup,
        name="unpaid-pickup",
    ),
]
