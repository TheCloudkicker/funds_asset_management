from django.apps import apps
from faker import Faker

import random

fake = Faker()


def populateFunds(numFunds: int) -> int:

    Fund = apps.get_model('entities', 'Fund')
    Client = apps.get_model('parties', 'Client')

    clients_qs = Client.objects.all()
    clients_count = clients_qs.count()
    client_ids = list(clients_qs.values_list('id', flat=True))

    print(client_ids)

    for _ in range(numFunds):
        color = fake.color_name()
        fundName = f'Fund {color}'

        index = random.randint(0, clients_count - 1)

        fund = Fund.objects.create(
            clientID=client_ids[index],
            legal_name=fundName,
            short_name=fundName,
            domicile_countryID=1
        )



def populateClients(numClients: int) -> int:

    Client = apps.get_model('parties', 'Client')

    for _ in range(numClients):
        
        companyName = fake.company()

        client = Client.objects.create(
            legal_name=companyName,
        )


def populateInvestments(numInvestments):

    Investment = apps.get_model('investments', 'Investment')

    for _ in range(numInvestments):

        isbn = fake.isbn10()

        legal_name = f'Investment {isbn}'

        investment = Investment.objects.create(
            legal_name=legal_name,
            short_name=legal_name
        )



def populateOwnerships():

    Fund = apps.get_model('entities', 'Fund')
    Investment = apps.get_model('investments', 'Investment')
    InvestmentOwnership = apps.get_model('investments', 'InvestmentOwnership')

    funds = Fund.objects.all()
    funds_count = funds.count()
    funds_ids = list(funds.values_list('id', flat=True))

    investments = Investment.objects.all()

    for investment in investments:

        index = random.randint(0, funds_count - 1)

        investment_ownership = InvestmentOwnership.objects.create(
            investment=investment,
            fund_id=funds_ids[index]
        )





def populateDatabase(numFunds, numClients, numInvestments):



    populateClients(numClients)

    populateFunds(numFunds)

    populateInvestments(numInvestments)

    populateOwnerships()

    



def purgeDatabase():

    from fixtures.je import purgeJournalEntries

    purgeJournalEntries()

    Client = apps.get_model('parties', 'Client')
    Fund = apps.get_model('entities', 'Fund')
    Investment = apps.get_model('investments', 'Investment')
    InvestmentOwnership = apps.get_model('investments', 'InvestmentOwnership')
    SubAccount = apps.get_model('tbs', 'SubAccount')
    Balance = apps.get_model('tbs', 'Balance')

    GenericMapping = apps.get_model('fs', 'GenericMapping')


    gen_mappings = GenericMapping.objects.all()
    for gen_mapping in gen_mappings:
        gen_mapping.delete()

    balances = Balance.objects.all()
    for balance in balances:
        balance.delete()

    accounts = SubAccount.objects.all()
    for account in accounts:
        account.delete()

    investment_ownerships = InvestmentOwnership.objects.all()
    for investment_ownership in investment_ownerships:
        investment_ownership.delete()

    investments = Investment.objects.all()
    for investment in investments:
        investment.delete()

    funds = Fund.objects.all()
    for fund in funds:
        fund.delete()

    clients = Client.objects.all()
    for client in clients:
        client.delete()


