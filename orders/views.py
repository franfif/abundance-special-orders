from django.shortcuts import redirect, reverse, get_object_or_404
from django.contrib import messages
from django.views import generic
from django.http import JsonResponse
from django.db.models.functions import Lower

from django_filters.views import FilterView

from . import models, forms
from .templatetags.orders_extras import previous_step, next_step
from .filters import OrderFilter


class OrderListView(FilterView):
    model = models.Order
    filterset_class = OrderFilter
    template_name = "order_filter.html"
    context_object_name = "filter"

    def get_queryset(self):
        queryset = super().get_queryset()

        if "customer_id" in self.kwargs:
            queryset = queryset.filter(customer__id=self.kwargs["customer_id"])
        elif "status" in self.kwargs:
            queryset = queryset.filter(status=self.kwargs["status"].upper())
        else:
            queryset = queryset.exclude(status=models.Order.DELETED)

        # Set default ordering
        default_ordering = self.request.GET.get("ordering", None)
        if not default_ordering:
            # Default ordering if none is provided in the request
            queryset = queryset.order_by("-date_created", Lower("vendor__name"))
        return queryset


class OrderCreateView(generic.CreateView):
    model = models.Order
    form_class = forms.CreateOrderForm

    def get_success_url(self):
        # Save and create "another" order
        if "another" in self.request.POST:
            return reverse("orders:create-order")
        return reverse("orders:home")

    def get_context_data(self, **kwargs):
        # Call the base implementation first to get a context
        context = super().get_context_data(**kwargs)
        # Add in a QuerySet of all the orders
        context["order_list"] = models.Order.objects.exclude(
            status=models.Order.DELETED
        ).order_by("-date_created", Lower("vendor__name"))
        context["action"] = "create"
        return context

    def form_valid(self, form):
        order = form.save(commit=False)
        order.update_status()
        return super().form_valid(form)


class OrderUpdateView(generic.UpdateView):
    model = models.Order
    form_class = forms.CreateOrderForm

    def get_success_url(self):
        return reverse("orders:home")

    def get_context_data(self, **kwargs):
        # Call the base implementation first to get a context
        context = super().get_context_data(**kwargs)
        # Add in a QuerySet of all the orders
        context["order_list"] = models.Order.objects.exclude(
            status=models.Order.DELETED
        ).order_by("-date_created", Lower("vendor__name"))
        context["action"] = "update"
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


def order_update_status(request, order_id, action):
    if request.method == "PUT":
        # Retrieve instance and update status
        order = get_object_or_404(models.Order, id=order_id)
        if action == "previous_step":
            if order.status == models.Order.INCOMPLETE:
                order.send_to_trash()
                # return JsonResponse({"status": "deleted"})
            order.previous_status()
        elif action == "next_step":
            if order.status == models.Order.INCOMPLETE:
                redirect_data = {
                    "redirect": reverse("orders:edit-order", kwargs={"pk": order.id}),
                }
                return JsonResponse(redirect_data)
            order.next_status()
        order.save()

        data = {
            "id": order.id,
            "status": order.get_status_display(),
            "date_ordered": order.date_ordered,
            "date_received": order.date_received,
            "date_called": order.date_called,
            "date_picked_up": order.date_picked_up,
            "status_previous_step": previous_step(order.status),
            "status_next_step": next_step(order.status),
        }

        return JsonResponse(data)


def view_send_to_trash(request, pk):
    order = get_object_or_404(models.Order, id=pk)
    if request.method == "POST":
        order.send_to_trash()
        messages.success(
            request,
            f"The order has been successfully sent to trash. It will be permanently deleted in 30 days.",
        )
        return redirect("orders:home")
    return redirect("orders:home")


def view_restore(request, pk):
    order = get_object_or_404(models.Order, id=pk)
    print(order.description)
    if request.method == "POST":
        order.restore()
        messages.success(
            request,
            f"The order has been successfully restored.",
        )
        return redirect("orders:filtered-orders", status="deleted")
    return redirect("orders:home")
