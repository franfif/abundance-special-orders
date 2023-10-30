from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("orders.urls")),
    path("vendors/", include("vendors.urls")),
    path("unicorn/", include("django_unicorn.urls")),
]
