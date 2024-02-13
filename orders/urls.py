from django.urls import path

from . import views

app_name = "orders"
urlpatterns = [
    path("", views.OrderListView.as_view(), name="home"),
    path("orders/<status>/", views.OrderListView.as_view(), name="filtered-orders"),
    path("new_order/", views.OrderCreateView.as_view(), name="create-order"),
    path("<int:pk>/edit_order/", views.OrderUpdateView.as_view(), name="edit-order"),
    # path("<int:pk>/trash_order/", views.send_to_trash, name="trash-order"),
    path("<pk>/restore_order/", views.view_restore, name="restore-order"),
]
