
from django.apps import apps
from faker import Faker
from django.utils.timezone import make_aware

import random
import datetime
import pytz

fake = Faker()



entry_types = [
    {
        'id': 1,
        'description': "Book expense and payable",
        'entries': [
            {
                'type':'DEBIT',
                'account': "Professional Fees"
            },
            {
                'type':'CREDIT',
                'account': "Accrued Expenses"
            },
        ]
    },
    {
        'id': 2,
        'description': "Pay invoice and relieve payable",
        'entries': [
            {
                'type':'DEBIT',
                'account': "Accrued Expenses"
            },
            {
                'type':'CREDIT',
                'account': "Cash"
            },
        ]
    },
    {
        'id': 3,
        'description': "Purchase investment",
        'entries': [
            {
                'type':'DEBIT',
                'account': "Investment Cost"
            },
            {
                'type':'CREDIT',
                'account': "Cash"
            },
        ]
    },
    {
        'id': 4,
        'description': "Mark investment to fair value",
        'entries': [
            {
                'type':'DEBIT',
                'account': "Investment Value"
            },
            {
                'type':'CREDIT',
                'account': "Change in Unrealized Gain Loss"
            },
        ]
    },
    {
        'id': 5,
        'description': "Receive equity contribution",
        'entries': [
            {
                'type':'DEBIT',
                'account': "Cash"
            },
            {
                'type':'CREDIT',
                'account': "Capital Contribution"
            },
        ]
    },
    {
        'id': 6,
        'description': "Make equity distribution",
        'entries': [
            {
                'type':'DEBIT',
                'account': "Capital Distribution"
            },
            {
                'type':'CREDIT',
                'account': "Cash"
            },
        ]
    },
    {
        'id': 7,
        'description': "Make contribution to investment",
        'entries': [
            {
                'type':'DEBIT',
                'account': "Contribution to Investment"
            },
            {
                'type':'CREDIT',
                'account': "Cash"
            },
        ]
    },
    {
        'id': 8,
        'description': "Receive distribution from investment",
        'entries': [
            {
                'type':'DEBIT',
                'account': "Cash"
            },
            {
                'type':'CREDIT',
                'account': "Distribution from Investment"
            }
        ]
    }
]



def generateFundActivity(numEntries, fund, period):

    Entry = apps.get_model('entries', 'Entry')
    SubAccount = apps.get_model('tbs', 'SubAccount')
    LatestID = apps.get_model('entries', 'LatestID')

    start_date = period.start_date
    end_date = period.end_date

    time_between_dates = end_date - start_date
    days_between_dates = time_between_dates.days

    for _ in range(numEntries):

        random_number_of_days = random.randrange(days_between_dates)
        random_date = start_date + datetime.timedelta(days=random_number_of_days)

        selected_entry = entry_types[random.randint(0, len(entry_types) -1)]

        latestID = LatestID.objects.first()

        entries = selected_entry['entries']

        for entry in entries:

            try:
                sub_account = SubAccount.objects.get(description=entry['account'])

            except:
                sub_account = SubAccount.objects.create(
                    description=entry['account'],
                    number=fake.isbn10()
                )


            new_entry = Entry.objects.create(
                fund=fund,
                period=period,
                amount=random.randint(0, 100000),
                sub_account=sub_account,
                journalID=latestID.journalID,
                effective_date=random_date,
                debit_credit=entry['type']
            )

        latestID.journalID = latestID.journalID + 1
        latestID.save()



def purgeJournalEntries():

    Entry = apps.get_model('entries', 'Entry')

    entries = Entry.objects.all()

    for entry in entries:
        entry.delete()