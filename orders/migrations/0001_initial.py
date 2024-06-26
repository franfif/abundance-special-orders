# Generated by Django 4.2.6 on 2024-04-23 20:48

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("customers", "0001_initial"),
        ("vendors", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Order",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("description", models.CharField(max_length=128)),
                (
                    "product_number",
                    models.CharField(blank=True, max_length=64, null=True),
                ),
                (
                    "quantity",
                    models.PositiveSmallIntegerField(
                        blank=True,
                        null=True,
                        validators=[django.core.validators.MinValueValidator(1)],
                    ),
                ),
                (
                    "book_price",
                    models.DecimalField(
                        blank=True,
                        decimal_places=2,
                        max_digits=6,
                        null=True,
                        validators=[django.core.validators.MinValueValidator(0.0)],
                    ),
                ),
                ("has_bottle_deposit", models.BooleanField(default=False)),
                (
                    "number_bottle_deposit",
                    models.PositiveSmallIntegerField(
                        blank=True,
                        null=True,
                        validators=[django.core.validators.MinValueValidator(1)],
                    ),
                ),
                ("paid", models.BooleanField(default=False)),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("INCOMPLETE", "Incomplete"),
                            ("PENDING", "Pending"),
                            ("READY_TO_ORDER", "Ready to order"),
                            ("ORDERED", "Ordered"),
                            ("RECEIVED", "Received"),
                            ("CALLED", "Called"),
                            ("PICKED_UP", "Picked-Up"),
                            ("CANCELED", "Canceled"),
                            ("DELETED", "Deleted"),
                        ],
                        max_length=64,
                        null=True,
                    ),
                ),
                ("is_stand_by", models.BooleanField(default=False)),
                ("is_cancelled", models.BooleanField(default=False)),
                ("memo", models.TextField(blank=True, max_length=500, null=True)),
                ("employee_initials", models.CharField(max_length=5)),
                ("date_created", models.DateTimeField(auto_now_add=True)),
                ("date_ordered", models.DateField(blank=True, null=True)),
                ("date_received", models.DateField(blank=True, null=True)),
                ("date_called", models.DateField(blank=True, null=True)),
                ("date_picked_up", models.DateField(blank=True, null=True)),
                ("date_deleted", models.DateField(blank=True, null=True)),
                (
                    "customer",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.PROTECT,
                        to="customers.customer",
                    ),
                ),
                (
                    "vendor",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.PROTECT,
                        to="vendors.vendor",
                    ),
                ),
            ],
        ),
    ]
