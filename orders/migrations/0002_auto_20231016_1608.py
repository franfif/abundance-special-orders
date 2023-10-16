# Generated by Django 4.2.6 on 2023-10-16 20:08

from django.db import migrations


def create_customer_status(apps, schema_editor):
    CustomerStatus = apps.get_model("orders", "CustomerStatus")
    STATUS_CHOICES = [
        ("NON_SHAREHOLDER", 25.0),
        ("SHAREHOLDER", 20.0),
        ("SHAREHOLDER_RESALE", 15.0),
        ("EMPLOYEE", 10.0),
    ]

    for status_code, status_margin in STATUS_CHOICES:
        CustomerStatus.objects.create(status=status_code, margin=status_margin)


class Migration(migrations.Migration):
    dependencies = [
        ("orders", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(create_customer_status),
    ]
