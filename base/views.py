from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Beat
from .serializers import BeatSerializer

# Create your views here.

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/products/',
        '/api/products/create/',

        '/api/products/upload/',

        '/api/products/<id>/reviews/',

        '/api/products/top/',
        '/api/products/<id>/',

        '/api/products/delete/<id>/',
        '/api/products/<update>/<id>/',
    ]

    return Response(routes)

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