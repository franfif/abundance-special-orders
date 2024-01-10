from django.shortcuts import render, redirect, reverse, get_object_or_404
from django.contrib import messages
from django.views import generic

from . import models, forms


class OrderListView(generic.ListView):
    model = models.Order

    def get_queryset(self):
        if "status" in self.kwargs:
            return models.Order.objects.filter(status=self.kwargs["status"].upper())
        return models.Order.objects.exclude(status=models.Order.DELETED)


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
        # Add in a QuerySet of all the books
        context["order_list"] = models.Order.objects.all()
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
        context["order_list"] = models.Order.objects.all()
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


def trash(request):
    orders = models.Order.objects.exclude(date_deleted=None)
    return render(request, "orders/trash.html", context={"orders": orders})


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
