from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import Beat
from base.serializers import BeatSerializer

from rest_framework import status

@api_view(['GET'])
def getProducts(request):
    beats = Beat.objects.all()
    serializer = BeatSerializer(beats, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProduct(request, pk):
    beat = Beat.objects.get(_id=pk)
    serializer = BeatSerializer(beat, many=False)

    return Response(serializer.data)