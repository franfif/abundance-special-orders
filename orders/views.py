from django.shortcuts import render, redirect, reverse, get_object_or_404
from django.contrib import messages
from django.views import generic
from django.http import JsonResponse

from django_filters.views import FilterView

from . import models, forms
from .filters import OrderFilter


class OrderListView(FilterView):
    model = models.Order
    filterset_class = OrderFilter
    template_name = "order_filter.html"
    context_object_name = "filter"

    def get_queryset(self):
        queryset = super().get_queryset()

        if "status" in self.kwargs:
            queryset = queryset.filter(status=self.kwargs["status"].upper())
        else:
            queryset = queryset.exclude(status=models.Order.DELETED)

        # Set default ordering
        default_ordering = self.request.GET.get("ordering", None)
        if not default_ordering:
            # Default ordering if none is provided in the request
            queryset = queryset.order_by("-date_created", "vendor__name")
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
        ).order_by("-date_created", "vendor__name")
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
        ).order_by("-date_created", "vendor__name")
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


def update_previous_step(request, order_id):
    # Retrieve instance and update status
    order = models.Order.objects.get(pk=order_id)
    order.previous_status()
    order.save()

    # Return updated instance data
    return JsonResponse({"status": order.status})


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
