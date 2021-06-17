import json
import datetime

#DJANGO IMPORTS
from django.utils import timezone
from django.shortcuts import get_object_or_404, render, redirect, reverse

#DJANGO REST IMPORTS
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets, status, generics, permissions
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated


from entities.models import Fund, EntityOwnership, LegacyData


class LegacyDataAPI(APIView):

    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):

        legacyType = request.data['legacyType']
        fundID = request.data['fundID']
        data = request.data['data']

        print('legacyType', legacyType)

        legacyData = get_object_or_404(LegacyData, fund_id=fundID)


        if legacyType == 'derivatives':
            legacyData.set_derivative(data)

        elif legacyType == 'htd_carry':
            legacyData.set_htd_carry(data)

        elif legacyType == 'master':
            legacyData.set_master(data)

        else:
            pass

        legacyData.save()

        data['total']['unsaved_changes'] = False
        data['editable'] = False
        data['total']['previous'] = data['total']['current']

        repsonse = {
            'data':data,
            'legacyType':legacyType   
        }
        return Response(repsonse,  status=status.HTTP_200_OK)




    def delete(self, request, pk, *args, **kwargs):

        resp = ['legacy delete']

        print()

        return Response(resp,  status=status.HTTP_200_OK)


























    # def post(self, request, *args, **kwargs):

    #     method = request.data['method']

    #     if method == 'ADD_UPDATE':

    #         legacyType = request.data['legacyType']
    #         data_years = request.data['data']
    #         fundID = request.data['fundID']
    #         fund = get_object_or_404(Fund, pk=fundID)
    #         legacy_data = fund.legacy_data



    #         if legacyType == 'allocation_years' or legacyType == 'derivative_years' or legacyType == 'investment_years':
                
    #             data = legacy_data[legacyType]

    #             newObj = {}

    #             for year_obj in data_years:
    #                 data_years[year_obj]['unsaved_changes'] = False
    #                 data_years[year_obj]['isNew'] = False
    #                 newObj[year_obj] = {
    #                     'current': data_years[year_obj]['current'] 
    #                     } 

    #             legacy_data[legacyType] = newObj
    #             fund.legacy_data = legacy_data
    #             fund.save()

    #             response = {
    #                 'legacyType': legacyType,
    #                 'data': data_years
    #             }

    #             return Response(response,  status=status.HTTP_200_OK)



    #         elif legacyType == 'capital_movements':

    #             data = legacy_data['capital_movements']

    #             data_years_ordered = sorted(data_years, key=lambda x: datetime.datetime.strptime(x['date']['current'], "%m/%d/%Y"))
                
                
    #             for year_obj in data_years_ordered:
    #                 year_obj['date']['unsaved_changes'] = False
    #                 year_obj['date']['isError'] = False
    #                 year_obj['baseAmount']['unsaved_changes'] = False
    #                 year_obj['baseAmount']['isError'] = False
    #                 year_obj['type']['unsaved_changes'] = False
    #                 year_obj['type']['isError'] = False
    #                 if year_obj['type']['current']: actType = year_obj['type']['current']['value']
    #                 else: actType = None

    #                 new = True

    #                 for item in data:
    #                     if year_obj['id'] == item['id']:
    #                         new = False
    #                         item['date'] = year_obj['date']['current']
    #                         item['baseAmount'] = year_obj['baseAmount']['current']
    #                         item['type'] = actType
    #                         break


    #                 if new:
    #                     obj = {
    #                         'id':year_obj['id'],
    #                         'date':year_obj['date']['current'],
    #                         'baseAmount':year_obj['baseAmount']['current'],
    #                         'type':actType
    #                     }
    #                     data.append(obj)


    #             data_ordered = sorted(data, key=lambda x: datetime.datetime.strptime(x['date'], "%m/%d/%Y"))

    #             legacy_data[legacyType] = data_ordered

    #             fund.legacy_data = legacy_data
    #             fund.save()

    #             response = {
    #                 'legacyType': legacyType,
    #                 'data': data_years_ordered
    #             }

    #             return Response(response,  status=status.HTTP_200_OK)


    #         else:

    #             resp = ['legacy post']

    #             return Response(resp,  status=status.HTTP_200_OK)

    #     elif method == 'DELETE_CAPITAL_DATE':

    #         print("Deleting")

    #         fundID = request.data['fundID']
    #         movmementID = request.data['movmementID']

    #         fund = get_object_or_404(Fund, pk=fundID)

    #         legacy_data = fund.legacy_data

    #         capital_movements = legacy_data['capital_movements']

    #         found = False
    #         deletedID = None

    #         for i in range(len(capital_movements)):
    #             if capital_movements[i]['id'] == movmementID: 
    #                 del capital_movements[i] 
    #                 found = True
    #                 deletedID = movmementID
    #                 legacy_data['capital_movements'] = capital_movements
    #                 fund.legacy_data = legacy_data
    #                 fund.save()
    #                 break

    #         if found and deletedID:

    #             resp = {
    #                 'success': found,
    #                 'deletedID':deletedID
    #             }

    #             return Response(resp,  status=status.HTTP_200_OK)
    #         else:
    #             return Response(status=status.HTTP_404_NOT_FOUND)


    # def get(self, request, *args, **kwargs):

    #     fundID = self.request.query_params.get('fundID', None)

    #     # fund = get_object_or_404(Fund, pk=fundID)
    #     fund = Fund.objects.first()

    #     legacy_data = fund.legacy_data

    #     if fund.commencement_date: commencement_year = fund.commencement_date.year
    #     else: commencement_year = None

    #     capital_years =  legacy_data['capital_years']
    #     investment_years =  legacy_data['investment_years']
    #     allocation_years =  legacy_data['allocation_years']
    #     derivative_years =  legacy_data['derivative_years']

    #     if not bool(allocation_years):
    #         for year in range(commencement_year, 2020):
    #             allocation_years[year] = {
    #                 'id': year,
    #                 'year': year,
    #                 'amount': ''
    #             }

    #     if not bool(derivative_years):
    #         for year in range(commencement_year, 2020):
    #             derivative_years[year] = {
    #                 'id': year,
    #                 'year': year,
    #                 'amount': ''
    #             }

    #     if not bool(investment_years):
    #         for year in range(commencement_year, 2020):
    #             investment_years[year] = {
    #                 'id': year,
    #                 'year': year,
    #                 'amount': ''
    #             }
    #     if not bool(capital_years):
    #         for year in range(commencement_year, 2020):

    #             activities = [
    #                 { 'id': 1, 'date': '', 'amount': '', 'saved': False },
    #             ]

    #             capital_years[year] = {
    #                 'id': year,
    #                 'year': year,
    #                 'yearTotal': 0,
    #                 'isOpen': False,
    #                 'activities': activities
    #             }

    #     resp = {
    #         'capital_years': capital_years,
    #         'investment_years': investment_years,
    #         'allocation_years': allocation_years,
    #         'derivative_years': derivative_years
    #     }