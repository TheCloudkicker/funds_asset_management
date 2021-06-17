from decimal import Decimal
from django.apps import apps
from django.db.models import Q



def generate_navigator_structure(fund, period=None):

    structure = {
        'id': 1,
        'name': 'Lux Fund 1',

        'level_1_entities': [
            {
                'id': 2,
                'name': "Lux Fund AIV",
                'legal_type': "LP",
                'audited': False,
                'combines': True,
                'consolidates': False,
                'no_investments': 20,
                'coordinates': [],
                'owned_by': []
            },
            {
                'id': 1,
                'name': "Lux Fund 1",
                'legal_type': "LP",
                'audited': True,
                'combines': False,
                'consolidates': False,
                'no_investments': 5,
                'coordinates': [],
                'owned_by': []
            },
            {
                'id': 3,
                'name': "Lux Fund FIB",
                'legal_type': "LLC",
                'audited': False,
                'combines': False,
                'consolidates': True,
                'no_investments': 13,
                'coordinates': [],
                'owned_by': []
            },
        ],
        'level_2_entities': [
            {
                'id': 4,
                'name': "Blocker 1 LLC",
                'legal_type': "LLC",
                'audited': False,
                'combines': False,
                'consolidates': False,
                'no_investments': 14,
                'coordinates': [],
                'owned_by': []
            },
            {
                'id': 5,
                'name': "Blocker 2 Corp",
                'legal_type': "CORP",
                'audited': False,
                'combines': False,
                'consolidates': False,
                'no_investments': 2,
                'coordinates': "",
                'owned_by': []
            },
            {
                'id': 6,
                'name': "Blocker 3 LTD",
                'legal_type': "LTD",
                'audited': False,
                'combines': False,
                'consolidates': False,
                'no_investments': 4,
                'coordinates': [],
                'owned_by': []
            },
        ],
        'level_3_entities': [
            {
                'id': 7,
                'name': "Blocker 4 LLC",
                'legal_type': "LLC",
                'audited': False,
                'combines': False,
                'consolidates': False,
                'no_investments': 23,
                'coordinates': [],
                'owned_by': [4]
            },
            {
                'id': 8,
                'name': "Blocker 5 Corp",
                'legal_type': "CORP",
                'audited': False,
                'combines': False,
                'consolidates': False,
                'no_investments': 3,
                'coordinates': [],
                'owned_by': [5]
            },
            {
                'id': 9,
                'name': "Blocker 6 LTD",
                'legal_type': "LTD",
                'audited': False,
                'combines': False,
                'consolidates': False,
                'no_investments': 1,
                'coordinates': [],
                'owned_by': [5]
            },
            {
                'id': 10,
                'name': "Blocker 7 LTD",
                'legal_type': "LTD",
                'audited': False,
                'combines': False,
                'consolidates': False,
                'no_investments': 4,
                'coordinates': [],
                'owned_by': [6]
            },
        ],
        'investments': []

    }

    return structure

