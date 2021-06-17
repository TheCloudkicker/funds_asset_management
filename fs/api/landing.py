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
from main.models import Period
from fs.models import Fsli, GenericMapping, CustomMapping, SubAccount, Balance

from accounts.models import Profile

class TestingSummaryAPI(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):

        area = self.request.query_params.get('area', None)


        if area == 'testing':

            data = {
                'asssets': [
                    { 'id': 1, 'name': 'Invest Rec', 'status': { 'total': 15, 'ready': 5 } },
                    { 'id': 2, 'name': 'Invest MV', 'status': { 'total': 15, 'ready': 5 } },
                    { 'id': 3, 'name': 'Due from RP', 'status': { 'total': 15, 'ready': 5 } },
                    { 'id': 4, 'name': 'Other Assets', 'status': { 'total': 15, 'ready': 5 } },
                ],
                'liabilities': [
                    { 'id': 1, 'name': 'Mgmt Fee Payable', 'status': { 'total': 15, 'ready': 5 } },
                    { 'id': 2, 'name': 'Accrued Exp', 'status': { 'total': 15, 'ready': 5 } },
                    { 'id': 3, 'name': 'Notes Payable', 'status': { 'total': 15, 'ready': 5 } },
                ],
                'incomes': [
                    { 'id': 1, 'name': 'Dividends', 'status': { 'total': 15, 'ready': 5 } },
                    { 'id': 2, 'name': 'Interest', 'status': { 'total': 15, 'ready': 5 } },
                    { 'id': 3, 'name': 'Other', 'status': { 'total': 15, 'ready': 5 } },
                ],
                'expenses': [
                    { 'id': 1, 'name': 'Mgmt Fees', 'status': { 'total': 15, 'ready': 5 } },
                    { 'id': 2, 'name': 'Int Exp', 'status': { 'total': 15, 'ready': 5 } },
                    { 'id': 3, 'name': 'Prof Fees', 'status': { 'total': 15, 'ready': 5 } },
                ],
                'capitals': [
                    { 'id': 1, 'name': 'Equity', 'status': { 'total': 15, 'ready': 5 } },
                    { 'id': 2, 'name': 'Carry', 'status': { 'total': 15, 'ready': 5 } },
                ],
                'fss': [
                    { 'id': 1, 'name': 'IRR', 'status': { 'total': 15, 'ready': 5 } },
                    { 'id': 2, 'name': 'FiHi', 'status': { 'total': 15, 'ready': 5 } },
                    { 'id': 3, 'name': 'Exp Ratio', 'status': { 'total': 15, 'ready': 5 } },
                ]
            }
            
            response = {
                'area': area,
                'data': data
            }
            return Response(response,  status=status.HTTP_200_OK)

        elif area == 'profileList':

            profiles_qs = Profile.objects.all()
            profiles = []

            for profile in profiles_qs:

                obj = {
                    'id': profile.id,
                    'name': str(profile),
                }

                profiles.append(obj)


            response = {
                'area': area,
                'data': profiles
            }
            return Response(response,  status=status.HTTP_200_OK)

        elif area == 'profileInstance':

            fundID = self.request.query_params.get('fundID', None)
            prof = Profile.objects.get(pk=fundID)
            name = str(prof)

            profile = [
                { 'id': 1, 'name':name, 'testingArea': 'Carry', 'fund': 'Fund 1', 'status': 'Reviewed', 'variance': 5, 'releaseDate':'2/1/2021' },
                { 'id': 2, 'name':name, 'testingArea': 'Carry', 'fund': 'Fund 2','status': 'Reviewed', 'variance': 5,'releaseDate':'2/1/2021' },
                { 'id': 3, 'name':name, 'testingArea': 'Carry', 'fund': 'Fund 3','status': 'Reviewed', 'variance': 5,'releaseDate':'2/1/2021' },
                { 'id': 4, 'name':name, 'testingArea': 'Carry', 'fund': 'Fund 4','status': 'Reviewed', 'variance': 5,'releaseDate':'2/1/2021' },
            ]


            response = {
                'area': area,
                'data': profile
            }
            return Response(response,  status=status.HTTP_200_OK)



    def post(self, request, *args, **kwargs):


        response = ['summary post']

        return Response(response,  status=status.HTTP_200_OK)


    def delete(self, request, pk, format=None):

        response = { 'deletedID': 1 }

        return Response(response,  status=status.HTTP_200_OK)





class LandingAPI(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):

        testingArea = self.request.query_params.get('testingArea', None)
        print('testingArea',testingArea)
        funds = Fund.objects.filter(isAudited=True)
        response = []

        for fund in funds:

            obj = {
                'id': fund.id,
                'testingArea': testingArea,
                'name': fund.legal_name,
                'results': "NOT STARTED",
                'client_result': '',
                'pwc_result': '',
                'difference':''
            }

            
            response.append(obj)

        return Response(response,  status=status.HTTP_200_OK)


    def post(self, request, *args, **kwargs):


        response = ['landing post']

        return Response(response,  status=status.HTTP_200_OK)


    def delete(self, request, pk, format=None):

        response = { 'deletedID': 1 }

        return Response(response,  status=status.HTTP_200_OK)

