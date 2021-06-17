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


from entities.models import Fund, EntityOwnership, CapitalMovement, Investor, FundCriteriaDef, InvestorCommit
from supports.models import Support
from main.models import Period

updateList = ['isAffiliate']


class InvestorAPI(APIView):

    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):

        fundID = request.data['fundID']
        method = request.data['method']
        profile = request.data['profile']
        investor = request.data['investor']
        key = request.data['key']


        investorCommit = InvestorCommit.objects.get(fund_id=fundID, investor_id=investor['id'])

        if key in updateList:
            value = investor[key]['current']
            investorCommit.update_value(key, value)
            investor[key]['previous'] = investor[key]['current']
            investor[key]['unsaved_changes'] = False
            


        response = {
            'investor': investor
        }

        return Response(response,  status=status.HTTP_200_OK)


            



    def get(self, request, *args, **kwargs):

        fundID = self.request.query_params.get('fundID', None)
        periodID = self.request.query_params.get('periodID', None)
        fund = Fund.objects.get(id=fundID)

        investors = fund.get_investors()
        headers_qs = FundCriteriaDef.objects.filter(criteriaType='investor')

        headers = [
            { 'value':'Investor ID', 'label': 'Investor ID' },
            { 'value':'Commitment', 'label': 'Commitment' },
            { 'value':'isAffiliate', 'label': 'Affiliate' },
        ]

        for header in headers_qs:

            headers.append({
                'value': header.id,
                'label': header.text
            })

        response = {
            'investors': investors,
            'headers': headers
        }

        return Response(response,  status=status.HTTP_200_OK)


