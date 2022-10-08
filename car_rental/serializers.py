#Serializers = converts from python object to JSON
from rest_framework import serializers
from .models import Car

class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ['id','manufacturer','model','fueltype','colour','licensePlate','status','mileage','typeID','BranchID']
