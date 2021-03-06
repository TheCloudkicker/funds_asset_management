# Generated by Django 3.1.1 on 2021-04-11 16:22

from django.db import migrations, models
import django.db.models.deletion
import supports.models.client_report
import supports.models.supports


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('entities', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ClientReport',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_userID', models.IntegerField(blank=True, null=True)),
                ('created_dt', models.DateTimeField(blank=True, null=True)),
                ('sourceID', models.CharField(blank=True, max_length=100, null=True)),
                ('clientID', models.IntegerField()),
                ('name', models.CharField(blank=True, max_length=250, null=True)),
                ('trackingInfo', models.JSONField(blank=True, default=supports.models.client_report.jsonfield_default_value, null=True)),
                ('fundIdentifier', models.JSONField(blank=True, default=supports.models.client_report.identifier_default, null=True)),
                ('periodIdentifier', models.JSONField(blank=True, default=supports.models.client_report.identifier_default, null=True)),
                ('mappings', models.JSONField(blank=True, default=list, null=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='RepositoryType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_userID', models.IntegerField(blank=True, null=True)),
                ('created_dt', models.DateTimeField(blank=True, null=True)),
                ('sourceID', models.CharField(blank=True, max_length=100, null=True)),
                ('clientID', models.IntegerField()),
                ('name', models.CharField(blank=True, max_length=250, null=True)),
                ('key', models.CharField(blank=True, max_length=25, null=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='SupportType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_userID', models.IntegerField(blank=True, null=True)),
                ('created_dt', models.DateTimeField(blank=True, null=True)),
                ('sourceID', models.CharField(blank=True, max_length=100, null=True)),
                ('clientID', models.IntegerField()),
                ('name', models.CharField(blank=True, max_length=250, null=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Support',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_userID', models.IntegerField(blank=True, null=True)),
                ('created_dt', models.DateTimeField(blank=True, null=True)),
                ('sourceID', models.CharField(blank=True, max_length=100, null=True)),
                ('clientID', models.IntegerField()),
                ('fundID', models.IntegerField()),
                ('periodID', models.IntegerField()),
                ('fileName', models.CharField(blank=True, max_length=250, null=True)),
                ('uploadedBy', models.CharField(blank=True, max_length=250, null=True)),
                ('attachment', models.FileField(blank=True, null=True, upload_to=supports.models.supports.fund_support_path_handler)),
                ('meta', models.JSONField(blank=True, default=dict, null=True)),
                ('data', models.JSONField(blank=True, default=supports.models.supports.data_default_value, null=True)),
                ('totals', models.JSONField(blank=True, default=dict, null=True)),
                ('includes', models.JSONField(blank=True, default=dict, null=True)),
                ('report', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='supports.clientreport')),
                ('supportType', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='supports.supporttype')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='FundSupport',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fund', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='entities.fund')),
                ('support', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='supports.support')),
            ],
        ),
        migrations.CreateModel(
            name='ClientReportHeader',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_userID', models.IntegerField(blank=True, null=True)),
                ('created_dt', models.DateTimeField(blank=True, null=True)),
                ('sourceID', models.CharField(blank=True, max_length=100, null=True)),
                ('clientID', models.IntegerField()),
                ('name', models.CharField(blank=True, max_length=250, null=True)),
                ('waibe_name', models.CharField(blank=True, max_length=250, null=True)),
                ('comments', models.CharField(blank=True, max_length=500, null=True)),
                ('active', models.BooleanField(default=True)),
                ('defaultColumn', models.BooleanField(default=False)),
                ('report', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='supports.clientreport')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.AddField(
            model_name='clientreport',
            name='repoType',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='supports.repositorytype'),
        ),
    ]
