# Generated by Django 5.0.7 on 2024-08-19 11:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cinema', '0027_alter_shift_end_time_alter_shift_start_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='weekday',
            name='id',
            field=models.BigAutoField(primary_key=True, serialize=False),
        ),
    ]
