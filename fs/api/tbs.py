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
from entities.models import Fund
from main.models import Period


class TrialBalanceAPI(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):


        fund = Fund.objects.first()

        period = Period.objects.first()

        fund.generate_tb(period)





        tb_serializer = {
            'msg':f'tbs get worked'
        }

        return Response(tb_serializer,  status=status.HTTP_200_OK)

