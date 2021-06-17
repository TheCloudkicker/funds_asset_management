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
from rest_framework.parsers import MultiPartParser, FormParser

from entities.models import Fund, Investment, InvestmentOwnership, Investor, InvestorCommit, CapitalMovement
from main.models import Period
from fs.models import Fsli, GenericMapping, CustomMapping, SubAccount, Balance
from supports.models import Support, SupportType, ClientReport, FundSupport


def check_investments(fileData, fund):

    investments_qs = Investment.objects.all()
    ownerships_qs = InvestmentOwnership.objects.filter(owner=fund)

    print('check_investments', check_investments)

    items = fileData['items']

    for item in items:
        name = item['Investment_Name']
        try:
            investment = investments_qs.get(name=name)
            continue
        except:
            investment = Investment(name=name)

        investment.save()
        try:
            ownership = ownerships_qs.get(investment=investment)
        except:
            ownership = InvestmentOwnership(
                owner=fund, investment=investment
            )
            ownership.save()
    return


def check_investors(fileData, fund):

    investors_qs = Investor.objects.all()
    commitments_qs = InvestorCommit.objects.filter(fund=fund)

    items = fileData['items']

    for item in items:
        name = item['Investor']
        commitment = item['InvestorCommitment']
        try:
            investor = investors_qs.get(name=name)
            continue
        except:
            investor = Investor(name=name)

        investor.save()
        try:
            commitment = commitments_qs.get(investor=investor)
            if commitment.commitment_base == None:
                commitment.commitment_base = commitment
                commitment.save()


        except:
            commitment = InvestorCommit(
                fund=fund, investor=investor, commitment_base=commitment
            )
            commitment.save()

    return


def init_capital(support, fund, totals, uploadedBy):

    fileName = support.fileName

    date_raw = fileName.split(' ')[4]



    key = list(totals.keys())[0]

    print('date_raw', key, totals)
        


    date_clean = date_raw.replace('.xls','')

    movementDate = datetime.datetime.strptime(date_clean, '%m.%d.%Y')
    dateAdded = datetime.datetime.now()

    
    if abs(totals[key]['contributions']) > 0:
        contribution = CapitalMovement(
            fund=fund,
            movementType='Contribution',
            addedBy=uploadedBy,
            movementDate=movementDate,
            totalAmount=totals[key]['contributions'],
            dateAdded=dateAdded,
            supportID=support.id
        )
        contribution.save()

    if abs(totals[key]['distributions']) > 0:
        distribution = CapitalMovement(
            fund=fund,
            movementType='Distribution',
            addedBy=uploadedBy,
            movementDate=movementDate,
            totalAmount=totals[key]['distributions'],
            dateAdded=dateAdded,
            supportID=support.id
        )
        distribution.save()


    return 

class SupportUploadAPI(APIView):

    parser_classes = (MultiPartParser, FormParser)
    permission_classes = (IsAuthenticated,)


    def post(self, request, *args, **kwargs):

        uploadedfile = request.data['uploadedfile']

        uuid = request.data['uuid']
        uploadedBy = request.data['uploadedBy']
        
        fileData = request.data['fileData']
        hasData = request.data['hasData']
        meta = request.data['meta']
        totals = request.data['totals']
        reportID = request.data['reportID']
        fundID = request.data['fundID']
        periodID = request.data['periodID']

        totals = json.loads(totals)

        fileDataJson = json.loads(fileData)

        # print("fileDataJson", fileDataJson)

        support = Support(
            clientID=1,
            fundID=fundID,
            periodID=periodID,
            fileName=uploadedfile.name,
            uploadedBy=uploadedBy,
            attachment=uploadedfile,
            report_id=reportID,
            totals=totals,
            data=fileDataJson
        )

        print('here1')


        try:
            p_meta = json.loads(meta)
            support.meta['no_items'] =  p_meta['no_items']
        except:
            pass


        support.save()

        fund_support = FundSupport(
            support=support,
            fund_id=fundID
        )

        fund_support.save()

        report = ClientReport.objects.get(id=reportID)

        fund = Fund.objects.get(id=fundID)

        if report.name == 'Holdings Report':
            check_investments(fileDataJson, fund)

        elif report.name == 'Capital Report':
            check_investors(fileDataJson, fund)
            init_capital(support, fund, totals, uploadedBy)



        response = {
            'uuid': uuid, 
            'type': request.data['fileType']
            }

        return Response(response,  status=status.HTTP_200_OK)



    def delete(self, request, pk, format=None):

        support = get_object_or_404(FundSupport, pk=pk)
        
        response = { 
            'supportID': support.id,
            'fundID': support.fundID,
            'repoColumnID': support.repoColumn_id
            }

        support.delete()

        return Response(response,  status=status.HTTP_200_OK)

