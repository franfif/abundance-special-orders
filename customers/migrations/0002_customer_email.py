# Generated by Django 4.2.6 on 2024-04-29 20:19

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("customers", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="customer",
            name="email",
            field=models.EmailField(blank=True, max_length=128, null=True),
        ),
    ]