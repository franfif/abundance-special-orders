from django.shortcuts import render, redirect, reverse, get_object_or_404
from django.contrib import messages
from django.views import generic

from . import models, forms
from customers.forms import CustomerForm


class OrderListView(generic.ListView):
    model = models.Order


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
        return context


# def create_order(request):
#     orders = models.Order.objects.all()
#     order_form = forms.CreateOrderForm()
#     customer_form = CustomerForm()
#     if request.method == "POST":
#         order_form = forms.CreateOrderForm(request.POST)
#         customer_form = CustomerForm(request.POST)
#         if all([order_form.is_valid(), customer_form.is_valid()]):
#             customer = customer_form.save()
#             order = order_form.save(commit=False)
#             order.customer = customer
#             if order.is_complete():
#                 order.status = models.Order.PENDING
#             else:
#                 order.status = models.Order.INCOMPLETE
#             order.save()
#             if "another" in request.POST:
#                 return redirect("orders:create_order")
#             return redirect("orders:home")
#     return render(
#         request,
#         "orders/create_order.html",
#         context={
#             "orders": orders,
#             "order_form": order_form,
#             "customer_form": customer_form,
#         },
#     )


class OrderUpdateView(generic.UpdateView):
    model = models.Order
    form_class = forms.CreateOrderForm
    template_name_suffix = "_update_form"

    def get_success_url(self):
        return reverse("orders:home")

    def get_context_data(self, **kwargs):
        # Call the base implementation first to get a context
        context = super().get_context_data(**kwargs)
        # Add in a QuerySet of all the books
        context["order_list"] = models.Order.objects.all()
        return context

    def form_valid(self, form):
        order = form.save(commit=False)

        # Order is incomplete
        if not order.is_complete():
            order.status = models.Order.INCOMPLETE
        # Order has a date-related status
        elif order.date_picked_up is not None:
            order.status = order.PICKED_UP
        elif order.date_called is not None:
            order.status = order.CALLED
        elif order.date_received is not None:
            order.status = order.RECEIVED
        elif order.date_ordered is not None:
            order.status = order.ORDERED
        # Order is completed during this edit
        elif order.status == models.Order.INCOMPLETE:
            order.status = models.Order.PENDING

        order.save()
        return super().form_valid(form)


# def edit_order(request, order_id):
#     orders = models.Order.objects.all()
#     order = get_object_or_404(models.Order, id=order_id)
#     customer = None
#     if order.customer is not None:
#         customer = get_object_or_404(models.Customer, id=order.customer.pk)
#
#     order_form = forms.CreateOrderForm(instance=order)
#     customer_form = CustomerForm(instance=customer)
#     if request.method == "POST":
#         order_form = forms.CreateOrderForm(request.POST, instance=order)
#         customer_form = CustomerForm(request.POST, instance=customer)
#         if all([order_form.is_valid(), customer_form.is_valid()]):
#             customer = customer_form.save()
#             order = order_form.save(commit=False)
#             order.customer = customer
#
#             # Order is incomplete
#             if not order.is_complete():
#                 order.status = models.Order.INCOMPLETE
#             # Order has a date-related status
#             elif order.date_picked_up is not None:
#                 order.status = order.PICKED_UP
#             elif order.date_called is not None:
#                 order.status = order.CALLED
#             elif order.date_received is not None:
#                 order.status = order.RECEIVED
#             elif order.date_ordered is not None:
#                 order.status = order.ORDERED
#             # Order is completed during this edit
#             elif order.status == models.Order.INCOMPLETE:
#                 order.status = models.Order.PENDING
#
#             order.save()
#             return redirect("orders:home")
#     return render(
#         request,
#         "orders/edit_order.html",
#         context={
#             "order": order,
#             "order_form": order_form,
#             "customer_form": customer_form,
#             "orders": orders,
#         },
#     )


def trash(request):
    orders = models.Order.objects.exclude(date_deleted=None)
    return render(request, "orders/trash.html", context={"orders": orders})


def delete_order(request, order_id):
    order = get_object_or_404(models.Order, id=order_id)
    if request.method == "POST":
        order.send_to_trash()
        messages.success(
            request,
            f"The order has been successfully sent to trash. It will be definitely deleted in 30 days.",
        )
        return redirect("home")
    return redirect("home")
