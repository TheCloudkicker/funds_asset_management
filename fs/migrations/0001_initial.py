# Generated by Django 3.1.1 on 2021-04-11 16:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('entities', '0001_initial'),
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Fsli',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_userID', models.IntegerField(blank=True, null=True)),
                ('created_dt', models.DateTimeField(blank=True, null=True)),
                ('sourceID', models.CharField(blank=True, max_length=100, null=True)),
                ('clientID', models.IntegerField(blank=True, null=True)),
                ('name', models.CharField(blank=True, max_length=250, null=True)),
                ('fsli_type', models.CharField(blank=True, choices=[('Asset', 'Asset'), ('Liability', 'Liability'), ('Equity', 'Equity'), ('Income', 'Income'), ('Expense', 'Expense')], max_length=25, null=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='SubAccount',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_userID', models.IntegerField(blank=True, null=True)),
                ('created_dt', models.DateTimeField(blank=True, null=True)),
                ('sourceID', models.CharField(blank=True, max_length=100, null=True)),
                ('clientID', models.IntegerField(blank=True, null=True)),
                ('description', models.CharField(blank=True, max_length=250, null=True)),
                ('number', models.CharField(blank=True, max_length=250, null=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='OverrideValue',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_userID', models.IntegerField(blank=True, null=True)),
                ('created_dt', models.DateTimeField(blank=True, null=True)),
                ('sourceID', models.CharField(blank=True, max_length=100, null=True)),
                ('uuid', models.CharField(blank=True, max_length=250, null=True)),
                ('value', models.CharField(blank=True, max_length=250, null=True)),
                ('fund', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='entities.fund')),
                ('period', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='main.period')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='GenericMapping',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_userID', models.IntegerField(blank=True, null=True)),
                ('created_dt', models.DateTimeField(blank=True, null=True)),
                ('sourceID', models.CharField(blank=True, max_length=100, null=True)),
                ('clientID', models.IntegerField()),
                ('fsliID', models.IntegerField()),
                ('accountID', models.IntegerField()),
                ('account', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='fs.subaccount')),
                ('fsli', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='fs.fsli')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='FundParameter',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('includes', models.JSONField(blank=True, default=dict, null=True)),
                ('overrideValues', models.JSONField(blank=True, default=dict, null=True)),
                ('fund', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='entities.fund')),
                ('period', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='main.period')),
            ],
        ),
        migrations.CreateModel(
            name='CustomMapping',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_userID', models.IntegerField(blank=True, null=True)),
                ('created_dt', models.DateTimeField(blank=True, null=True)),
                ('sourceID', models.CharField(blank=True, max_length=100, null=True)),
                ('clientID', models.IntegerField()),
                ('fundID', models.IntegerField()),
                ('fsliID', models.IntegerField()),
                ('accountID', models.IntegerField()),
                ('account', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='fs.subaccount')),
                ('fsli', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='fs.fsli')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='ClientValue',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('data', models.JSONField(blank=True, default=dict, null=True)),
                ('fund', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='entities.fund')),
                ('period', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='main.period')),
            ],
        ),
        migrations.CreateModel(
            name='Balance',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_userID', models.IntegerField(blank=True, null=True)),
                ('created_dt', models.DateTimeField(blank=True, null=True)),
                ('sourceID', models.CharField(blank=True, max_length=100, null=True)),
                ('fundID', models.IntegerField()),
                ('clientID', models.IntegerField()),
                ('periodID', models.IntegerField()),
                ('ccyID', models.IntegerField()),
                ('amount', models.DecimalField(blank=True, decimal_places=2, max_digits=16, null=True)),
                ('sub_account', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='fs.subaccount')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]