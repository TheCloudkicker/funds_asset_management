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



class QuestionaireAPI(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):

        questionaire = {
        'fundID': 1,
        'fundName': 'Fund 1',
        'period': 1,
        'questions': [
            {
                'id': 1,
                'questionNo': '1',
                'text': 'Is a master feeder structure in place?',
                'type': 'BOOL',
                'options': None,
                'visible': True,
                'isOpen': False,
                'suggested': True,
                'current': True,
                'previous': True,
                'isError':False,
                'unsaved_changes':False,
                'subquestions': [
                    {
                        'id': 2,
                        'questionNo': '1A',
                        'text': 'At which level is carried interest calculated?',
                        'type': 'CHOICES',
                        'isMulti': False,
                        'options': [
                            { 'value': 'MASTER', 'label': 'MASTER' },
                            { 'value': 'FEEDER', 'label': 'FEEDER' },
                        ],
                        'visible': True,
                        'isOpen': False,
                        'suggested': True,
                        'current': { 'value': 'MASTER', 'label': 'MASTER' },
                        'previous': { 'value': 'MASTER', 'label': 'MASTER' },
                        'isError':False,
                        'unsaved_changes':False,
                        'subquestions': []
                    }
                ]
            },
            {
                'id': 3,
                'questionNo': '2',
                'text': 'Should feeder expenses be taken into account during final carry allocation?  ',
                'type': 'BOOL',
                'options': None,
                'visible': True,
                'isOpen': False,
                'suggested': True,
                'current': True,
                'previous': True,
                'isError':False,
                'unsaved_changes':False,
                'subquestions': []
            },
            {
                'id': 4,
                'questionNo': '3',
                'text': 'Are affiliated limited partners subject to carried interest ?  ',
                'type': 'BOOL',
                'options': None,
                'visible': True,
                'isOpen': False,
                'suggested': False,
                'current': True,
                'previous': True,
                'isError':False,
                'unsaved_changes':False,
                'subquestions': []
            },
            {
                'id': 5,
                'questionNo': '4',
                'text': 'Is the general partner subject to carried interest  ?  ',
                'type': 'BOOL',
                'options': None,
                'visible': True,
                'isOpen': False,
                'suggested': False,
                'current': True,
                'previous': True,
                'isError':False,
                'unsaved_changes':False,
                'subquestions': []
            },
            {
                'id': 6,
                'questionNo': '5',
                'text': 'Is a Preferred Return to the limited partners applicable  ',
                'type': 'BOOL',
                'options': None,
                'visible': True,
                'isOpen': False,
                'suggested': False,
                'current': True,
                'previous': True,
                'isError':False,
                'unsaved_changes':False,
                'subquestions': [
                    {
                        'id': 7,
                        'questionNo': '5A',
                        'text': 'Preferred Return Rate in %',
                        'type': 'INPUT',
                        'options': None,
                        'visible': True,
                        'isOpen': False,
                        'suggested': 8,
                        'current': 8,
                        'previous': 8,
                        'isError':False,
                        'unsaved_changes':False,
                        'subquestions': []
                    }

                ]
            },
            {
                'id': 8,
                'questionNo': '6',
                'text': 'Is a Catch-up allocation to the Carried Interest Partner foreseen ',
                'type': 'BOOL',
                'options': None,
                'visible': True,
                'isOpen': False,
                'suggested': True,
                'current': True,
                'previous': True,
                'isError':False,
                'unsaved_changes':False,
                'subquestions': []
            },
            {
                'id': 9,
                'questionNo': '7',
                'text': 'Which type of investments are taken into account in the calculation of carried interest  ',
                'type': 'CHOICES',
                'isMulti': True,
                'options': [
                    { 'value': 'Primaries', 'label': 'Primaries' },
                    { 'value': 'Secondaries', 'label': 'Secondaries' },
                    { 'value': 'Directs', 'label': 'Directs' },
                ],
                'visible': True,
                'isOpen': False,
                'suggested': True,
                'current': [
                    { 'value': 'Secondaries', 'label': 'Secondaries' },
                    { 'value': 'Directs', 'label': 'Directs' },
                ],
                'previous': [
                    { 'value': 'Secondaries', 'label': 'Secondaries' },
                    { 'value': 'Directs', 'label': 'Directs' },
                ],
                'isError':False,
                'unsaved_changes':False,
                'subquestions': [
                    {
                        'id': 2,
                        'questionNo': '7A',
                        'text': 'Carried Interest Allocation to GP / CIP / SLP in % for PI?',
                        'type': 'INPUT',
                        'options': None,
                        'visible': True,
                        'isOpen': False,
                        'suggested': 5,
                        'current': 5,
                        'previous': 5,
                        'isError':False,
                        'unsaved_changes':False,
                        'subquestions': []
                    },
                    {
                        'id': 2,
                        'questionNo': '7B',
                        'text': 'Carried Interest Allocation to GP / CIP / SLP in % for SI?',
                        'type': 'INPUT',
                        'options': None,
                        'visible': True,
                        'isOpen': False,
                        'suggested': 5,
                        'current': 5,
                        'previous': 5,
                        'isError':False,
                        'unsaved_changes':False,
                        'subquestions': []
                    },
                    {
                        'id': 2,
                        'questionNo': '7C',
                        'text': 'Carried Interest Allocation to GP / CIP / SLP in % for DI?',
                        'type': 'INPUT',
                        'options': None,
                        'visible': True,
                        'isOpen': False,
                        'suggested': 5,
                        'current': 5,
                        'previous': 5,
                        'isError':False,
                        'unsaved_changes':False,
                        'subquestions': []
                    },
                ]
            },
            {
                'id': 10,
                'questionNo': '8',
                'text': 'Is a look through applied  to account for operating P&L to? ',
                'type': 'BOOL',
                'options': None,
                'visible': True,
                'isOpen': False,
                'suggested': True,
                'current': True,
                'previous': True,
                'isError':False,
                'unsaved_changes':False,
                'subquestions': []
            },
        ]
    }



        return Response(questionaire,  status=status.HTTP_200_OK)



    def post(self, request, *args, **kwargs):

        response = ['post']

        return Response(response,  status=status.HTTP_200_OK)



    def delete(self, request, pk, format=None):

        response = { 'deletedID': 1 }


        return Response(response,  status=status.HTTP_200_OK)

