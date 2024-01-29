from django.shortcuts import reverse
from django.views import generic

from .models import Vendor
from .forms import VendorForm


class VendorListCreateView(generic.CreateView):
    model = Vendor
    form_class = VendorForm

    def get_success_url(self):
        return reverse("vendors:list-vendors")

    def get_context_data(self, **kwargs):
        # Call the base implementation first to get a context
        context = super().get_context_data(**kwargs)
        # Add in a QuerySet of all the vendors
        context["vendor_list"] = Vendor.objects.all()
        return context


class VendorUpdateView(generic.UpdateView):
    model = Vendor
    form_class = VendorForm

    def get_success_url(self):
        return reverse("vendors:list-vendors")

    def get_context_data(self, **kwargs):
        # Call the base implementation first to get a context
        context = super().get_context_data(**kwargs)
        # Add in a QuerySet of all the orders
        context["vendor_list"] = Vendor.objects.all()
        context["action"] = "update"
        return context


class VendorDeleteView(generic.DeleteView):
    model = Vendor

    def get_success_url(self):
        return reverse("vendors:list-vendors")

    def get_context_data(self, **kwargs):
        # Call the base implementation first to get a context
        context = super().get_context_data(**kwargs)
        # Add in a QuerySet of all the orders
        context["vendor_list"] = Vendor.objects.all()
        return context
