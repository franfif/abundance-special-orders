from django import template

from . import default_values
from datetime import timezone

register = template.Library()


@register.filter
def paid(value):
    if value.paid:
        return "Paid"
    if value.is_suspended:
        return "Suspended"
    return "Not Paid"

@register.filter
def paid_badge(value):
    if value.paid:
        return "bg-paid"
    elif value.is_suspended:
        return "bg-suspended"
    return "bg-" + default_values.NO_STATUS.lower()


@register.filter
def status(value):
    if value.status is not None:
        return value.get_status_display()
    return default_values.NO_STATUS


@register.filter
def status_badge(value):
    if value.status is not None:
        return "bg-" + value.status.lower()
    return "bg-" + default_values.NO_STATUS.lower()


@register.filter
def short_date(value):
    if value is not None:
        return value.strftime("%a, %b %d %Y")
        # local_order_date_created = value.astimezone(timezone.utc).astimezone()
        # return local_order_date_created.strftime("%a, %b %d %Y")
    return default_values.NO_DATE


@register.filter
def quantity(value):
    if value.quantity is not None:
        return value.quantity
    return default_values.NO_QUANTITY


@register.filter
def unit_of(value):
    try:
        if value.quantity > 1:
            return "units of"
        return "unit of"
    except TypeError:
        return "unit of"


@register.filter
def vendor(value):
    if value.vendor is not None:
        return value.vendor
    return default_values.NO_TEXT


@register.filter
def product_number(value):
    if value.product_number is not None:
        return value.product_number
    return default_values.NO_TEXT


@register.filter
def book_price(value):
    if value.book_price is not None:
        return value.book_price
    return default_values.NO_PRICE


@register.filter
def total_price(value):
    total = value.total_price()
    if total is not None:
        return total
    else:
        return default_values.NO_PRICE


def default_name(first_name, last_name):
    if first_name is None:
        first_name = default_values.NO_TEXT
    if last_name is None:
        last_name = default_values.NO_TEXT
    return f"{first_name} {last_name}"


@register.filter
def customer_name(value):
    if value.customer is None:
        return "No customer attached"
    return default_name(value.customer.first_name, value.customer.last_name)


@register.filter
def customer_status(value):
    if value.customer is not None and value.customer.status is not None:
        return value.customer.status.get_status_display()
    return ""


@register.filter
def customer_company(value):
    if value.customer is not None:
        return value.customer.company
    return ""


@register.filter
def customer_phone_number(value):
    if value.customer is not None:
        return value.customer.phone_number
    return ""


@register.filter
def date(value):
    if value is not None:
        return value
    return default_values.NO_DATE


@register.filter
def previous_step(status):
    match status:
        case "INCOMPLETE":
            return "Delete"
        case "READY_TO_ORDER":
            return "Delete"
        case "ORDERED":
            return "Reorder"
        case "RECEIVED":
            return "Not Received"
        case "CALLED":
            return "Not Called"
        case "PICKED_UP":
            return "Not Picked-Up"
        case _:
            return None


@register.filter
def next_step(status):
    match status:
        case "INCOMPLETE":
            return "Edit"
        case "READY_TO_ORDER":
            return "Placed"
        case "ORDERED":
            return "Received"
        case "RECEIVED":
            return "Called"
        case "CALLED":
            return "Picked-Up"
        case "PICKED_UP":
            return None
        case _:
            return None
