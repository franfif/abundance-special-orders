# Generated by Django 4.2.6 on 2024-04-23 20:48

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="CustomerStatus",
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
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("NON_SHAREHOLDER", "Non-shareholder"),
                            ("SHAREHOLDER", "Shareholder"),
                            ("SHAREHOLDER_RESALE", "Shareholder Resale"),
                            ("EMPLOYEE", "Employee"),
                        ],
                        max_length=64,
                        unique=True,
                    ),
                ),
                (
                    "margin",
                    models.DecimalField(
                        decimal_places=2,
                        max_digits=6,
                        validators=[
                            django.core.validators.MinValueValidator(0.0),
                            django.core.validators.MaxValueValidator(100.0),
                        ],
                    ),
                ),
            ],
            options={
                "verbose_name_plural": "customer statuses",
            },
        ),
        migrations.CreateModel(
            name="Customer",
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
                ("first_name", models.CharField(blank=True, max_length=128, null=True)),
                ("last_name", models.CharField(blank=True, max_length=128, null=True)),
                ("company", models.CharField(blank=True, max_length=128, null=True)),
                (
                    "phone_number",
                    models.CharField(blank=True, max_length=128, null=True),
                ),
                (
                    "status",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.PROTECT,
                        to="customers.customerstatus",
                    ),
                ),
            ],
        ),
    ]
