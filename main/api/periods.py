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


from main.models import Period
from main.serializers import PeriodSerializer

class PeriodsAPI(APIView):

    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):

        periods_serializer = {
            'message': 'period post worked'
        }

        return Response(periods_serializer,  status=status.HTTP_200_OK)


    def delete(self, request, pk, format=None):

        periods_serializer = {
            'message': 'period del worked'
        }

        return Response(periods_serializer,  status=status.HTTP_200_OK)

    def get(self, request, *args, **kwargs):

        periods = Period.objects.all()
    
        return Response(PeriodSerializer(periods, many=True).data,  status=status.HTTP_200_OK)

