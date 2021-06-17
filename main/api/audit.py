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
from main.models import Period, AuditSettings


def initVal(val):
    return  {
        'current': val,
        'previous': val,
        'unsaved_changes': False,
        'isError': False,
        'readOnly': True,
        }

class AuditAPI(APIView):

    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):

        auditSettings = request.data['auditSettings']

        uuid = auditSettings['id']

        try:
            int(uuid)
            audit_setting = get_object_or_404(AuditSettings, pk=auditSettings['id'])
            
        except:
            audit_setting = AuditSettings()
        

        if auditSettings['overall']['current'] != '':
            audit_setting.overall = auditSettings['overall']['current']

        if auditSettings['performance']['current'] != '':
            audit_setting.performance = auditSettings['performance']['current']

        if auditSettings['deminimis']['current'] != '':
            audit_setting.deminimis = auditSettings['deminimis']['current']

        if auditSettings['benchmark']['current']:
            audit_setting.benchmark = auditSettings['benchmark']['current']['value']

        audit_setting.save()


        response = {
                'id': audit_setting.id,
                'value': audit_setting.id,
                'label': audit_setting.name,
                'editable': False,
                'uuid':uuid,
                'name': initVal(audit_setting.name),
                'benchmark': initVal(audit_setting.get_benchmark()),
                'overall': initVal(audit_setting.get_overall()),
                'performance': initVal(audit_setting.get_performance()),
                'deminimis': initVal(audit_setting.get_deminimis()),
            }

        return Response(response,  status=status.HTTP_200_OK)


    def get(self, request, *args, **kwargs):

        yearID = self.request.query_params.get('yearID', None)

        if not yearID:
            return Response(status=status.HTTP_404_NOT_FOUND)

        # period = get_object_or_404(Period, pk=yearID)

        response = []

        audit_settings = AuditSettings.objects.all()

        for audit_setting in audit_settings:

            response.append({
                    'id': audit_setting.id,
                    'editable': False,
                    'value': audit_setting.id,
                    'label': audit_setting.name,
                    'name': initVal(audit_setting.name),
                    'benchmark': initVal(audit_setting.get_benchmark()),
                    'overall': initVal(audit_setting.get_overall()),
                    'performance': initVal(audit_setting.get_performance()),
                    'deminimis': initVal(audit_setting.get_deminimis()),
                })

            

        return Response(response,  status=status.HTTP_200_OK)


    def delete(self, request, pk, *args, **kwargs):

        audit_settings = get_object_or_404(AuditSettings, pk=pk)
        deletedID = audit_settings.id
        audit_settings.delete()

        response = {
            'deletedID':deletedID
        }



        return Response(response,  status=status.HTTP_200_OK)

