from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Beat

class BeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Beat
        fields = '__all__'
