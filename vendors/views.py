from django.shortcuts import reverse, redirect
from django.db.models.functions import Lower
from django.views import generic

from .models import Vendor
from .forms import VendorForm


class VendorListCreateView(generic.CreateView):
    model = Vendor
    form_class = VendorForm
    template_name = "vendors/vendor_home.html"

    def get_success_url(self):
        return reverse("vendors:list-vendors")

    def get_context_data(self, **kwargs):
        # Call the base implementation first to get a context
        context = super().get_context_data(**kwargs)
        # Add in a QuerySet of all the vendors
        context["vendor_list"] = Vendor.objects.all().order_by(Lower("name"))
        return context


class VendorUpdateView(generic.UpdateView):
    model = Vendor
    form_class = VendorForm
    template_name = "vendors/vendor_home.html"

    def get_success_url(self):
        return reverse("vendors:list-vendors")

    def get_context_data(self, **kwargs):
        # Call the base implementation first to get a context
        context = super().get_context_data(**kwargs)
        # Add in a QuerySet of all the vendors
        context["vendor_list"] = Vendor.objects.all().order_by(Lower("name"))
        context["action"] = "update"
        return context

    def post(self, request, *args, **kwargs):
        if "cancel" in request.POST:
            url = self.get_success_url()
            return redirect(url)
        else:
            return super(VendorUpdateView, self).post(request, *args, **kwargs)


class VendorDeleteView(generic.DeleteView):
    model = Vendor

    def get_success_url(self):
        return reverse("vendors:list-vendors")

    def get_context_data(self, **kwargs):
        # Call the base implementation first to get a context
        context = super().get_context_data(**kwargs)
        # Add in a QuerySet of all the vendors
        context["vendor_list"] = Vendor.objects.all().order_by(Lower("name"))
        return context
