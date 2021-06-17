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


from entities.models import Fund, EntityOwnership
from fs.models import OverrideValue


class OverrideValueAPI(APIView):

    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):

        uuid = request.data['uuid']
        fundID = request.data['fundID']
        periodID = request.data['periodID']
        overrideValue = request.data['overrideValue']

        try:
            value = OverrideValue.objects.get(
                fund_id=fundID,
                period_id=periodID,
                uuid=uuid,
            )
            value.value = overrideValue

        except:
            value = OverrideValue(
                fund_id=fundID,
                period_id=periodID,
                uuid=uuid,
                value=overrideValue
            )
            
        value.save()


        structure = ['post']

        return Response(structure,  status=status.HTTP_200_OK)
