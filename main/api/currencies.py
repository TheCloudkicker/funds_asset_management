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

from main.models import Currency
from main.serializers import CurrencySerializer


class CurrencyAPI(APIView):

    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):

        response = ['post']

        return Response(response,  status=status.HTTP_200_OK)


    def get(self, request, *args, **kwargs):

        currencies = Currency.objects.all()

        return Response(CurrencySerializer(currencies, many=True).data,  status=status.HTTP_200_OK)
        


    def delete(self, request, pk, *args, **kwargs):

        response = ['delete']

        return Response(response,  status=status.HTTP_200_OK)

