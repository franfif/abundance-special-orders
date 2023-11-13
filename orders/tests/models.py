import pytest

from django.test import Client
from orders.models import Order

from customers.models import Customer, CustomerStatus
from vendors.models import Vendor


@pytest.mark.django_db
def test_customer_model():
    order = Order.objects.create(
        description="this is a test",
        employee_initials="FB",
    )

    assert order.description == "this is a test"
    assert not order.is_complete()

    order.vendor = Vendor.objects.create(name="UN")
    order.product_number = "123"
    order.quantity = 1
    order.book_price = 10
    order.customer = Customer.objects.create(
        first_name="Charles",
        last_name="Dickens",
        company="Abundance",
        phone_number="5854542667",
        status=CustomerStatus.objects.get(status=CustomerStatus.SHAREHOLDER),
    )

    assert order.is_complete()

    assert order.total_price() == 10 / 0.8
