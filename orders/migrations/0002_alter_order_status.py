# Generated by Django 4.2.6 on 2023-11-20 21:01

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("orders", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="order",
            name="status",
            field=models.CharField(
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
    ]
