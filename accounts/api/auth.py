import json
from datetime import datetime, timedelta, date

#DJANGO IMPORTS
from django.contrib.auth.models import User
from django.utils import timezone
from django.shortcuts import get_object_or_404, render, redirect, reverse
from django.contrib.auth import logout
from django.contrib import messages
from django.http import JsonResponse

#DJANGO REST IMPORTS
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated
from knox.models import AuthToken
from rest_framework import viewsets, status, generics, permissions
from rest_framework.views import APIView


from accounts.models import Profile
from accounts.serializers import UserSerializer, RegisterSerializer, LoginSerializer, ProfileSerializer


#REGISTER API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    permission_classes = (AllowAny,)


    def post(self, request, *args, **kwargs):

        print("Registering", request.data)
        serializer = self.get_serializer(data=request.data)
        print(serializer)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        user.is_active = True

        user.save()
        return Response({
        "user": UserSerializer(user, context=self.get_serializer_context()).data,
        "token": AuthToken.objects.create(user)[1]
        })



#LOGIN API
class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = (AllowAny,)


    def post(self, request, *args, **kwargs):

        print("A")
        print(request.data)

        try:
            serializer = self.get_serializer(data=request.data)
            print("B")
            serializer.is_valid(raise_exception=True)
            print("C")
            user = serializer.validated_data
            print(user)
            profile = Profile.objects.get(user=user)
            print(profile)

            return Response({
                "login_success": True,
                "token": AuthToken.objects.create(user)[1],
                "profile": ProfileSerializer(profile, many=False).data,
            }, status=status.HTTP_200_OK)
        
        except:
            return Response({
                'status':'incorrect login credentials',
                "login_success": False },  status=status.HTTP_200_OK)



class UserAPI(generics.RetrieveAPIView):

    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = ProfileSerializer

    def get_object(self):
        profile = Profile.objects.get(user=self.request.user)
        return profile