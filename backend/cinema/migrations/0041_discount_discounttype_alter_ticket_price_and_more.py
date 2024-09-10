# Generated by Django 5.0.7 on 2024-08-27 04:21

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cinema', '0040_rename_group_name_sessionchannel_group'),
    ]

    operations = [
        migrations.CreateModel(
            name='Discount',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('value', models.FloatField(blank=True, null=True)),
                ('active', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='DiscountType',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.AlterField(
            model_name='ticket',
            name='price',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.RenameField(
            model_name='ticket',
            old_name='seat',
            new_name='number_seats',
        ),
        migrations.AddField(
            model_name='branch',
            name='standart_price',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='weekday',
            name='discount',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='cinema.discount'),
        ),
        migrations.AddField(
            model_name='discount',
            name='type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='cinema.discounttype'),
        ),
        migrations.DeleteModel(
            name='Price',
        ),
    ]
