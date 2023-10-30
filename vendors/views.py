from django.shortcuts import render, redirect

from .models import Vendor
from .forms import VendorForm


def list_vendors(request):
    vendors = Vendor.objects.all()
    vendor_form = VendorForm()
    if request.method == "POST":
        vendor_form = VendorForm(request.POST)
        if vendor_form.is_valid():
            vendor_form.save()
    return render(
        request,
        "vendors/home.html",
        context={
            "vendors": vendors,
            "vendor_form": vendor_form,
        },
    )


def create_vendor(request):
    vendors = Vendor.objects.all()
