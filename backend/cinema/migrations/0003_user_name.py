# Generated by Django 5.0.7 on 2024-08-02 03:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cinema', '0002_alter_user_options_alter_user_managers_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='name',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
