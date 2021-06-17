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


from entities.models import Fund, EntityOwnership, CapitalMovement
from supports.models import Support


class CapitalAPI(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):

        fundID = self.request.query_params.get('fundID', None)
        fund = Fund.objects.get(id=fundID)
        movements = fund.get_capital_movements()
        response = {
            'movements': movements,
            'prefRate': fund.get_prefRate()
        }

        return Response(response,  status=status.HTTP_200_OK)


    def post(self, request, *args, **kwargs):

        fundID = request.data['fundID']
        method = request.data['method']
        profile = request.data['profile']

        if method == 'DELETE_CAPITAL':
            movementID = request.data['movementID']
            movement = CapitalMovement.objects.get(id=movementID)
            movement.delete()
            return Response({ 'deletedID': movementID },  status=status.HTTP_200_OK)


        elif method == 'SAVE_CAPITAL_MOVEMENT':

            movement = request.data['movement']

            try:
                movementObj = CapitalMovement.objects.get(id=movement['id'])
                movementObj.update_object(movement, profile)
                _method = 'UPDATE_MOVEMENT'

            except:
                movementObj = CapitalMovement()
                movementObj.save_new(movement, profile, fundID)
                _method = 'NEW_MOVEMENT'

            movementObj.save()
            movement_json = movementObj.get_json()
            
            response = {
                'movement':movement_json,
                'method': _method
            }

            return Response(response,  status=status.HTTP_200_OK)
