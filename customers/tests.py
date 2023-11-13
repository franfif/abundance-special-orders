import pytest

from .models import Customer, CustomerStatus


@pytest.mark.django_db
def test_customer_model():
    customer = Customer.objects.create(
        first_name="Charles",
        last_name="Dickens",
        company="Abundance",
        phone_number="5854542667",
        status=CustomerStatus.objects.get(status=CustomerStatus.SHAREHOLDER),
    )

    assert str(customer) == "Dickens, Charles"
    assert customer.add_margin(50) == (50 / 0.80)
