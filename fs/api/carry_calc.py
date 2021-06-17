import json

#DJANGO IMPORTS
from django.utils import timezone
from django.shortcuts import get_object_or_404, render, redirect, reverse

#DJANGO REST IMPORTS
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets, status, generics, permissions
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated


from entities.models import Fund, EntityOwnership, LegacyData
from fs.models import Fsli, GenericMapping, CustomMapping, SubAccount, Balance, ClientValue, FundParameter, OverrideValue
from main.models import Period
from supports.models import Support


class CarryCalcAPI(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):

        periodID = self.request.query_params.get('yearID', None)
        fundID = self.request.query_params.get('fundID', None)
        fund = get_object_or_404(Fund, pk=fundID)
        year = get_object_or_404(Period, pk=periodID)

        # legacyData = FundParameter.objects.get_or_create(fund_id=fundID)[0]

        params = FundParameter.objects.get_or_create(fund_id=fundID, period_id=periodID)[0]
        overrided_values = OverrideValue.objects.filter(fund_id=fundID, period_id=periodID)

        DEFAULT_VALUE = {
            'current': 0,
            'previous': 0,
            'unsaved_changes': False,
            'editable': False,
            'isError': False,
        }

        prefRate = fund.get_prefRate()
        prefRate = round(prefRate, 1)

        affilInfo = fund.get_lp_ownership(None)

        supportDetails = []

        keys = [
            { 'name': 'primary', 'type': 'investment' },
            { 'name': 'secondary', 'type': 'investment' },
            { 'name': 'direct', 'type': 'investment' },
            { 'name': 'derivatives', 'type': 'general' },
            { 'name': 'blockers', 'type': 'blockers' },
            { 'name': 'other_income', 'type': 'general' },
            { 'name': 'master', 'type': 'general' },
            { 'name': 'htd_carry', 'type': 'general' },
        ]
                    # { 'name': 'hlv', 'type': 'general' },

        for key in keys:
            obj = fund.get_support_detail(key['name'], year, overrided_values, params)
            obj['name'] = key['name']
            obj['detailType'] = key['type']
            supportDetails.append(obj)

        clientValue = fund.get_client_value(year, 'carry')

        response = {
            'carryDict': {
                'lpPercent': 95,
                'prefRate': 8,
            },

            'affilInfo': affilInfo,
            'clientValue': clientValue,
            'supportDetails': supportDetails,
            'sections':{
                'investor': {
                        'primaryTitle': 'Step 1',
                        'secondaryTitle': 'Investor Flows',
                        'rows': [
                            {
                                'title': 'Total contributions',
                                'hoverText': '',
                                'key': 'contributions',
                                'value': DEFAULT_VALUE,
                                'display': [1,1],
                                'detail': 'capital',
                                'formType': 'text',
                                'calcType': { 'action': 'detail', 'payload': None },
                                'type': 'history to date',
                                'isHoverable': True,
                                'source': 'CDR',
                                'style': {
                                    'justifyContent': 'flex-end',
                                    'paddingRight': '1rem',
                                },
                            },
                            {
                                'title': 'Total distributions',
                                'hoverText': '',
                                'key': 'distributions',
                                'value': DEFAULT_VALUE,
                                'display': [1,1],
                                'detail': 'capital',
                                'formType': 'text',
                                'calcType': { 'action': 'detail', 'payload': None },
                                'type': 'history to date',
                                'isHoverable': True,
                                'source': 'CDR',
                                'style': {
                                    'justifyContent': 'flex-end',
                                    'paddingRight': '1rem',
                                },
                            },
                            {
                                'title': f'Preferred Return at {prefRate} %',
                                'hoverText': '',
                                'key': 'preferred',
                                'value': DEFAULT_VALUE,
                                'display': [1,1],
                                'detail': 'capital',
                                'formType': 'text',
                                'calcType': { 'action': 'detail', 'payload': None },
                                'type': 'history to date',
                                'isHoverable': True,
                                'source': 'CDR',
                                'style': {
                                    'justifyContent': 'flex-end',
                                    'paddingRight': '1rem',
                                    'textDecorationLine': 'underline',
                                    'textDecorationStyle': 'single'
                                },
                            },
                            {
                                'title': 'Distributable pro rata before carry',
                                'hoverText': '',
                                'key': 'pro_rata_before_carry',
                                'value': DEFAULT_VALUE,
                                'display': [1,1],
                                'detail': None,
                                'formType': 'text',
                                'calcType': { 'action': 'SUM', 'payload': [0, 1, 2] },
                                'type': 'history to date',
                                'isHoverable': False,
                                'source': 'CDR',
                                'style': {
                                    'justifyContent': 'flex-end',
                                    'paddingRight': '1rem',
                                    'textDecorationLine': 'underline',
                                    'textDecorationStyle': 'double'
                                },
                            },
                        ],
                },
                'investment': {
                    'primaryTitle': 'Step 2',
                    'secondaryTitle': 'Investment Flows',
                    'rows': [
                            {
                                'title': 'Direct Investments',
                                'hoverText': '',
                                'key': 'direct',
                                'value': DEFAULT_VALUE,
                                'display': [1,1],
                                'detail': 'direct',
                                'formType': 'text',
                                'calcType': { 'action': 'detail', 'payload': 'direct' },
                                'type': 'history to date',
                                'isHoverable': True,
                                'source': 'HR',
                                'style': {
                                    'justifyContent': 'flex-end',
                                    'paddingRight': '1rem',
                                }
                            },
                            {
                                'title': 'Secondary Investments',
                                'hoverText': '',
                                'key': 'secondary',
                                'value': DEFAULT_VALUE,
                                'display': [1,1],
                                'detail': 'secondary',
                                'formType': 'text',
                                'calcType': { 'action': 'detail', 'payload': 'secondary' },
                                'type': 'history to date',
                                'isHoverable': True,
                                'source': 'HR',
                                'style': {
                                    'justifyContent': 'flex-end',
                                    'paddingRight': '1rem',
                                }
                            },
                            {
                                'title': 'Primary Investments',
                                'hoverText': '',
                                'key': 'primary',
                                'value': DEFAULT_VALUE,
                                'display': [1,1],
                                'detail': 'primary',
                                'formType': 'text',
                                'calcType': { 'action': 'detail', 'payload': 'primary' },
                                'type': 'history to date',
                                'isHoverable': True,
                                'source': 'HR',
                                'style': {
                                    'justifyContent': 'flex-end',
                                    'paddingRight': '1rem',
                                }
                            },
                            {
                                'title': 'Derivatives',
                                'hoverText': '',
                                'key': 'derivatives',
                                'value': DEFAULT_VALUE,
                                'display': [1,1],
                                'detail': 'derivatives',
                                'formType': 'text',
                                'calcType': { 'action': 'detail', 'payload': 'derivatives' },
                                'type': 'history to date',
                                'isHoverable': True,
                                'source': 'TB',
                                'style': {
                                    'justifyContent': 'flex-end',
                                    'paddingRight': '1rem',
                                }
                            },
                            {
                                'title': 'Other income',
                                'hoverText': '',
                                'key': 'other_income',
                                'value': DEFAULT_VALUE,
                                'display': [1,1],
                                'detail': 'other_income',
                                'formType': 'text',
                                'calcType': { 'action': 'detail', 'payload': 'other_income' },
                                'type': 'history to date',
                                'isHoverable': True,
                                'source': 'TB',
                                'style': {
                                        'justifyContent': 'flex-end',
                                        'paddingRight': '1rem',
                                    },
                                },

                            {
                                'title': 'Uber Master Activity',
                                'hoverText': '',
                                'key': 'master',
                                'value': DEFAULT_VALUE,
                                'display': [1,1],
                                'detail': 'master',
                                'formType': 'text',
                                'calcType': { 'action': 'detail', 'payload': 'master' },
                                'type': 'history to date',
                                'isHoverable': True,
                                'source': 'TB',
                                'style': {
                                        'justifyContent': 'flex-end',
                                        'paddingRight': '1rem',
                                    },
                            },
                            {
                                'title': 'Blocker Activity',
                                'hoverText': '',
                                'key': 'blockers',
                                'value': DEFAULT_VALUE,
                                'display': [1,1],
                                'detail': 'blockers',
                                'formType': 'text',
                                'calcType': { 'action': 'detail', 'payload': 'blockers' },
                                'type': 'history to date',
                                'isHoverable': True,
                                'source': 'TB',
                                'style': {
                                        'justifyContent': 'flex-end',
                                        'paddingRight': '1rem',
                                    },
                            },
                            {
                                'title': 'Hypothetical net investment flows',
                                'hoverText': '',
                                'key': 'net_inv_flows',
                                'value': DEFAULT_VALUE,
                                'display': [1,1],
                                'detail': 'net_inv_flows',
                                'formType': 'text',
                                'calcType': { 'action': 'sum', 'payload': 'other' },
                                'type': 'history to date',
                                'isHoverable': True,
                                'source': 'TB',
                                'style': {
                                        'justifyContent': 'flex-end',
                                        'paddingRight': '1rem',
                                        'textDecorationLine': 'underline',
                                        'textDecorationStyle': 'double'
                                    },
                            },
                                {
                                'title': 'Maximum allocable carry',
                                'hoverText': 'Maximum amount to be allocated to carried interest partner based on hypothetical net investment flows',
                                'key': 'flows_calc',
                                'value': DEFAULT_VALUE,
                                'display': [1,1],
                                'detail': 'summary',
                                'formType': 'text',
                                'calcType': { 'action': 'mult', 'payload': ['net_inv_flows', 0.2] },
                                'type': 'history to date',
                                'isHoverable': True,
                                'source': 'TB',
                                'style': {
                                        'justifyContent': 'flex-end',
                                        'paddingRight': '1rem',
                                    },
                                }
                        ],
                },
                    'allocation': {
                        'primaryTitle': 'Step 3',
                        'secondaryTitle': 'Allocation',
                        'rows': [
                    {
                        'title': 'Hypothetical Liquidation Value',
                        'hoverText': '',
                        'key': 'materiality',
                        'value': DEFAULT_VALUE,
                        'display': [1,1],
                        'detail': 'materiality',
                        'formType': 'text',
                        'calcType': { 'action': 'detail', 'payload': 'materiality' },
                        'type': 'as of year-end',
                        'isHoverable': True,
                        'source': 'HR',
                        'style': {
                            'justifyContent': 'flex-end',
                            'paddingRight': '1rem',
                        }
                    },
                    {
                        'title': 'Distributable pro rata before carry',
                        'hoverText': 'Cash to be distributed to investors on a pro rata basis before carried interest allocation to carried interest partner to be considered',
                        'key': 'dist_pro_rata',
                        'value': DEFAULT_VALUE,
                        'display': [1,1],
                        'detail': 'dist_pro_rata',
                        'formType': 'text',
                        'calcType': { 'action': 'none', 'payload': 'direct' },
                        'type': 'as of year-end',
                        'isHoverable': True,
                        'source': 'HR',
                        'style': {
                            'justifyContent': 'flex-end',
                            'paddingRight': '1rem',
                        }
                    },
                    {
                        'title': 'Maximum distributable carry',
                        'hoverText': 'Maximum amount that can be distributed as carry based on comparison of investor flows with hypothethical fund liquidation value',
                        'key': 'max_distributable',
                        'value': DEFAULT_VALUE,
                        'display': [1,1],
                        'detail': 'dist_pro_rata',
                        'formType': 'text',
                        'calcType': { 'action': 'none', 'payload': 'direct' },
                        'type': 'history to date',
                        'isHoverable': True,
                        'source': 'HR',
                        'style': {
                            'justifyContent': 'flex-end',
                            'paddingRight': '1rem',
                        }
                    },
                    {
                        'title': 'Total Allocable Carry',
                        'hoverText': 'Total amount of carried interest that can be allocated to carried interest partner based on comparison of hypothetical net investment flows with maximum amount available for distribution',
                        'key': 'total_allocable_carry',
                        'value': DEFAULT_VALUE,
                        'display': [1,1],
                        'detail': None,
                        'formType': 'text',
                        'calcType': None,
                        'type': 'as of year-end',
                        'isHoverable': True,
                        'source': 'Rc',
                        'style': {
                            'justifyContent': 'flex-end',
                            'paddingRight': '1rem',
                        }
                    },
                    {
                        'title': 'Prior Year History to Date Carry',
                        'hoverText': 'Prior year history to date amount of carried interest allocated to carried interest partner',
                        'key': 'htd_carry',
                        'value': DEFAULT_VALUE,
                        'display': [1,1],
                        'detail': 'carry',
                        'formType': 'text',
                        'calcType': { 'action': 'detail', 'payload': 'htd_carry' },
                        'type': 'history to date',
                        'isHoverable': True,
                        'source': 'PY',
                        'style': {
                            'justifyContent': 'flex-end',
                            'paddingRight': '1rem',
                        }
                    },
                    {
                        'title': 'Current Year',
                        'hoverText': 'Amount of carried interest to be allocated as part of current year capital reallocation',
                        'key': 'cy_carry',
                        'value': DEFAULT_VALUE,
                        'display': [1,1],
                        'detail': 'current_year',
                        'formType': 'text',
                        'calcType': { 'action': 'none', 'payload': 'direct' },
                        'type': 'history to date',
                        'isHoverable': True,
                        'source': 'CY',
                        'style': {
                            'justifyContent': 'flex-end',
                            'paddingRight': '1rem',
                        }
                    },
            ],
                    },
        }

        }

        return Response(response,  status=status.HTTP_200_OK)


    def post(self, request, *args, **kwargs):



        data = request.data
        
        profile = data['currentUser']
        area = data['area']
        indexes = data['indexes']
        key = data['key']
        fundID = data['fundID']
        periodID = data['periodID']
        value = data['saveData']

        legacyList = ['derivatives','htd_carry','master', 'other_income', 'blockers','investments']

        print('key', key, indexes, area)

        if area in legacyList:

            if key == 'total':
                legacyData = get_object_or_404(LegacyData, fund_id=fundID)
                legacyData.set_data(area, value)

            elif key == 'include':

                params = FundParameter.objects.get(fund_id=fundID, period_id=periodID)
                
                if area in ['derivatives','master']:
                    params.update_includes(area, indexes['accountIndex'], value)

                elif area == 'blockers':
                    blockerID = indexes['blockerID']
                    keyName = f'blocker_{blockerID}'
                    params.update_includes(keyName, indexes['accountIndex'], value)

                elif area == 'investments':
                    investmentType = indexes['investmentType']
                    activityType = indexes['type']
                    keyName = f'{investmentType}_{activityType}'
                    print('keyName', keyName)
                    params.update_includes(keyName, indexes['accountIndex'], value)

        elif area == 'client_value':
            client_value = ClientValue.objects.get(fund_id=fundID, period_id=periodID)
            client_value.set_value('carry', value['current'])
            
        response = ['carry post']

        return Response(response,  status=status.HTTP_200_OK)

