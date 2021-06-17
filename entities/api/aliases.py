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


from entities.models import FundAltName, Fund


class AliasesAPI(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):

        response = []
        aliases_qs = FundAltName.objects.all().values('id','name','fund_id', 'fund__legal_name')

        for alias in aliases_qs:

            response.append({
                'id': alias['id'],
                'name': alias['name'],
                'fund': { 'value': alias['fund_id'], 'label':alias['fund__legal_name'] },
            })

        return Response(response,  status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):

        profile = request.data['profile']
        altFundName = request.data['altFundName']

        uuid = altFundName['id']

        try:
            int(uuid)
            alt_fund_name = get_object_or_404(FundAltName, pk=uuid)

        except:
            alt_fund_name = FundAltName()

        alt_fund_name.fund_id = altFundName['fundID']

        fund = get_object_or_404(Fund,pk=altFundName['fundID'])

        alt_fund_name.name = altFundName['name']['current']
        alt_fund_name.created_userName = profile['name']
        alt_fund_name.created_uuid = profile['id']
        alt_fund_name.save()

        if alt_fund_name.created_dt:  dateCreated = alt_fund_name.created_dt.strftime('%Y-%m-%d')
        else: dateCreated = None


        resp = {
                    'id':alt_fund_name.id,
                    'uuid': uuid,
                    'fundID': alt_fund_name.fund_id,
                    'fundName': fund.legal_name,
                    'editable': False,
                    'name':{
                        'current': alt_fund_name.name,
                        'prev': alt_fund_name.name,
                        'unsaved_changes':False
                    },
                    'dateCreated':dateCreated,
                    'createdBy':alt_fund_name.created_userName,
                }


        return Response(resp,  status=status.HTTP_200_OK)


    def delete(self, request, pk, *args, **kwargs):

        alt_fund_name = get_object_or_404(FundAltName, pk=pk)
        deletedID = alt_fund_name.id
        alt_fund_name.delete()



        resp = {
            'deletedID':deletedID
        }

        return Response(resp,  status=status.HTTP_200_OK)