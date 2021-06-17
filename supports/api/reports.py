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


from entities.models import Fund
from main.models import Period, AuditSettings
from supports.models import Support, ClientReport, ClientReportHeader
from supports.serializers import SupportSerializer, ClientReportHeaderSerializer

def find_index(dicts, key, value):
    class Null: pass
    for i, d in enumerate(dicts):
        if d.get(key, Null) == value:
            return i
    else:
        raise ValueError('no dict with the key and value combination found')

class ReportAPI(APIView):

    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):

        report = request.data['report']
        reportType = request.data['reportType']
        period = Period.objects.first()

        headers = [
            { 'id': 1, 'title': "Fund Name" },
            { 'id': 2, 'title': "Materiality Type" },
            { 'id': 3, 'title': "Net Assets" },
            { 'id': 4, 'title': "Overall" },
            { 'id': 5, 'title': "Performance" },
            { 'id': 6, 'title': "Deminimis" },
        ]

        funds = Fund.objects.all()
        auditSetting = AuditSettings.objects.first()
        overall_percent = (auditSetting.overall / 10000)

        items = []
        for fund in funds:

            net_assets = fund.get_net_assets(period)
            overall = net_assets * overall_percent
            performance = overall * (auditSetting.performance / 100)
            deminimis = overall * (auditSetting.deminimis / 100)

            values = [
                { 'id': 1, 'value': auditSetting.name, 'isNumber': False },
                { 'id': 2, 'value': net_assets, 'isNumber': True },
                { 'id': 3, 'value': overall, 'isNumber': True },
                { 'id': 4, 'value': performance, 'isNumber': True },
                { 'id': 5, 'value': deminimis, 'isNumber': True },
            ]

            items.append({
                'id': fund.id,
                'indexName': fund.legal_name,
                'values': values
            })



        print("report api", report, reportType)

        report['headers'] = headers
        report['items'] = items


        response = {
            'test': 'ok',
            'report': report
        }



        return Response(response,  status=status.HTTP_200_OK)



class ClientReportAPI(APIView):

    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):

        method = request.data['method']

        if method == 'SAVE':

            reportObj = request.data['reportObj']
            clientReport = get_object_or_404(ClientReport, pk=reportObj['id'])

            fundIdentifier = reportObj['fundIdentifier']
            periodIdentifier = reportObj['periodIdentifier']

            if fundIdentifier['current']:
                clientReport.fundIdentifier['header'] = { 'value': fundIdentifier['current']['value'], 'label': fundIdentifier['current']['label'] }
            else:
                clientReport.fundIdentifier['header'] = None

            if periodIdentifier['current']:
                clientReport.periodIdentifier['header'] = { 'value': periodIdentifier['current']['value'], 'label': periodIdentifier['current']['label'] }
            else:
                clientReport.periodIdentifier['header'] = None


            mappingsArray = reportObj['mappings']

            mappings = clientReport.mappings
            for mapping in mappings:
                index = find_index(mappingsArray, 'id', mapping['id'])

                arr = []
                clientHeaders = mappingsArray[index]['clientHeaders']['current']
                for clientHeader in clientHeaders:
                    arr.append({ 'value': clientHeader['value'] , 'label':clientHeader['label'] })

                mapping['clientHeaders'] = arr

            clientReport.mappings = mappings
            clientReport.save()

            headers = ClientReportHeader.objects.filter(report=clientReport)

            response = {
                'id': clientReport.id,
                'editable': False,
                'isOpen': True,
                'checked': True,
                'name': {
                    'current': clientReport.name,
                    'previous': clientReport.name,
                    'unsaved_changes': False,
                    'isError': False,
                },
                'fundIdentifier': {
                    'current': clientReport.fundIdentifier['header'],
                    'previous': clientReport.fundIdentifier['header'],
                    'unsaved_changes': False,
                    'isError': False,
                },
                'periodIdentifier':{
                    'current': clientReport.periodIdentifier['header'],
                    'previous': clientReport.periodIdentifier['header'],
                    'unsaved_changes': False,
                    'isError': False,
                },
                'headers': ClientReportHeaderSerializer(headers, many=True).data,
                'mappings': clientReport.get_mappings(),
            }

            return Response(response,  status=status.HTTP_200_OK)


    def get(self, request, *args, **kwargs):

        reportType = self.request.query_params.get('reportType', None)

        clientReports = ClientReport.objects.all()
        headers_qs = ClientReportHeader.objects.all()

        response = []

        for clientReport in clientReports:

            headers = headers_qs.filter(report=clientReport)

            obj = {
                'id': clientReport.id,
                'editable': False,
                'isOpen': False,
                'checked': True,
                'name': {
                    'current': clientReport.name,
                    'previous': clientReport.name,
                    'unsaved_changes': False,
                    'isError': False,
                },
                'fundIdentifier': {
                    'current': clientReport.fundIdentifier['header'],
                    'previous': clientReport.fundIdentifier['header'],
                    'unsaved_changes': False,
                    'isError': False,
                },
                'periodIdentifier':{
                    'current': clientReport.periodIdentifier['header'],
                    'previous': clientReport.periodIdentifier['header'],
                    'unsaved_changes': False,
                    'isError': False,
                },
                'headers': ClientReportHeaderSerializer(headers, many=True).data,
                'mappings': clientReport.get_mappings(),
            }

            response.append(obj)

        return Response(response,  status=status.HTTP_200_OK)


