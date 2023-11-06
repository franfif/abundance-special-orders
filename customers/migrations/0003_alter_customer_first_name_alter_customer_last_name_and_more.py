# Generated by Django 4.2.6 on 2023-10-30 18:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("customers", "0002_auto_20231030_1422"),
    ]

    operations = [
        migrations.AlterField(
            model_name="customer",
            name="first_name",
            field=models.CharField(blank=True, max_length=128, null=True),
        ),
        migrations.AlterField(
            model_name="customer",
            name="last_name",
            field=models.CharField(blank=True, max_length=128, null=True),
        ),
        migrations.AlterField(
            model_name="customer",
            name="phone_number",
            field=models.CharField(blank=True, max_length=128, null=True),
        ),
        migrations.AlterField(
            model_name="customer",
            name="status",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.PROTECT,
                to="customers.customerstatus",
            ),
        ),
    ]