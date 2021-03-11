from django.contrib import admin

# Register your models here.

from .models import *

# add 'audio_file_player' tag to your admin view

admin.site.register(Beat)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress)


