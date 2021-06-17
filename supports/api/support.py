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


from entities.models import Fund
from supports.models import Support, SupportType, ClientReport
from supports.serializers import SupportSerializer
# from repository.serializers import RepositoryColumnSerializer


class SupportAPI(APIView):

    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):

        method = request.data['method']

        if method == 'DELETE':

            supportID = request.data['supportID']
            support = get_object_or_404(Support, pk=supportID)
            support.delete()

            response = {
                'deletedID':supportID
            }

            return Response(response,  status=status.HTTP_200_OK)
