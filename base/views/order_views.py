# from django.shortcuts import render

# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated, IsAdminUser
# from rest_framework.response import Response

# from base.models import Beat, Order, OrderItem, ShippingAddress
# from base.serializers import BeatSerializer

# from rest_framework import status

# @api_view(['POST'])
# @permission_classes(['IsAuthenticated'])
# def addOrderItems(request):
#     user = request.user
#     data = request.data

#     orderItems = data['orderItems']


#     if orderItems and len(orderItems) == 0:
#         return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
#     else:



