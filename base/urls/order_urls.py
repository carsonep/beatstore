from django.urls import path
from base.views import order_views as views

urlpatterns = [
    path('', views.getOrders, name='orders-add'),
    path('add/', views.addOrderItems, name='orders-add'),
    path('myorders/', views.getMyOrders, name='myorders'),
    path('<str:pk>/', views.getOrderById, name='order-by-id'),
    path('<str:pk>/pay/', views.updateOrderToPaid, name='pay'),
    
    
]