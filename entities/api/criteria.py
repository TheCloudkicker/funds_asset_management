import json
import uuid

#DJANGO IMPORTS
from django.utils import timezone
from django.shortcuts import get_object_or_404, render, redirect, reverse

#DJANGO REST IMPORTS
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets, status, generics, permissions
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated


from entities.models import Fund, FundCriteriaDef
from main.models import Period
from fs.models import Fsli, GenericMapping, CustomMapping, SubAccount, Balance



class FundCriteriaAPI(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):

        print("HIT GET")


        response = {
            'headers': [],
            'funds': ''
        }

        return Response(response,  status=status.HTTP_200_OK)


    def post(self, request, *args, **kwargs):


        criterias = request.data['criterias']
        criteriaType = request.data['criteriaType']

        criteria = FundCriteriaDef()

        print('fundCriteria - Before' ,criteriaType)

        

        for fundCriteria in criterias:

            _key = fundCriteria['key']
            
            if fundCriteria['formType'] == 'bool' or fundCriteria['formType'] == 'select':

                if fundCriteria['current']:
                    value = fundCriteria['current']['value']
                    setattr(criteria, _key, value)

            elif fundCriteria['formType'] == 'input':
                value = fundCriteria['current']
                setattr(criteria, _key, value)


        key = criteria.text
        key = key.replace("/", "_")
        key = key.replace(" ", "")
        key = key.lower()
        criteria.key = key
        criteria.criteriaType = criteriaType
        criteria.save()



        response = {
            'criteriaType': criteriaType,
            'criteria':{
                    'text': criteria.text,
                    'key': criteria.key,
                    'isRequired': criteria.isRequired,
                    'readOnly':True,
                    'current': '',
                    'previous': '',
                    'unsaved_changes': False,
                    'isError': False,
                    'options': [],
                    'isDisabled': False,
                    'isMulti': False,
                    'formType': criteria.formType,
                    'placeholder': criteria.placeholder,
            }
        }

        return Response(response,  status=status.HTTP_200_OK)
