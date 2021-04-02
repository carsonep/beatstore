from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import Beat, Order, OrderItem, ShippingAddress
from base.serializers import BeatSerializer, OrderSerializer

from rest_framework import status
from datetime import datetime
from django.core.cache import cache
from django.core.mail import EmailMessage


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
        a=[]
        for i in orderItems:
            beat = Beat.objects.get(_id=i['product'])

            
            item = OrderItem.objects.create(
                beat=beat,
                order=order,
                name=beat.name,
                price=i['price'],
                file=beat.beat.url,
            )
            a.append(str(item.file))
            request.session['orderItems'] = a # set 'token' in the session
            
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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request): 
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)



@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):  
    order = Order.objects.get(_id=pk)
    
    order.isPaid = True
    order.paidAt = datetime.now()

    order.save()

    user = request.user
    orderItems = request.session['orderItems'] # get 'token' from the session
  
    body = ''
    a=[]


    for i in orderItems:    
        body = i
        a.append(body)

    message = EmailMessage('Beats By Karu - @Prod.Karu - Visit download link/links to download your beat!', "\n".join(a), "prodkaru@gmail.com", [user])

    message.send()

    return Response("Order was paid")









