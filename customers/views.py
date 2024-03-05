from django.shortcuts import reverse
from django.views import generic
from django.db.models.functions import Lower

from django_filters.views import FilterView

from .models import Customer
from .forms import CustomerForm
from .filters import CustomerFilter


display_choice = "table"


class CustomerListCreateView(FilterView):
    model = Customer
    filterset_class = CustomerFilter
    template_name = "customer_form.html"
    context_object_name = "filter"
    # form_class = CustomerForm

    def get_success_url(self):
        return reverse("customers:list-customers")

    def get_context_data(self, **kwargs):
        # Call the base implementation first to get a context
        context = super().get_context_data(**kwargs)
        context["form"] = CustomerForm()
        # Add in a QuerySet of all the customers
        context["customer_list"] = Customer.objects.all().order_by(
            Lower("last_name"), Lower("first_name")
        )
        return context


class CustomerUpdateView(generic.UpdateView):
    model = Customer
    form_class = CustomerForm

    def get_success_url(self):
        return reverse("customers:list-customers")

    def get_context_data(self, **kwargs):
        # Call the base implementation first to get a context
        context = super().get_context_data(**kwargs)
        # Add in a QuerySet of all the orders
        context["customer_list"] = Customer.objects.all().order_by(
            Lower("last_name"), Lower("first_name")
        )
        context["action"] = "update"
        return context


class CustomerDeleteView(generic.DeleteView):
    model = Customer

    def get_success_url(self):
        return reverse("customers:list-customers")

    def get_context_data(self, **kwargs):
        # Call the base implementation first to get a context
        context = super().get_context_data(**kwargs)
        # Add in a QuerySet of all the customers
        context["customer_list"] = Customer.objects.all().order_by(
            Lower("last_name"), Lower("first_name")
        )
        return context
