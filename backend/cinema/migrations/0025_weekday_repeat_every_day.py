# Generated by Django 5.0.7 on 2024-08-16 19:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cinema', '0024_room_opens_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='weekday',
            name='repeat_every_day',
            field=models.BooleanField(default=False),
        ),
    ]
