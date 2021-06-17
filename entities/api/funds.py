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

from entities.models import Fund, FundAltName, FundCriteriaDef
from main.models import Settings,Period
from supports.models import Support, ClientReport
from supports.serializers import SupportSerializer


class FundsAPI(APIView):

    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):

        method = request.data['method']
        fundObject = request.data['fundObject']
        print('method',method)


        if method == 'UPDATE_FUND':

            details = fundObject['details']

            fundID = fundObject['id']

            fund = get_object_or_404(Fund, pk=fundID)

            print('fund', fund)

            default_criteria = [
                'legal_name', 'trackingID', 
                'isAudited','fund_life', 
                'acct_system','domicile_location',
                'entity_type', 'administrator_id',
                'depository_id','investment_manager_id',
                'sub_advisor_id', 'general_partner_id',
                'carry_partner_id','prefRate'
                ]

            for detail in details:

                key = detail['key']
                
                if detail['unsaved_changes'] == True:

                    if key in default_criteria:

                        if detail['formType'] == 'bool' or detail['formType'] == 'select':
                            value = detail['current']['value']
                            setattr(fund, key, value)

                        elif detail['formType'] == 'input':
                            value = detail['current']
                            setattr(fund, key, value)

                        # elif detail['formType'] == 'date':
                        #     print("DATE", key, value)
                            # value = detail['current']
                            # setattr(fund, key, value)

                    elif key == 'commencement_date':
                        value = detail['current']
                        fund.set_commencement_date(value)
                        print("DATE", key, value)

                    else:
                        fund.set_fund_criteria('key', 'value')
                        print("***")
                        print(detail['key'])


                    detail['unsaved_changes'] = False
                    detail['previous'] = detail['current']

            fund.save()



        response = {
            'fundObject': fundObject,
            'method': method
        }


        return Response(response,  status=status.HTTP_200_OK)

    def get(self, request, *args, **kwargs):

        fundID = self.request.query_params.get('fundID', None)


        if fundID:
            fund = get_object_or_404(Fund, pk=fundID)
            try: settings = Settings.objects.first()
            except: settings = None


            if fund.entity_type: entity_type = { 'value':fund.entity_type, 'label':fund.entity_type  }
            else: entity_type = None

            # if fund.general_partner: general_partner = { 'value':fund.general_partner.id, 'label':fund.general_partner.name_hash  }
            # else: general_partner = None

            # if fund.carry_partner: carry_partner = { 'value':fund.carry_partner.id, 'label':fund.carry_partner.name_hash  }
            # else: carry_partner = None
            
            general_partner = None
            carry_partner = None

            alt_names_qs = FundAltName.objects.filter(fund=fund)
            alt_names = []

            for alt_name in alt_names_qs:
                if alt_name.created_dt:  dateCreated = alt_name.created_dt.strftime('%Y-%m-%d')
                else: dateCreated = None
                obj = {
                    'id':alt_name.id,
                    'fundID': alt_name.fund_id,
                    'editable': False,
                    'name':{
                        'current': alt_name.name,
                        'prev': alt_name.name,
                        'unsaved_changes':False
                    },
                    'dateCreated':dateCreated,
                    'createdBy':alt_name.created_userName,
                }
                alt_names.append(obj)

            if fund.fund_life: fund_life = fund.fund_life
            else: fund_life = ''


            # fund.get_uploaded_supports()

            response = {
                'uploaded_reports': [],
                'fundObject':{
                    'id': fund.id,
                    'details': fund.get_details('fund'),
                    'alt_names': alt_names,
                    'legacy':fund.get_legacy_data2(),
                    'capital': [],
                    }
                }

            return Response(response,  status=status.HTTP_200_OK)


        else:
            headers = [
                { 'value':'legal_name', 'title': 'Name' },
                { 'value':'trackingID', 'title': 'Fund ID' },
                { 'value':'fund_life', 'title': 'Fund Life' },
                { 'value':'isAudited', 'title': 'Is Audited' },
                { 'value':'domicile_location', 'title': 'Domicile Location' },
                { 'value':'acct_system', 'title': 'Accounting System' },
                { 'value':'entity_type', 'title': 'Entity Type' },
                { 'value':'administrator_id', 'title': 'Administrator' },
                { 'value':'general_partner_id', 'title': 'General Partner' },
                { 'value':'carry_partner_id', 'title': 'Carry Partner' },
            ]
            criterias = [
                { 'value':'fund_life', 'title': 'Fund Life' },
                { 'value':'isAudited', 'title': 'Is Audited' },
                { 'value':'domicile_location', 'title': 'Domicile Location' },
                { 'value':'acct_system', 'title': 'Accounting System' },
                { 'value':'entity_type', 'title': 'Entity Type' },
                { 'value':'administrator_id', 'title': 'Administrator' },
                { 'value':'general_partner_id', 'title': 'General Partner' },
                { 'value':'carry_partner_id', 'title': 'Carry Partner' },
            ]


            funds = []
            funds_qs = Fund.objects.all().order_by('-legal_name')

            for fund in funds_qs:

                funds.append({
                    'value':fund.id,
                    'trackingID': fund.trackingID,
                    'label': fund.legal_name,
                    'criterias': criterias,
                })

    

            add_headers = FundCriteriaDef.objects.filter(criteriaType='fund')

            for add_header in add_headers:

                headers.append({
                    'value': add_header.id,
                    'label': add_header.text
                })

            response = {
                'funds': funds,
                'headers': headers
            }


            return Response(response,  status=status.HTTP_200_OK)
