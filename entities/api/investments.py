import json
import datetime

#DJANGO IMPORTS
from django.utils import timezone
from django.shortcuts import get_object_or_404, render, redirect, reverse

#DJANGO REST IMPORTS
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets, status, generics, permissions
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated


from entities.models import Fund, EntityOwnership, CapitalMovement, Investment, FundCriteriaDef
from supports.models import Support


class InvestmentAPI(APIView):

    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):

        # fundID = request.data['fundID']
        # method = request.data['method']
        # profile = request.data['profile']

        # # fund = get_object_or_404(Fund, pk=fundID)

        # print('method', method)

        # if method == 'DELETE_CAPITAL':
        #     movementID = request.data['movementID']

        #     movement = CapitalMovement.objects.get(id=movementID)

        #     movement.delete()

        #     response = {
        #         'deletedID': movementID
        #     }
        #     return Response(response,  status=status.HTTP_200_OK)

        # elif method == 'SAVE_CAPITAL_MOVEMENTS':

        #     capitalMovements = request.data['capitalMovements']

        #     for capitalMovement in capitalMovements:
        #         try:
        #             cm = CapitalMovement.objects.get(id=capitalMovement['id'])
        #             created = False
        #         except:
        #             cm = CapitalMovement()
        #             created = True

        #         cm.movementType = capitalMovement['movementType']['current']['value']
        #         cm.totalAmount = capitalMovement['totalAmount']['current']
        #         cm.addedBy = profile
        #         cm.fund_id = fundID
                
        #         if created:
        #             now = datetime.datetime.now()
        #             cm.dateAdded = now

        #         movementDate = capitalMovement['movementDate']['current']

        #         if movementDate:
        #             movementDateDt = datetime.datetime.strptime(movementDate, '%m-%d-%Y')
        #         else:
        #             movementDateDt = None

        #         cm.movementDate = movementDateDt

        #         cm.save()

        #     capital_movements = CapitalMovement.objects.filter(fund_id=fundID)
            
        #     response = []

        #     for capital_movement in capital_movements:

        #         # movementDateStr = capital_movement.movementDate.strftime('%Y-%m-%dT%H:%M:%S.%fZ')
        #         movementDateStr = capital_movement.movementDate.strftime('%m-%d-%Y')
        #         dateAddedStr = capital_movement.dateAdded.strftime('%Y-%m-%d')

        #         obj = {
        #                 'id': capital_movement.id,
        #                 'editable': False,
        #                 'movementType': {
        #                     'previous': { 'value': 'Contribution', 'label': 'Contribution' },
        #                     'current': { 'value': 'Contribution', 'label': 'Contribution' },
        #                     'readOnly': True,
        #                     'options': [
        #                         { 'value': 'Contribution', 'label': 'Contribution' },
        #                         { 'value': 'Distribution', 'label': 'Distribution' },
        #                     ],
        #                     'isError': False,
        #                     'unsaved_changes': False
        #                 },
        #                 'totalAmount': {
        #                     'previous': capital_movement.totalAmount,
        #                     'current': capital_movement.totalAmount,
        #                     'placeholder': 'Enter net movement in USD',
        #                     'readOnly': True,
        #                     'isError': False,
        #                     'unsaved_changes': False
        #                 },
        #                 'movementDate': {
        #                     'previous': movementDateStr,
        #                     'current': movementDateStr,
        #                     'readOnly': True,
        #                     'isError': False,
        #                     'unsaved_changes': False
        #                 },
        #                 'addedBy': capital_movement.addedBy,
        #                 'dateAdded': dateAddedStr
        #             }

        #         response.append(obj)

        response = {
            'post': 'ok'
        }

        return Response(response,  status=status.HTTP_200_OK)


            



    def get(self, request, *args, **kwargs):

        fundID = self.request.query_params.get('fundID', None)
        print('fundID', fundID)
        fund = Fund.objects.get(id=fundID)
        # response = fund.get_investors()

        investments = []
        investments_qs = Investment.objects.filter(investmentownership__owner=fund)

    
        for investment in investments_qs:

            investments.append({
                'value':investment.id,
                'label': investment.name,
                'ownerEntity': { 'value': fund.id , 'label': fund.legal_name },
                'criterias': investment.get_criterias(),
            })


        headers = [
            { 'value':'owner_id', 'label': 'Owner Entity' },
            { 'value':'name', 'label': 'Name' },
            { 'value':'commitment_usd', 'label': 'Commitment' },
        ]

        add_headers = FundCriteriaDef.objects.filter(criteriaType='investment')

        for add_header in add_headers:

            headers.append({
                'value': add_header.id,
                'label': add_header.text
            })

        response = {
            'investments': investments,
            'headers': headers
        }

        return Response(response,  status=status.HTTP_200_OK)


