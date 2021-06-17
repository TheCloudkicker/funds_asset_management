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

from fs.models import Fsli


class FslisAPI(APIView):

    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):

        fsli_obj = request.data['fsli']

        if fsli_obj['uuid']:
            fsli = Fsli.objects.create(
                name=fsli_obj['name'],
                fsli_type=fsli_obj['fsliType']['value'],
            )
            fsli.save()
            created = True

        else:
            fsli = get_object_or_404(Fsli, pk=fsli_obj['id'])

            fsli.name = fsli_obj['name']
            fsli.fsli_type = fsli_obj['fsliType']['value']
            fsli.save()
            created = False

        fslis_serializer = {
                'id': fsli.id,
                'uuid': fsli_obj['uuid'],
                'name': fsli.name,
                'fsliType':  fsli.fsli_type,
                'entityType': None,
                'noSubAccounts': 2,
                'created': created
        }

        return Response(fslis_serializer,  status=status.HTTP_200_OK)


    def delete(self, request, pk, format=None):

        fsli_obj = get_object_or_404(Fsli, pk=pk)

        fslis_serializer = {
            'deletedID': fsli_obj.id
        }

        fsli_obj.delete()

        return Response(fslis_serializer,  status=status.HTTP_200_OK)

    def get(self, request, *args, **kwargs):

        fslis_qs = Fsli.objects.all()

        fslis_serializer = []

        for fsli in fslis_qs:

            if fsli.fsli_type:fsli_type = { 'value': fsli.fsli_type, 'label': fsli.fsli_type }
            else:fsli_type = None


            obj = {
                'id': fsli.id,
                'uuid': '',
                'name': fsli.name,
                'name_prev': fsli.name,
                'fsliType':  fsli_type,
                'fsliType_prev': fsli_type,
                'entityType': None,
                'noSubAccounts': 2,
                'editable': False,
                'unsaved_changes': False,
            }
            fslis_serializer.append(obj)
        

        return Response(fslis_serializer,  status=status.HTTP_200_OK)

