

def generate_materiality(period, *args,**kwargs):


    materiality = {
        'selected_entity': None,
        'accounts': [],
        'combined_entities': [
            { 'value': 1, 'label': 'Entity 1', 'accounts':[] }
        ],
        'consolidated_entities':[],
        'overall': 500,
        'performance': 375,
        'deminimis': 50,
    }


    return materiality