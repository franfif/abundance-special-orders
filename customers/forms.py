from django import forms

from . import models


class CustomerForm(forms.ModelForm):
    class Meta:
        model = models.Customer
        fields = [
            "first_name",
            "last_name",
            "company",
            "phone_number",
            "status",
        ]
        labels = {
            "phone_number": "Phone #",
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Set the custom label for the ForeignKey field
        self.fields['status'].empty_label = 'Status'
