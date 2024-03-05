from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("orders.urls")),
    path("vendors/", include("vendors.urls")),
    path("customers/", include("customers.urls")),
    path("select2/", include("django_select2.urls")),
]
