# Generated by Django 5.0.7 on 2024-08-04 04:06

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cinema', '0012_alter_moviead_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='moviead',
            name='movie',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='cinema.movie'),
        ),
    ]
