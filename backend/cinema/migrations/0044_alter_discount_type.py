# Generated by Django 5.0.7 on 2024-08-29 03:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cinema', '0043_alter_discount_type_bill_tickettype_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='discount',
            name='type',
            field=models.CharField(blank=True, choices=[('AGE', 'Age'), ('DAY', 'Day')], default='DAY', max_length=3, null=True),
        ),
    ]
