import json

#DJANGO IMPORTS

from django.apps import apps
from django.utils import timezone
from django.shortcuts import get_object_or_404, render, redirect, reverse

#DJANGO REST IMPORTS
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets, status, generics, permissions
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated


from fs.models import GenericMapping, CustomMapping, Fsli, SubAccount



class GenericMappingAPI(APIView):

    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):

        clientID = request.data['clientID']
        accountID = request.data['accountID']
        fsliID = request.data['fsliID']

        mapping = GenericMapping.objects.create(
            fsli_id=fsliID,
            fsliID=fsliID,
            account_id=accountID,
            accountID=accountID,
            clientID=clientID
        )

        fsli_obj = Fsli.objects.get(id=mapping.fsli_id)
        acct_obj = SubAccount.objects.get(id=mapping.accountID)


        mapping_serializer = {
            'id': mapping.id,
            'clientID': mapping.clientID,
            'fsliID': mapping.fsliID,
            'accountID': mapping.accountID,
            'fsli': { 'id': fsli_obj.id, 'name': fsli_obj.name },
            'account':{ 'id': acct_obj.id, 'description': acct_obj.description, 'number': acct_obj.number },
        }

        return Response(mapping_serializer,  status=status.HTTP_200_OK)


    def delete(self, request, pk, format=None):

        mapping_serializer = {
            'message': 'mapping del worked'
        }

        return Response(mapping_serializer,  status=status.HTTP_200_OK)

    def get(self, request, *args, **kwargs):

        action = self.request.query_params.get('action', None)
        clientID = self.request.query_params.get('clientID', None)

        mappings_qs = GenericMapping.objects.all()
        mapping_serializer = []

        for mapping in mappings_qs:

            fsli_obj = Fsli.objects.get(id=mapping.fsli_id)
            acct_obj = SubAccount.objects.get(id=mapping.accountID)

            obj = {
                'id': mapping.id,
                'clientID': mapping.clientID,
                'fsliID': mapping.fsliID,
                'accountID': mapping.accountID,
                'fsli': { 'id': fsli_obj.id, 'name': fsli_obj.name },
                'account':{ 'id': acct_obj.id, 'description': acct_obj.description, 'number': acct_obj.number },
            }
            mapping_serializer.append(obj)

        return Response(mapping_serializer,  status=status.HTTP_200_OK)




class CustomMappingAPI(APIView):

    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):

        mapping_serializer = {
            'message': 'mapping post worked'
        }

        return Response(mapping_serializer,  status=status.HTTP_200_OK)


    def delete(self, request, pk, format=None):

        mapping_serializer = {
            'message': 'mapping del worked'
        }

        return Response(mapping_serializer,  status=status.HTTP_200_OK)

    def get(self, request, *args, **kwargs):

        action = self.request.query_params.get('action', None)
        clientID = self.request.query_params.get('clientID', None)

        mappings_qs = CustomMapping.objects.all()
        mapping_serializer = []

        for mapping in mappings_qs:
            
            obj = {
                'id': mapping.id,
                'clientID': mapping.clientID,
                'fsliID': mapping.fsliID,
                'fundID': mapping.fundID,
                'accountID': mapping.accountID
            }
            mapping_serializer.append(obj)

        return Response(mapping_serializer,  status=status.HTTP_200_OK)





class UnmappedAPI(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):

        clientID = self.request.query_params.get('clientID', None)

        SubAccount = apps.get_model('tbs', 'SubAccount')
        unmapped_accts_qs = SubAccount.objects.filter(genericmapping__isnull=True)
        mapping_serializer = []

        for unmapped_acct in unmapped_accts_qs:

            obj = {
                'id': unmapped_acct.id,
                'description': unmapped_acct.description,
                'number': unmapped_acct.number,
                'balance': '100000'
            }

            mapping_serializer.append(obj)




        return Response(mapping_serializer,  status=status.HTTP_200_OK)
