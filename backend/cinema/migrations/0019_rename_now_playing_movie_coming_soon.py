# Generated by Django 5.0.7 on 2024-08-06 18:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cinema', '0018_movie_now_playing'),
    ]

    operations = [
        migrations.RenameField(
            model_name='movie',
            old_name='now_playing',
            new_name='coming_soon',
        ),
    ]
