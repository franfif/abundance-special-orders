from django.shortcuts import reverse, redirect, render
from django.core.paginator import Paginator
from django.template.loader import render_to_string
from django.views import generic
from django.http import JsonResponse
from django.db.models.functions import Lower
from django.urls import reverse_lazy

from django_filters.views import FilterView

from .models import Customer
from .forms import CustomerForm
from .filters import CustomerFilter

from preferences.models import Preference


class CustomerFilterView(FilterView):
    model = Customer
    filterset_class = CustomerFilter
    template_name = "customers/customer_base.html"
    context_object_name = "filter"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["display_choice"] = Preference.objects.get(user__username__iexact="abundance").customer_view
        return context


class CustomerListCreateView(generic.CreateView, CustomerFilterView):
    form_class = CustomerForm

    def get_initial(self):
        if "pk" in self.kwargs:
            original_customer = get_object_or_404(Customer, id=self.kwargs["pk"])
            initial = {
                "first_name": original_customer.first_name,
                "last_name": original_customer.last_name,
                "email": original_customer.email,
                "phone": original_customer.phone,
                "status": original_customer.status,
                "memo": original_customer.memo,
            }
            return initial
        return {}

    def get_success_url(self):
        return reverse("customers:list-customers")

    def get_context_data(self, **kwargs):
        # Call the base implementation first to get a context
        context = super().get_context_data(**kwargs)
        context["action"] = "create"
        if self.get_initial and "pk" in self.kwargs:
            context["action"] = "copy"
        return context


class CustomerUpdateView(generic.UpdateView, CustomerFilterView):
    form_class = CustomerForm

    def get_success_url(self):
        return reverse("customers:list-customers")

    def get_context_data(self, **kwargs):
        # Call the base implementation first to get a context
        context = super().get_context_data(**kwargs)
        context["action"] = "update"
        context["customer"] = self.get_object()
        return context

    def form_valid(self, form):
        customer = form.save(commit=False)
        if "delete" in self.request.POST:
            customer.delete()
            return redirect("customers:list-customers")
        return super().form_valid(form)


class CustomerDeleteView(CustomerFilterView, generic.DeleteView):
    model = Customer
    success_url = reverse_lazy("customers:list-customers")


def filter_customers(request, **kwargs):
    # Get the filters from the request
    customer_filters = request.GET

    if "status" in kwargs:
        # Show all customers by status
        status = kwargs["status"]
        customer_filter = CustomerFilter(
            customer_filters, queryset=Customer.objects.filter(status__iexact=status)
        )
    else:
        # Show all customers
        customer_filter = CustomerFilter(customer_filters, queryset=Customer.objects.all())

    # Get the filtered queryset
    filtered_customers = customer_filter.qs

    # Set default ordering
    default_ordering = request.GET.get("ordering", None)
    if not default_ordering:
        # Default ordering if none is provided in the request
        filtered_customers = filtered_customers.order_by(
            Lower("last_name"), Lower("first_name")
        )

    paginator = Paginator(filtered_customers, 20)
    page_number = request.GET.get("page")
    page_customers = paginator.get_page(page_number)
    # Render items to a string
    customers_html = render_to_string(
        "customers/partials/list_customers.html",
        {"customer_list": page_customers,
         "display": Preference.objects.get(user__username__iexact="abundance").customer_view},
        request=request,
    )
    # Convert the list to JSON and return it as a response
    return JsonResponse({"item_list_html": customers_html})

def display_cards(request, **kwargs):
    if request.method == "POST":
        preference = Preference.objects.get(user__username__iexact="abundance")
        preference.customer_view = Preference.CARDS
        preference.save()
    return JsonResponse({"status": "success"})


def display_list(request, **kwargs):
    if request.method == "POST":
        preference = Preference.objects.get(user__username__iexact="abundance")
        preference.customer_view = Preference.LIST
        preference.save()
    return JsonResponse({"status": "success"})
