from django.shortcuts import redirect, reverse, get_object_or_404
from django.db.models import Q
from django.contrib import messages
from django.template.loader import render_to_string
from django.views import generic
from django.http import JsonResponse
from django.db.models.functions import Lower

from django_filters.views import FilterView

from .models import Order
from .forms import CreateOrderForm
from .templatetags.orders_extras import previous_step, next_step
from .filters import OrderFilter, CustomerOrderFilter


class OrderFilterView(FilterView):
    model = Order
    filterset_class = OrderFilter
    template_name = "orders/order_base.html"
    context_object_name = "filter"

    def get_queryset(self):
        queryset = super().get_queryset()

        if "customer_id" in self.kwargs:
            queryset = queryset.filter(customer__id=self.kwargs["customer_id"])
        elif "status" in self.kwargs:
            queryset = queryset.filter(status=self.kwargs["status"].upper())
        else:
            queryset = queryset.filter(~Q(status=Order.DELETED) & ~Q(is_cancelled=True))

        # Set default ordering
        default_ordering = self.request.GET.get("ordering", None)
        if not default_ordering:
            # Default ordering if none is provided in the request
            queryset = queryset.order_by("-date_created", Lower("vendor__name"))
        return queryset


class OrderListCreateView(generic.CreateView, OrderFilterView):
    form_class = CreateOrderForm

    def get_initial(self):
        try:
            original_order = get_object_or_404(Order, id=self.kwargs["pk"])
            initial = {
                "description": original_order.description,
                "vendor": original_order.vendor,
                "product_number": original_order.product_number,
                "quantity": original_order.quantity,
                "has_bottle_deposit": original_order.has_bottle_deposit,
                "number_bottle_deposit": original_order.number_bottle_deposit,
                "memo": original_order.memo,
                "customer": original_order.customer,
            }
            return initial
        except KeyError:
            return {}

    def get_success_url(self):
        return reverse("orders:home")

    def get_context_data(self, **kwargs):
        # Call the base implementation first to get a context
        context = super().get_context_data(**kwargs)
        # Add in a QuerySet of all the orders
        context["order_list"] = Order.objects.exclude(status=Order.DELETED).order_by(
            "-date_created", Lower("vendor__name")
        )
        context["action"] = "create"
        return context

    def form_valid(self, form):
        order = form.save(commit=False)
        order.update_status()
        return super().form_valid(form)


class OrderUpdateView(generic.UpdateView, OrderFilterView):
    form_class = CreateOrderForm

    def get_success_url(self):
        return reverse("orders:home")

    def get_context_data(self, **kwargs):
        # Call the base implementation first to get a context
        context = super().get_context_data(**kwargs)
        # Add in a QuerySet of all the orders
        context["order_list"] = Order.objects.exclude(status=Order.DELETED).order_by(
            "-date_created", Lower("vendor__name")
        )
        context["action"] = "update"
        context["order"] = self.get_object()
        return context

    def form_valid(self, form):
        order = form.save(commit=False)
        if "delete" in self.request.POST:
            order.send_to_trash()
            messages.success(
                self.request,
                f"The order has been successfully sent to trash. It will be definitely deleted in 30 days.",
            )
            return redirect("orders:home")
        if "restore" in self.request.POST:
            order.restore()
            messages.success(
                self.request,
                f"The order has been successfully restored.",
            )
            return redirect("orders:home")
        order.update_status()
        return super().form_valid(form)


class CustomerOrderListView(OrderListCreateView):
    filterset_class = CustomerOrderFilter

    def get_queryset(self):
        queryset = Order.objects.filter(customer=self.kwargs["customer_id"])

        # Set default ordering
        default_ordering = self.request.GET.get("ordering", None)
        if not default_ordering:
            # Default ordering if none is provided in the request
            queryset = queryset.order_by("-date_created", Lower("vendor__name"))
        return queryset


def filter_orders(request, **kwargs):
    # Create an instance of OrderFilter with the GET parameters
    if "customer_id" in kwargs:
        # Show all orders by customer
        customer_id = kwargs["customer_id"]
        order_filter = CustomerOrderFilter(
            request.GET, queryset=Order.objects.filter(customer=customer_id)
        )
    else:
        # Show all orders except the deleted ones
        order_filter = OrderFilter(
            request.GET, queryset=Order.objects.exclude(status=Order.DELETED)
        )

    # Get the filtered queryset
    filtered_orders = order_filter.qs

    # Set default ordering
    default_ordering = request.GET.get("ordering", None)
    if not default_ordering:
        # Default ordering if none is provided in the request
        filtered_orders = filtered_orders.order_by(
            "-date_created", Lower("vendor__name")
        )

    # Render items to a string
    orders_html = render_to_string(
        "orders/partials/list_orders.html",
        {"order_list": filtered_orders},
        request=request,
    )
    # Convert the list to JSON and return it as a response
    return JsonResponse({"item_list_html": orders_html})


def order_update_status(request, order_id, action):
    if request.method == "PUT":
        # Retrieve instance and update status
        order = get_object_or_404(Order, id=order_id)
        if action == "previous_step" and order.status not in [
            Order.INCOMPLETE,
            Order.READY_TO_ORDER,
        ]:
            order.previous_status()
        elif action == "next_step":
            if order.status == Order.INCOMPLETE:
                redirect_data = {
                    "redirect": reverse("orders:edit-order", kwargs={"pk": order.id}),
                }
                return JsonResponse(redirect_data)
            order.next_status()
        order.save()

        # Render order to a string
        order_html = render_to_string(
            "orders/partials/order_snippet.html",
            {"order": order},
            request=request,
        )
        return JsonResponse({"order": order_html})


def send_order_to_trash(request, pk):
    order = get_object_or_404(Order, id=pk)
    if request.method == "POST":
        order.send_to_trash()
        messages.success(
            request,
            f"The order has been successfully sent to trash. It will be permanently deleted in 30 days.",
        )
        return redirect("orders:home")
    return redirect("orders:home")


def restore_order(request, pk):
    order = get_object_or_404(Order, id=pk)
    print(order.description)
    if request.method == "POST":
        order.restore()
        messages.success(
            request,
            f"The order has been successfully restored.",
        )
        return redirect("orders:filtered-orders", status="deleted")
    return redirect("orders:home")


def force_delete_order(request, pk):
    order = get_object_or_404(Order, id=pk)
    if request.method == "POST":
        order.delete()
        messages.success(
            request,
            f"The order {order.description} has been successfully deleted.",
        )
    return redirect("orders:filtered-orders", status="deleted")


def unpaid_pickup(request, pk):
    order = get_object_or_404(Order, id=pk)
    if request.method == "POST":
        if "paid" in request.POST:
            order.paid = True
        order.next_status()
        order.save()
    return redirect("orders:home")
