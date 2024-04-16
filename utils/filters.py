from django.db.models import Q
from django_filters import FilterSet, ChoiceFilter, OrderingFilter


class FilterWithAny(FilterSet):
    def __init__(self, *args, **kwargs):
        super(FilterWithAny, self).__init__(*args, **kwargs)

        for name, field in self.filters.items():
            if isinstance(field, ChoiceFilter) and not isinstance(
                field, OrderingFilter
            ):
                # Add "Any" entry to choice fields.
                field.extra["empty_label"] = "Any " + name

    def search_customer(self, queryset, name, value):
        # Clean the input value for phone number search
        phone_number = "".join(filter(str.isdigit, value))
        if phone_number == "":
            phone_number = "no_phone_search"
        for term in value.split():
            queryset = queryset.filter(
                Q(first_name__icontains=term)
                | Q(last_name__icontains=term)
                | Q(company__icontains=term)
                | Q(phone_number__contains=phone_number)
            )
        return queryset
