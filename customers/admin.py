from django.contrib import admin

from .models import Customer
from .models import CustomerStatus


admin.site.register(Customer)
admin.site.register(CustomerStatus)
