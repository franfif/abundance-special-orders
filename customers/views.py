from django.shortcuts import reverse, redirect
from django.template.loader import render_to_string
from django.views import generic
from django.http import JsonResponse
from django.db.models.functions import Lower

from .models import Customer
from .filters import CustomerFilter


display_choice = "table"


class CustomerView(generic.View):
    model = Customer

    def get_success_url(self):
        customer_full_info = self.request.GET.get("customer_full_info", "")
        status = self.request.GET.get("status", "")
        print(f"customer full info: {customer_full_info}")
        print(f"status: {status}")

        success_url = reverse("customers:list-customers")
        success_url += f"?customer_full_info={customer_full_info}&status={status}"
        return success_url
        # return reverse("customers:list-customers")

    def get_context_data(self, **kwargs):
        # Call the base implementation first to get a context
        context = super().get_context_data(**kwargs)
        # Add filtered queryset in context
        context["filter"] = CustomerFilter(
            self.request.GET,
            queryset=self.get_queryset().order_by(
                Lower("last_name"), Lower("first_name")
            ),
        )
        return context


class CustomerListCreateView(CustomerView, generic.CreateView):
    fields = "__all__"
    template_name = "customers/customer_filter.html"


class CustomerUpdateView(CustomerListCreateView, generic.UpdateView):
    def get_context_data(self, **kwargs):
        # Call the super CustomerListCreateView method
        context = super().get_context_data(**kwargs)
        # Add action to context
        context["action"] = "update"
        return context

    def post(self, request, *args, **kwargs):
        print("request.POST")
        print(request.POST)
        if "cancel" in request.POST:
            url = self.get_success_url()
            return redirect(url)
        else:
            return super(CustomerUpdateView, self).post(request, *args, **kwargs)


class CustomerDeleteView(CustomerView, generic.DeleteView):
    pass


def filter_customers(request):
    customer_filter = CustomerFilter(request.GET, queryset=Customer.objects.all())

    # Get the filtered queryset
    filtered_customers = customer_filter.qs

    # Set default ordering
    default_ordering = request.GET.get("ordering", None)
    if not default_ordering:
        # Default ordering if none is provided in the request
        filtered_customers = filtered_customers.order_by(
            Lower("last_name"), Lower("first_name")
        )

    # Render items to a string
    customers_html = render_to_string(
        "customers/partials/list_customers.html",
        {"customer_list": filtered_customers},
        request=request,
    )
    # Convert the list to JSON and return it as a response
    return JsonResponse({"item_list_html": customers_html})
