# Generated by Django 3.1.1 on 2021-04-11 16:22

from django.db import migrations, models
import django.db.models.deletion
import entities.models.funds


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Fund',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_userID', models.IntegerField(blank=True, null=True)),
                ('created_dt', models.DateTimeField(blank=True, null=True)),
                ('sourceID', models.CharField(blank=True, max_length=100, null=True)),
                ('clientID', models.IntegerField()),
                ('trackingID', models.CharField(blank=True, max_length=250, null=True)),
                ('legal_name', models.CharField(blank=True, max_length=250, null=True)),
                ('short_name', models.CharField(blank=True, max_length=100, null=True)),
                ('isAudited', models.BooleanField(default=False)),
                ('domicile_location', models.CharField(blank=True, choices=[('Delaware', 'Delaware'), ('Scotland', 'Scotland'), ('Luxembourg', 'Luxembourg'), ('Delaware', 'Delaware'), ('Mauritius', 'Mauritius')], max_length=50, null=True)),
                ('entity_type', models.CharField(blank=True, choices=[('Corporation', 'Corporation'), ('Partnership (LP)', 'Partnership (LP)'), ('Limited Liability Company (LLC)', 'Limited Liability Company (LLC)'), ('Limited Liability Partnership (LLP)', 'Limited Liability Partnership (LLP)'), ('Limited (Ltd)', 'Limited (Ltd)'), ('SCSp', 'SCSp'), ('GmbH', 'GmBH')], max_length=50, null=True)),
                ('acct_system', models.CharField(blank=True, choices=[('Investran', 'Investran'), ('InvestAI', 'InvestAI')], max_length=50, null=True)),
                ('commencement_date', models.DateField(blank=True, null=True)),
                ('fund_life', models.DecimalField(blank=True, decimal_places=2, max_digits=6, null=True)),
                ('data', models.JSONField(blank=True, null=True)),
                ('legacy_data', models.JSONField(blank=True, default=entities.models.funds.jsonfield_default_value, null=True)),
                ('legal_type', models.IntegerField(blank=True, null=True)),
                ('domicile_countryID', models.IntegerField(blank=True, null=True)),
                ('prefRate', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('administrator', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='main.administrator')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='FundCriteriaDef',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_userID', models.IntegerField(blank=True, null=True)),
                ('created_dt', models.DateTimeField(blank=True, null=True)),
                ('sourceID', models.CharField(blank=True, max_length=100, null=True)),
                ('text', models.CharField(max_length=250)),
                ('key', models.CharField(blank=True, max_length=250, null=True)),
                ('uuid', models.CharField(blank=True, max_length=250, null=True)),
                ('formType', models.CharField(blank=True, choices=[('input', 'input'), ('select', 'select'), ('bool', 'bool'), ('date', 'date')], max_length=250, null=True)),
                ('relatedObjectName', models.CharField(blank=True, max_length=100, null=True)),
                ('placeholder', models.CharField(blank=True, max_length=100, null=True)),
                ('isRequired', models.BooleanField(default=False)),
                ('isMulti', models.BooleanField(default=False)),
                ('criteriaType', models.CharField(blank=True, choices=[('fund', 'fund'), ('investment', 'investment'), ('investor', 'investor')], max_length=250, null=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='FundCriterionHeader',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_userID', models.IntegerField(blank=True, null=True)),
                ('created_dt', models.DateTimeField(blank=True, null=True)),
                ('sourceID', models.CharField(blank=True, max_length=100, null=True)),
                ('clientID', models.IntegerField()),
                ('name', models.CharField(blank=True, max_length=250, null=True)),
                ('required', models.BooleanField(default=False)),
                ('order', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Investment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_userID', models.IntegerField(blank=True, null=True)),
                ('created_dt', models.DateTimeField(blank=True, null=True)),
                ('sourceID', models.CharField(blank=True, max_length=100, null=True)),
                ('uuid', models.CharField(blank=True, max_length=250, null=True)),
                ('name', models.CharField(blank=True, max_length=250, null=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Investor',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_userID', models.IntegerField(blank=True, null=True)),
                ('created_dt', models.DateTimeField(blank=True, null=True)),
                ('sourceID', models.CharField(blank=True, max_length=100, null=True)),
                ('uuid', models.CharField(blank=True, max_length=250, null=True)),
                ('name', models.CharField(blank=True, max_length=250, null=True)),
                ('account_number', models.CharField(blank=True, max_length=250, null=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='LegacyData',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_userID', models.IntegerField(blank=True, null=True)),
                ('created_dt', models.DateTimeField(blank=True, null=True)),
                ('sourceID', models.CharField(blank=True, max_length=100, null=True)),
                ('data', models.JSONField(blank=True, default=dict, null=True)),
                ('fund', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='entities.fund')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='InvestorCommit',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_userID', models.IntegerField(blank=True, null=True)),
                ('created_dt', models.DateTimeField(blank=True, null=True)),
                ('sourceID', models.CharField(blank=True, max_length=100, null=True)),
                ('ccy', models.CharField(blank=True, max_length=25, null=True)),
                ('commitment_base', models.DecimalField(blank=True, decimal_places=2, max_digits=20, null=True)),
                ('commitment_local', models.DecimalField(blank=True, decimal_places=2, max_digits=20, null=True)),
                ('isAffiliate', models.BooleanField(default=False)),
                ('date_of_close', models.DateTimeField(blank=True, null=True)),
                ('fund', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='entities.fund')),
                ('investor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='entities.investor')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='InvestmentOwnership',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_userID', models.IntegerField(blank=True, null=True)),
                ('created_dt', models.DateTimeField(blank=True, null=True)),
                ('sourceID', models.CharField(blank=True, max_length=100, null=True)),
                ('investment', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='entities.investment')),
                ('owner', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='investment_owner', to='entities.fund')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='FundPeriodMateriality',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uuid', models.CharField(blank=True, max_length=250, null=True)),
                ('audit_setting', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='main.auditsettings')),
                ('fund', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='entities.fund')),
                ('period', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='main.period')),
            ],
        ),
        migrations.CreateModel(
            name='FundAltName',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=250, null=True)),
                ('created_uuid', models.CharField(blank=True, max_length=250, null=True)),
                ('created_userName', models.CharField(blank=True, max_length=250, null=True)),
                ('created_dt', models.DateTimeField(auto_now_add=True, null=True)),
                ('sourceID', models.CharField(blank=True, max_length=100, null=True)),
                ('fund', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='entities.fund')),
            ],
        ),
        migrations.AddField(
            model_name='fund',
            name='carry_partner',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='carry_partner', to='entities.investor'),
        ),
        migrations.AddField(
            model_name='fund',
            name='depository',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='main.depository'),
        ),
        migrations.AddField(
            model_name='fund',
            name='general_partner',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='general_partner', to='entities.investor'),
        ),
        migrations.AddField(
            model_name='fund',
            name='investment_manager',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='investment_manager', to='main.investmentmanager'),
        ),
        migrations.AddField(
            model_name='fund',
            name='sub_advisor',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='sub_advisor', to='main.investmentmanager'),
        ),
        migrations.CreateModel(
            name='EntityOwnership',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_userID', models.IntegerField(blank=True, null=True)),
                ('created_dt', models.DateTimeField(blank=True, null=True)),
                ('sourceID', models.CharField(blank=True, max_length=100, null=True)),
                ('ownership_percentage', models.DecimalField(blank=True, decimal_places=8, max_digits=12, null=True)),
                ('ownership_type', models.CharField(blank=True, choices=[('COMBINED', 'COMBINED'), ('SHARED', 'SHARED'), ('CONSOLIDATED', 'CONSOLIDATED')], max_length=50, null=True)),
                ('owned_entity', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='owned_entity', to='entities.fund')),
                ('owner_entity', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='owner_entity', to='entities.fund')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='CapitalMovement',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_userID', models.IntegerField(blank=True, null=True)),
                ('created_dt', models.DateTimeField(blank=True, null=True)),
                ('sourceID', models.CharField(blank=True, max_length=100, null=True)),
                ('uuid', models.CharField(blank=True, max_length=250, null=True)),
                ('movementType', models.CharField(blank=True, choices=[('Contribution', 'Contribution'), ('Distribution', 'Distribution')], max_length=250, null=True)),
                ('addedBy', models.CharField(blank=True, max_length=100, null=True)),
                ('movementDate', models.DateTimeField(blank=True, null=True)),
                ('totalAmount', models.DecimalField(blank=True, decimal_places=2, max_digits=20, null=True)),
                ('dateAdded', models.DateTimeField(blank=True, null=True)),
                ('supportID', models.IntegerField()),
                ('fund', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='entities.fund')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]