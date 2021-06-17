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
from main.models import Period




class EntityOwnershipsAPI(APIView):

    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):

        ownership_obj = request.data['ownership']

        prev_ownerships = EntityOwnership.objects.filter(
            owner_entity_id=ownership_obj['owner_entity']['value'],
            owned_entity_id=ownership_obj['owned_entity']['value']
        )

        if len(prev_ownerships) > 0:
            response = {
                'status': 'fail',
                'message': 'Ownership already exists'
            }
            return Response(response,  status=status.HTTP_200_OK )




        new_ownership = EntityOwnership(
            owner_entity_id=ownership_obj['owner_entity']['value'],
            owned_entity_id=ownership_obj['owned_entity']['value'],
            ownership_percentage=ownership_obj['ownership_percentage']
        )
        new_ownership.save()

        entity_ownership = {
                'id': 1,
                'editable': True,
                'level': 'Not Set',

                'owner_entity': {
                    'current': None,
                    'prev': None,
                    'unsaved_changes': False,
                },
                'owned_entity': {
                    'current': None,
                    'prev': None,
                    'unsaved_changes': False,
                },
                'ownership_percentage': {
                    'current': '',
                    'prev': '',
                    'unsaved_changes': False,
                },
                'ownership_type': {
                    'current': '',
                    'prev': '',
                    'unsaved_changes': False,
                },
                'net_ownership': 0,
                'errors': [],
            }



        response = {
            'status': 'success',
            'messages': [],
            'entity_ownership':entity_ownership
        }



        return Response(response,  status=status.HTTP_200_OK)


    def get(self, request, pk, *args, **kwargs):

        fund = get_object_or_404(Fund, pk=pk)
        period = Period.objects.first()
        entity_ownership_obj = fund.get_ownership_tree(period)

        return Response(entity_ownership_obj,  status=status.HTTP_200_OK)


    def delete(self, request, pk, *args, **kwargs):

        ownership = get_object_or_404(EntityOwnership, pk=pk)
        deletedID = ownership.id
        ownership.delete()

        return Response({ 'deletedID': deletedID },  status=status.HTTP_200_OK)

