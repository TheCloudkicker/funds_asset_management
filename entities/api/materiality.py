import json
import uuid

#DJANGO IMPORTS
from django.utils import timezone
from django.shortcuts import get_object_or_404, render, redirect, reverse

#DJANGO REST IMPORTS
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets, status, generics, permissions
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated


from entities.models import Fund, FundCriteriaDef, FundPeriodMateriality
from main.models import Period
from fs.models import Fsli, GenericMapping, CustomMapping, SubAccount, Balance



def total_accounts(accounts):

    assets = 0
    liabilities = 0

    for account in accounts:

        if account['name'].startswith('1'):
            assets += float(account['balance'])

        elif account['name'].startswith('2'):
            liabilities += float(account['balance'])

    net_assets = assets + liabilities

    return net_assets

class MaterialityAPI(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):

        fundID = self.request.query_params.get('fundID', None)
        periodID = self.request.query_params.get('periodID', None)

        fund = Fund.objects.get(id=fundID)
        period = Period.objects.get(id=periodID)

        try:
            materiality = FundPeriodMateriality.objects.get(fund=fund, period=period)
        except:
            materiality = FundPeriodMateriality(fund=fund, period=period)
            materiality.save()



        accounts = fund.get_tb_accounts(period)

        net_assets = total_accounts(accounts)

        
        response = {
            'value': materiality.id,
            'fund_id': materiality.fund_id,
            'period_id': materiality.period_id,
            'audit_setting': materiality.get_audit_setting(),
            'net_assets': net_assets,
            'accounts': accounts,
        }


        return Response(response,  status=status.HTTP_200_OK)
