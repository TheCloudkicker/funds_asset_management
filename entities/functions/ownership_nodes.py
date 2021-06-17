from decimal import Decimal
from django.apps import apps
from django.db.models import Q
from django.shortcuts import get_object_or_404


def generate_ownership_tree(fund, period, *args, **kwargs):

    EntityOwnership = apps.get_model('entities', 'EntityOwnership')
    Fund = apps.get_model('entities', 'Fund')
    ownerships_qs = EntityOwnership.objects.all()
    entities = Fund.objects.all()

    def get_children(ownerships_qs, period, entity, entities, ownership_type, level):

        ownerships = ownerships_qs.filter(owner_entity=entity, ownership_type=ownership_type)

        children_list = []

        for ownership in ownerships:

            child = entities.get(id=ownership.owned_entity_id)

            obj = {
                'value': child.id,
                'label': child.legal_name,
                'gross_percent': ownership.ownership_percentage,
                'combined_entities': get_children(ownerships_qs, period, child, entities, 'COMBINED', level),
                'consolidated_entities': get_children(ownerships_qs, period, child, entities, 'CONSOLIDATED', level),
                'unconsolidated_entities': get_children(ownerships_qs, period, child, entities, 'SHARED', level + 1),
                'accounts': child.get_tb_accounts(period),
                'level': level
            }

            children_list.append(obj)

        return children_list

    initial_level = 1

    ownership_obj = {
        'value': fund.id,
        'label': fund.legal_name,
        'combined_entities': get_children(ownerships_qs, period, fund, entities, 'COMBINED', initial_level),
        'consolidated_entities': get_children(ownerships_qs, period, fund, entities, 'CONSOLIDATED', initial_level),
        'unconsolidated_entities': get_children(ownerships_qs, period, fund, entities, 'SHARED', initial_level + 1),
        'accounts': fund.get_tb_accounts(period),
        'level': initial_level,
    }


    return ownership_obj

















def generate_applicable_entities(fund, period, fundType):

    EntityOwnership = apps.get_model('entities', 'EntityOwnership')
    Fund = apps.get_model('entities', 'Fund')
    ownerships_qs = EntityOwnership.objects.all()
    entities = Fund.objects.all()
    

    if fundType == 'top':

        ownerships = ownerships_qs.filter(owner_entity=fund)

        def get_ownerships_recursive(ownerships, entity, entities):

            temp_entities_list = []
            temp_ownerships_list = []

            child_ownerships = ownerships.filter(owner_entity=entity)

            for child_ownership in child_ownerships:
                child_entity = entities.get(id=child_ownership.owned_entity_id)

                temp_entities_list.append(child_entity)
                sub_entities_list, sub_ownerships_list  = get_ownerships_recursive(ownerships, child_entity, entities)
                temp_entities_list += sub_entities_list
                temp_ownerships_list += sub_ownerships_list

            return temp_entities_list, temp_ownerships_list

        relevant_entities_list, relevant_ownerships_list  = get_ownerships_recursive(ownerships, fund, entities)
        relevant_entities_list.insert(0, fund)

        response = {
            'selected_entity': fund,
            'relevant_entities_list': relevant_entities_list,
            'relevant_ownerships_list': relevant_ownerships_list,
            'ownerships_qs': ownerships_qs
        }

        return response
        


    # entity_ownerships = EntityOwnership.objects.all().values(
    #     'id', 'ownership_percentage',
    #     'owner_entity_id','owner_entity__legal_name',
    #     'owned_entity_id','owned_entity__legal_name',)

    # ownership_nodes = []

    # for entity_ownership in entity_ownerships:

    #     owner_entity = { 
    #                 'value': entity_ownership['owner_entity_id'], 
    #                 'label': entity_ownership['owner_entity__legal_name'] 
    #                 }
    #     owned_entity =  { 
    #                 'value': entity_ownership['owned_entity_id'], 
    #                 'label': entity_ownership['owned_entity__legal_name'] 
    #                 }

    #     obj = {
    #             'id': entity_ownership['id'],
    #             'editable': True,
    #             'level': 'Not Set',

    #             'owner_entity': {
    #                 'current': owner_entity,
    #                 'prev': owner_entity,
    #                 'unsaved_changes': False,
    #             },
    #             'owned_entity': {
    #                 'current': owned_entity,
    #                 'prev': owned_entity,
    #                 'unsaved_changes': False,
    #             },
    #             'ownership_percentage': {
    #                 'current': entity_ownership['ownership_percentage'],
    #                 'prev': entity_ownership['ownership_percentage'],
    #                 'unsaved_changes': False,
    #             },
    #             'ownership_type': {
    #                 'current': '',
    #                 'prev': '',
    #                 'unsaved_changes': False,
    #             },
    #             'net_ownership': 0,
    #             'errors': [],
    #         }
        
    #     ownership_nodes.append(obj)


    # return ownership_nodes


    

# """
# NODE = {
#     fundID: Int,
#     fundName: String,
#     no_owners: Int
# }

# EDGE = {
#     owner_entity: { id: Int: name: String }
#     owned_entity: { id: Int: name: String },
#     ownership_percentage: Float
# }


# """

