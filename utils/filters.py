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
