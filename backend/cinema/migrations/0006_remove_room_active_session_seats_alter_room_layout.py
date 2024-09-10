# Generated by Django 5.0.7 on 2024-08-03 02:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cinema', '0005_alter_session_room_ticket'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='room',
            name='active',
        ),
        migrations.AddField(
            model_name='session',
            name='seats',
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='room',
            name='layout',
            field=models.JSONField(blank=True, null=True),
        ),
    ]
