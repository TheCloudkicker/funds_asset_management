import json

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


from entities.models import Fund
from supports.models import Support, ClientReport, ClientReportHeader, RecycledItem
from supports.serializers import SupportSerializer, ClientReportHeaderSerializer


class RecycleAPI(APIView):

    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):

        method = request.data['method']

        if method == 'ADD':
            data = request.data['obj']
            deletedBy = request.data['deletedBy']
            reducerName = request.data['reducerName']
            arrayName = request.data['arrayName']
            dateDeleted = timezone.now()

            recycledItem = RecycledItem(
                reducerName=reducerName,
                arrayName=arrayName,
                deletedBy=deletedBy,
                data=data,
                dateDeleted=dateDeleted
            )

            recycledItem.save()

            recycled = {
                'id':recycledItem.id,
                'reducerName':reducerName,
                'arrayName':arrayName,
                'deletedBy':deletedBy,
                'dateDeleted': dateDeleted.strftime("%Y-%m-%d"),
                'data': data
            }

            return Response(recycled,  status=status.HTTP_200_OK)

        elif method == 'DELETE':

            itemId = request.data['itemId']
            item = get_object_or_404(RecycledItem, pk=itemId)
            item.delete()

            recycled = {
                'deletedID': itemId
            }

            return Response(recycled,  status=status.HTTP_200_OK)

    def get(self, request, *args, **kwargs):

        recycled_items_qs = RecycledItem.objects.all()

        reycledItems = []

        for recycled_item in recycled_items_qs:

            reycledItems.append({
                'id':recycled_item.id,
                'reducerName':recycled_item.reducerName,
                'arrayName':recycled_item.arrayName,
                'deletedBy':recycled_item.deletedBy,
                'dateDeleted': recycled_item.dateDeleted.strftime("%Y-%m-%d"),
                'data': recycled_item.data
            })


        return Response(reycledItems,  status=status.HTTP_200_OK)

