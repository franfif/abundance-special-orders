# Generated by Django 4.2.6 on 2024-04-16 00:04

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("orders", "0003_order_is_cancelled"),
    ]

    operations = [
        migrations.AlterField(
            model_name="order",
            name="date_created",
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]