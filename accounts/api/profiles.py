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


from accounts.models import Profile



class ProfilesAPI(APIView):

    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):

        periods_serializer = {
            'message': 'profile post worked'
        }

        return Response(periods_serializer,  status=status.HTTP_200_OK)


    def delete(self, request, pk, format=None):

        periods_serializer = {
            'message': 'profile del worked'
        }

        return Response(periods_serializer,  status=status.HTTP_200_OK)

    def get(self, request, *args, **kwargs):

        profiles_qs = Profile.objects.all()
        profiles = []

        for profile in profiles_qs:
            obj = {
                'value': profile.id,
                'label': str(profile)
            }
            profiles.append(obj)
    
        return Response(profiles,  status=status.HTTP_200_OK)

