# Generated by Django 5.0.7 on 2024-08-27 04:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cinema', '0041_discount_discounttype_alter_ticket_price_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='discounttype',
            name='active',
            field=models.BooleanField(default=True),
        ),
    ]
