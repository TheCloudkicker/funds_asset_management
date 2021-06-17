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


from entities.models import Fund, FundCriteriaDef
from main.models import Period
from fs.models import Fsli, GenericMapping, CustomMapping, SubAccount, Balance, ClientValue



class ClientValueAPI(APIView):

    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):

        fundID = request.data['fundID']
        clientValue = request.data['clientValue']
        method = request.data['method']

        client_value = ClientValue.objects.get(id=clientValue['id'])

        client_value.set_value('carry',clientValue['current'] )

        client_value.save()

        response = {
            'client_value': client_value.get_json('carry')
        }

        return Response(response,  status=status.HTTP_200_OK)