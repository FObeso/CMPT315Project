#Serializers = converts from python object to JSON
from rest_framework import serializers
from .models import Car, CarType, Branch

class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ['id','manufacturer','model','fuelType','colour','licensePlate','status','mileage', 'typeID', 'BranchID']


class CarTypeSerilzer(serializers.ModelSerializer):
    class Meta:
        model = CarType
        fields = ['id', 'description', 'dailyCost', 'weeklyCost', 'monthlyCost', 'lateFee', 'changeBranchFee']


class BranchSerilzer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = ["id", "phoneNumber", "province", "city", "postalCode", "streetNumber", "streetName", "unitNumber"]