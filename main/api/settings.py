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


from main.models import Settings, Currency


class SettingsAPI(APIView):

    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):

        key = request.data['key']
        value = request.data['value']

        print('settings', key, value)
        
        settings = Settings.objects.first()

        setattr(settings, key, value)
        settings.save()


        response = {
            'key': key,
            'value': value
        }


        return Response(response,  status=status.HTTP_200_OK)


    def get(self, request, *args, **kwargs):

        settings_obj =  Settings.objects.first()

        if not settings_obj:
            settings_obj = Settings(
                app_name="Waibe",
                rounding_tolerance=5,
                date_format="MM-DD-YYYY",
                default_ccy=None
            )
            settings_obj.save()


        def setValue(val):

            return {
                'current': val,
                'previous': val,
                'unsaved_changes': False,
                'isError': False
            }


        settings = {
            'rounding_tolerance': setValue(settings_obj.rounding_tolerance),
            'date_format': setValue(settings_obj.date_format), 
            'defaultCcy': setValue(settings_obj.default_ccy_id) 
        }

        return Response(settings,  status=status.HTTP_200_OK)





        






    def delete(self, request, pk, *args, **kwargs):

        structure = ['delete']

        return Response(structure,  status=status.HTTP_200_OK)

