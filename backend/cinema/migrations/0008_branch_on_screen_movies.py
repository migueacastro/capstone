# Generated by Django 5.0.7 on 2024-08-03 05:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cinema', '0007_alter_movie_image_alter_ticket_qr_code'),
    ]

    operations = [
        migrations.AddField(
            model_name='branch',
            name='on_screen_movies',
            field=models.ManyToManyField(to='cinema.movie'),
        ),
    ]
