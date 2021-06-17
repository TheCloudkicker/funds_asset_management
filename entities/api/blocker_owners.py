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


class BlockerOwnersAPI(APIView):

    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):

        blocker_ownership_obj = request.data['blocker_ownership']

        print('blocker_ownership', blocker_ownership_obj)

        try:
            int(blocker_ownership_obj['id'])
            blocker_ownership = get_object_or_404(EntityOwnership, pk=blocker_ownership_obj['id'])

            blocker_ownership.owner_entity_id=blocker_ownership_obj['owner_entity']['value']
            blocker_ownership.owned_entity_id=blocker_ownership_obj['owned_entity']['value']
            blocker_ownership.ownership_percentage=blocker_ownership_obj['ownership_percentage']
            blocker_ownership.save()

            uuid = blocker_ownership.id

            


        except:
            blocker_ownership = EntityOwnership(
                owner_entity_id=blocker_ownership_obj['owner_entity']['value'],
                owned_entity_id=blocker_ownership_obj['owned_entity']['value'],
                ownership_percentage=blocker_ownership_obj['ownership_percentage']
            )
            blocker_ownership.save()
            uuid = blocker_ownership_obj['id']


   

        response = {
               'id': blocker_ownership.id,
                'uuid': uuid,
                'editable': False,
                'unsaved_changes': False,
                'level': 1,
                'owner_entity': { 
                    'value': blocker_ownership.owner_entity.id, 
                    'label': blocker_ownership.owner_entity.legal_name,
                    },
                'prev_owner_entity_id':blocker_ownership.owner_entity.id, 
                'owned_entity': { 
                    'value': blocker_ownership.owned_entity.id, 
                    'label': blocker_ownership.owned_entity.legal_name,
                    },
                'prev_owned_entity_id':blocker_ownership.owned_entity.id, 
                'ownership_error': False,
                'ownership_percentage': blocker_ownership.ownership_percentage,
                'prev_ownership_percentage': blocker_ownership.ownership_percentage,
                'ownership_percentage_error': False,
                'net_ownership': 50,

        }

        return Response(response,  status=status.HTTP_200_OK)


    def get(self, request, pk, *args, **kwargs):

        blocker_ownerships = []
        blocker_ownerships_qs = EntityOwnership.objects.filter(owned_entity_id=pk).values(
            'id','owner_entity_id','owner_entity__legal_name',
            'owned_entity_id','owned_entity__legal_name','ownership_percentage'
        )

        for blocker_ownership in blocker_ownerships_qs:

            obj = {
                'id': blocker_ownership['id'],
                'editable': False,
                'unsaved_changes': False,
                'level': 1,
                'owner_entity': { 
                    'value': blocker_ownership['owner_entity_id'], 
                    'label': blocker_ownership['owner_entity__legal_name'] 
                    },
                'prev_owner_entity_id':blocker_ownership['owner_entity_id'], 
                'owned_entity': { 
                    'value': blocker_ownership['owned_entity_id'], 
                    'label': blocker_ownership['owned_entity__legal_name'] 
                    },
                'prev_owned_entity_id':blocker_ownership['owned_entity_id'], 
                'ownership_type': { 'value': 'SHARED', 'label': 'SHARED' },
                'prev_ownership_type': { 'value': 'SHARED', 'label': 'SHARED' },
                'ownership_error': False,
                'ownership_percentage': blocker_ownership['ownership_percentage'],
                'prev_ownership_percentage': blocker_ownership['ownership_percentage'],
                'ownership_percentage_error': False,
                'net_ownership': 50,
            }

            blocker_ownerships.append(obj)





        return Response(blocker_ownerships,  status=status.HTTP_200_OK)


    def delete(self, request, pk, *args, **kwargs):

        blocker_ownership = get_object_or_404(EntityOwnership, pk=pk)
        deletedID = blocker_ownership.id

        blocker_ownership.delete()

        return Response({ 'deletedID':deletedID },  status=status.HTTP_200_OK)

