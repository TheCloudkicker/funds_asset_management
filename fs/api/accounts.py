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

from fs.models import SubAccount


class AccountsAPI(APIView):

    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):

        accounts_serializer = {
            'msg':'accounts post works'
        }

        return Response(accounts_serializer,  status=status.HTTP_200_OK)


    def delete(self, request, pk, format=None):

        accounts_serializer = {
            'msg':'accounts del works'
        }

        return Response(accounts_serializer,  status=status.HTTP_200_OK)

    def get(self, request, *args, **kwargs):

        accounts_qs = SubAccount.objects.all()
        accounts_serializer = []

        for account in accounts_qs:
            obj = {
                'id': account.id,
                'number': account.number,
                'description': account.description
            }

            accounts_serializer.append(obj)

        return Response(accounts_serializer,  status=status.HTTP_200_OK)

