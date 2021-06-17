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

from fs.models import Fsli, Balance


class BalancesAPI(APIView):

    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):

        accounts_serializer = {
            'msg':'balances post works'
        }

        return Response(accounts_serializer,  status=status.HTTP_200_OK)


    def delete(self, request, pk, format=None):

        accounts_serializer = {
            'msg':'balances del works'
        }

        return Response(accounts_serializer,  status=status.HTTP_200_OK)

    def get(self, request, *args, **kwargs):

        fslis_qs = Fsli.objects.all().values('id','name','fsli_type',)

        balances_qs = Balance.objects.all()
        balances_serializer = []

        for balance in balances_qs:


            obj = {
                'id': balance.id,
                'fundID': balance.fundID,
                'clientID': balance.clientID,
                'periodID': balance.periodID,
                'ccyID': balance.ccyID,
                'amount': balance.amount,
                'sub_account': balance.sub_account
            }

            balances_serializer.append(obj)

        return Response(balances_serializer,  status=status.HTTP_200_OK)

