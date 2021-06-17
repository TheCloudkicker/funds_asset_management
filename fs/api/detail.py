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
from fs.models import Fsli, GenericMapping, CustomMapping, SubAccount, Balance, ClientValue


legacyList = [
    'derivatives','other_income','master','htd_carry', 'blockers'
    ]

investmentsList = [
    'primary', 'secondary', 'direct'
]

class DetailAPI(APIView):

    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):

        fundID = request.data['fundID']
        year = request.data['year']
        dataType = request.data['key']
        value = request.data['value']
        isLegacy = request.data['isLegacy']


        print('dataType', dataType)

        if isLegacy:

            legacy = LegacyData.objects.get(fund_id=fundID)

            if dataType in legacyList:
               response_value = legacy.update_data(dataType, str(year), float(value['current']))
               actType = None

            if dataType in investmentsList:
                actType = request.data['actType']
                invDataType = f'{dataType}_{actType}'
                response_value = legacy.update_data(invDataType, str(year), float(value['current']))
                print('invType', actType)


        else:
            response_value = None
            print("Current")



        response = {
            'dataType': dataType,
            'year': year,
            'value': response_value,
            'actType': actType
        }

        return Response(response,  status=status.HTTP_200_OK)