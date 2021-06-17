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


from entities.models import Fund, FundCriteriaDef, LegacyData
from main.models import Period
from fs.models import Fsli, GenericMapping, CustomMapping, SubAccount, Balance, ClientValue, FundParameter


general_list = [
    'derivatives','other_income','master','htd_carry',
    ]

investmentsList = [
    'primary', 'secondary', 'direct'
]

class FundParamsAPI(APIView):

    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):

        fundID = request.data['fundID']
        periodID = request.data['periodID']
        key = request.data['key']
        index = request.data['index']
        value = request.data['value']
        actType = request.data['actType']

        print("FUND PARAMS",index, key, value, actType)

        if key in general_list:
            param = FundParameter.objects.get(fund_id=fundID, period_id=periodID)
            param.update_includes(key, index, value)

        elif key in investmentsList:
            param = FundParameter.objects.get(fund_id=fundID, period_id=periodID)
            composite_key = f'{key}_{actType}'
            param.update_includes(composite_key, index, value)

        elif 'blocker_' in actType:
            param = FundParameter.objects.get(fund_id=fundID, period_id=periodID)
            param.update_includes(actType, index, value)

        else:
            pass
            

        response = {
            'status': 'ok'
        }
      

        return Response(response,  status=status.HTTP_200_OK)