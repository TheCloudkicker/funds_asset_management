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
from fs.models import Fsli, GenericMapping, CustomMapping, SubAccount, Balance
from main.models import Period
from supports.models import RepositoryType, ClientReport, ClientReportHeader
from supports.serializers import ClientReportHeaderSerializer

standard_hld_headers = [
    'BEG FMV',
    'BEG COST',
    'PTD CONTRIBUTIONS',
    'PTD DISTRIBUTIONS',
    'PTD RECALLABLE',
    'PTD UNREALIZED',
    'PTD UNREALIZED FX',
    'PTD REALIZED',
    'PTD DIVIDEND',
    'PTD INTEREST',
    'PTD SALES',
    'PTD PURCHASES',
    'PTD RETURN OF CAPITAL',
    'END FMV',
    'END COST',
    'ITD CONTRIBUTIONS',
    'ITD DISTRIBUTIONS',
    'ITD RECALLABLE',
    'ITD UNREALIZED',
    'ITD UNREALIZED FX',
    'ITD REALIZED',
    'ITD DIVIDEND',
    'ITD INTEREST',
    'ITD SALES', 
    'ITD PURCHASES',
    'ITD RETURN OF CAPITAL', 
    'END FMV', 
    'END COST'
]

def setInitialValue(val):

    return {
            'current': val,
            'previous': val,
            'unsaved_changes': False,
            'readOnly': True,
            'isError': False,
    }


class DatabaseAPI2(APIView):

    permission_classes = (IsAuthenticated,)


    def get(self, request, *args, **kwargs):

        print("GET DATABASE")

        reports_qs = ClientReport.objects.all()
        headers_qs = ClientReportHeader.objects.all()
        reports = []

        for report in reports_qs:

            criterias = headers_qs.filter(report=report)

            fields = []

            for criteria in criterias:

                fields.append({
                    'value': criteria.id,
                    'label': setInitialValue(criteria.name),
                })

            reports.append({
                'value': report.id, 
                'label': report.name, 
                'isOpen': False, 
                'fields': fields
            })


        response = [
            { 'value': 'funds', 'label': 'Funds', 'reports': reports },
            { 'value': 'funds', 'label': 'Investments', 'reports': [] },
            { 'value': 'funds', 'label': 'Investors', 'reports': [] },
        ]

        return Response(response,  status=status.HTTP_200_OK)













class DatabaseAPI(APIView):

    permission_classes = (IsAuthenticated,)


    def post(self, request, *args, **kwargs):


        method = request.data['method']
        dbObject = request.data['dbObject']
        

        if method == 'SAVE_ALL':

            client_reports = ClientReport.objects.all()

            fundObject = dbObject['Funds']

            for report in fundObject['reports']:

                try:
                    client_report = client_reports.get(id=report['id'])
                    print('Found it')
                except:continue

                client_report.name = report['name']['current']

                    
                report['name']['unsaved_changes'] = False
                report['name']['isError'] = False
                report['name']['previous'] = report['name']['current']

                report['identifier']['unsaved_changes'] = False
                report['identifier']['isError'] = False
                report['identifier']['previous'] = report['identifier']['current']
                
                report['editable'] = False

                trackingInfo = client_report.trackingInfo
                trackingInfo['headerId'] = report['identifier']['current']
                client_report.trackingInfo = trackingInfo


                client_report.save()
                







            response = dbObject 
                
            return Response(response,  status=status.HTTP_200_OK)

    def get(self, request, *args, **kwargs):

        repo_types_qs = RepositoryType.objects.all()
        reports_qs = ClientReport.objects.all()
        headers_qs = ClientReportHeader.objects.all()
        response = {}

        for repo_type in repo_types_qs:

            reports = []
            reports_qs_filter = reports_qs.filter(repoType=repo_type)

            for report in reports_qs_filter:
                headers_qs_filter = headers_qs.filter(report=report)

                trackingInfo = report.trackingInfo
                
                obj = {
                    'id': report.id,
                    'value': report.id,
                    'label': report.name,
                    'checked': False,
                    'editable': False,
                    'name': {
                        'current': report.name,
                        'previous': report.name,
                        'unsaved_changes': False,
                        'isError': False
                    },
                    'identifier': { 
                        'current': trackingInfo['headerId'],
                        'previous': trackingInfo['headerId'],
                        'unsaved_changes': False,
                        'isError': False
                    },
                    'fundString':{
                        'current': trackingInfo['fundString'],
                        'previous': trackingInfo['fundString'],
                        'unsaved_changes': False,
                        'isError': False
                    },
                    'headers': ClientReportHeaderSerializer(headers_qs_filter, many=True).data 
                }
                reports.append(obj)

            response[repo_type.name] = {
                'title': f'{repo_type.name} Reports',
                'isOpen': True,
                'reports': reports
            }


        return Response(response,  status=status.HTTP_200_OK)
