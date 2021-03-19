from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import Beat, Order, OrderItem, ShippingAddress
from base.serializers import BeatSerializer, OrderSerializer

from rest_framework import status

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data

    orderItems = data['orderItems']


    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:

        # (1) Create Order
        order = Order.objects.create(
            user = user,
            paymentMethod=data['paymentMethod'],
            taxPrice=data['taxPrice'],
            totalPrice=data['totalPrice']
        )
        # (2) Create Shipping Address

        shipping = ShippingAddress.objects.create(   
            order=order,      
            email=data['shippingAddress']['email'],
        )
        # (3) Create Order Items and set order to orderItem relationship

        for i in orderItems:
            beat = Beat.objects.get(_id=i['product'])

            item = OrderItem.objects.create(
                beat=beat,
                order=order,
                name=beat.name,
                price=i['price'],
            )

            beat.save()
            
        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):

    user = request.user

    try:
        order = Order.objects.get(_id=pk)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            Response({'detail': 'Not authorized to view this order'}, status=status.HTTP_400_BAD_REQUEST)
    except:
        Response({'detail': 'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)




