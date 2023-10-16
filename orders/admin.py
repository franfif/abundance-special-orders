from django.contrib import admin

from .models import Order
from .models import Customer
from .models import Vendor
from .models import CustomerStatus


admin.site.register(Order)
admin.site.register(Customer)
admin.site.register(Vendor)
admin.site.register(CustomerStatus)
