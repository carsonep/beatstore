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

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user
    beat = Beat.objects.create(
        user=user,
        name="Sample Beat",
        price=0,
        scale="C major",
        bpm="100 BPM",
        tags='#Sample',
    )

    serializer = BeatSerializer(beat, many=False)

    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data
    beat = Beat.objects.get(_id=pk)

    print(data)

    beat.name = data['name']
    beat.price = data['price']
    beat.scale = data['scale']
    beat.bpm = data['bpm']
    beat.tags = data['tags']

    beat.save()
    serializer = BeatSerializer(beat, many=False)
    return Response('Product updated')

@api_view(['POST'])
def uploadBeat(request):
    data = request.data

    beat_id = data['beat_id']
    beat = Beat.objects.get(_id=beat_id)

    beat.beat = request.FILES.get('beat')
    beat.save()
    return Response('Beat was uploaded')

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    beat = Beat.objects.get(_id=pk)
    beat.delete()

    return Response("Beat Deleted")





