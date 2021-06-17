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


from entities.models import Fund
from main.models import Period
from fs.models import Fsli, GenericMapping, CustomMapping, SubAccount, Balance







class FundSetupAPI(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):

        funds_qs = Fund.objects.all().order_by('-legal_name')

        # fund_headers_qs = FundCriterionHeader.objects.all()

        funds = []


        for fund in funds_qs:

            fund_data = fund.data
            extra_fields = []
            obj = {
                    'id': fund.id,
                    "checked": False,
                    'isAudited': fund.isAudited,
                    'selected': False,
                    'editable': False,
                    "fundID": {
                                'id':fund.trackingID,
                                'key': 'fundID',
                                'current': fund.trackingID,
                                'previous': fund.trackingID,
                                'isError': False,
                                'unsaved_changes': False,
                            },
                    "fundName": {
                                
                                'id':fund.legal_name,
                                'key': 'fundName',
                                'current': fund.legal_name,
                                'previous': fund.legal_name,
                                'isError': False,
                                'unsaved_changes': False,
                            },
                    "extra_fields": extra_fields,
                }

            funds.append(obj)

            # for fund_header in fund_headers_qs:


            #     try:
            #         value = fund_data[fund_header.name]

            #         print('info', value)

            #         data_obj = {
            #             'id':fund_header.name,
            #             'value': value,
            #             'original': value,
            #             'selected': False,
            #             'editable': False,
            #             'error': False
            #         }
                
            #     except:

            #         print('no_info')

            #         data_obj = {
            #             'id':uuid.uuid4(),
            #             'value': '',
            #             'original':'',
            #             'selected': False,
            #             'editable': False,
            #             'error': False
            #         }

            #     values_list.append(data_obj)
            # FundCriterionHeaderSerializer(fund_headers_qs, many=True).data

        response = {
            'headers': [],
            'funds': funds
        }

        return Response(response,  status=status.HTTP_200_OK)

            #    { 'id': 4, 'fundID': 4, 'fundName': 'Fund 4', 'extra_fields': [1, 2, 3] },

    def post(self, request, *args, **kwargs):


        fundObj = request.data['fund']

        newFund = Fund(
            clientID=1,
            legal_name=fundObj['fundName']['value'],
            trackingID=fundObj['fundID']['value'],
            data=fundObj
        )

        newFund.save()

        response = {
            'uuid': fundObj['id'],
            'editable':False,
            'id': newFund.id,
            'isAudited': newFund.isAudited,
            "checked": False,
            "fundID": {
                'id':newFund.trackingID,
                'value': newFund.trackingID,
                'selected': False,
                'editable': False,
                'error': False
            },
            "fundName": {
                'id':newFund.legal_name,
                'value': newFund.legal_name,
                'selected': False,
                'editable': False,
                'error': False
            },
            'values': []
        }




        return Response(response,  status=status.HTTP_200_OK)

    def delete(self, request, pk, format=None):

        fund = get_object_or_404(Fund, pk=pk)

        deletedID = fund.id

        fund.delete()



        response = { 'deletedID': deletedID }


        return Response(response,  status=status.HTTP_200_OK)

# [
#                     {'fundFamily': 1},
#                     {'lpaDate': 2},
#                     {'commencementDate': 3},
#                     {'firstCall': 4},
#                     {'fundLife': 5},
#                     {'mgmtFeeRate': 6},
#                     {'carriedInteresRate': 7},
#                     {'adminFeeRate': 8},
#             ]


class FundHeaderAPI(APIView):

    permission_classes = (IsAuthenticated,)

    def delete(self, request, pk, format=None):

        response = { 'deletedID': pk }

        return Response(response,  status=status.HTTP_200_OK)

    def get(self, request, *args, **kwargs):

        fund_headers = FundCriterionHeader.objects.all()

        return Response(FundCriterionHeaderSerializer(fund_headers, many=True).data,  status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):

        fundHeader = request.data['fundHeader']

        newFundHeader = FundCriterionHeader(
            clientID=1,
            name=fundHeader['name'],
            required=False,
            order=1
        )
        newFundHeader.save()

        serializer = FundCriterionHeaderSerializer(newFundHeader, many=False).data

        serializer['uuid'] = fundHeader['id']


        return Response(serializer,  status=status.HTTP_200_OK)