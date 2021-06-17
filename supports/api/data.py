import json
import time

#DJANGO IMPORTS
from django.utils import timezone
from django.shortcuts import get_object_or_404, render, redirect, reverse
from django.http import StreamingHttpResponse

#DJANGO REST IMPORTS
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets, status, generics, permissions
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated


from supports.models import Support
from supports.serializers import SupportSerializer



class DataAPI(APIView):

    permission_classes = (IsAuthenticated,)



    def get(self, request, *args, **kwargs):

        supportID = self.request.query_params.get('supportID', None)
        support  = get_object_or_404(Support, pk=supportID)

        response = {
            'id': supportID,
            'data':support.data,
        }
        return Response(response,  status=status.HTTP_200_OK)



