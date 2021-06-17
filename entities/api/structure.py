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


class StructureAPI(APIView):

    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):

        structure = ['post']

        return Response(structure,  status=status.HTTP_200_OK)


    def get(self, request, pk, *args, **kwargs):

        # fund = get_object_or_404(Fund, pk=pk)
        fund = Fund.objects.first()
        structure = fund.get_navigator_structure(None)

        return Response(structure,  status=status.HTTP_200_OK)


    def delete(self, request, pk, *args, **kwargs):

        structure = ['delete']

        return Response(structure,  status=status.HTTP_200_OK)

