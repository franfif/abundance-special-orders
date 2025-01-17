from django.urls import path, include

from . import views

app_name = "orders"

filter_and_display_paths = [
    path("filter/", views.filter_orders, name="filter-orders"),
    path("display_cards/", views.display_cards, name="display-cards"),
    path("display_list/", views.display_list, name="display-list"),
]

urlpatterns = [
    path("",
        include(
            [
                path("", views.OrderListCreateView.as_view(), name="home"),
                *filter_and_display_paths,
            ]
        ),
    ),
    path("<int:pk>/edit_order/",
        include(
            [
                path("", views.OrderUpdateView.as_view(), name="edit-order"),
                *filter_and_display_paths,
            ]
         ),
    ),
    path(
        "<int:pk>/copy_order/",
        include(
            [
                path("", views.OrderListCreateView.as_view(), name="copy-order"),
                *filter_and_display_paths,
            ]
        ),
    ),
    path(
        "orders/<status>/",
        include (
            [
                path("", views.OrderListCreateView.as_view(), name="filtered-orders"),
                *filter_and_display_paths,
            ]
        ),
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
