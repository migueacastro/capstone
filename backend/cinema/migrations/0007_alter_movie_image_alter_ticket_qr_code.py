# Generated by Django 5.0.7 on 2024-08-03 02:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cinema', '0006_remove_room_active_session_seats_alter_room_layout'),
    ]

    operations = [
        migrations.AlterField(
            model_name='movie',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='movies/preview-images'),
        ),
        migrations.AlterField(
            model_name='ticket',
            name='qr_code',
            field=models.ImageField(blank=True, null=True, upload_to='tickets/qr-codes'),
        ),
    ]
