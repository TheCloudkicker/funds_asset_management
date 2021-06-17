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
from rest_framework.parsers import MultiPartParser, FormParser


from entities.models import Fund
from supports.models import Support, SupportType, ClientReport, RepositoryType
from supports.serializers import SupportSerializer
# from repository.serializers import RepositoryType


class RepositoryAPI(APIView):

    permission_classes = (IsAuthenticated,)
    parser_classes = (MultiPartParser, FormParser)


    def post(self, request, *args, **kwargs):

        attachment = request.data['attachment']
        actionType = request.data['actionType']

        print("Repo Post", attachment)
        print("Repo Post", actionType)

        response = {
            'message':"Repo POST worked"
        }

        return Response(response,  status=status.HTTP_200_OK)

    def get(self, request, *args, **kwargs):

        reports_qs = ClientReport.objects.all()
        support_qs = Support.objects.all()

        items = []
        funds_qs = Fund.objects.all()

        headers = [
            { 'id': 1, 'title': 'Fund Name', 'sorted': 'ascending' },
            { 'id': 2, 'title': 'Unique ID', 'sorted': 'ascending' },
        ]

        for report in reports_qs:
            headers.append({
                'id': report.id,
                'title': report.name,
                'sorted': 'ascending'
            })

        for fund in funds_qs:

            reports = []

            filtered_support_qs = support_qs.filter(fundID=fund.id)

            supports =  SupportSerializer(filtered_support_qs, many=True).data

            for report in reports_qs:
                reports.append({
                    'id': report.id,
                    'name': report.name,
                    'supports': supports,
                    'isOpen': False,
                })

            items.append({
                'id': fund.id,
                'indexName': fund.legal_name,
                'reports': reports
            })

        response = {
            'headers': headers,
            'items': items
        }

        return Response(response,  status=status.HTTP_200_OK)

