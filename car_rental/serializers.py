#Serializers = converts from python object to JSON
from rest_framework import serializers
from .models import *

class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ['id','manufacturer','model','fuelType','colour','licensePlate','status','mileage', 'typeID', 'BranchID', "image"]


class CarTypeSerilzer(serializers.ModelSerializer):
    class Meta:
        model = CarType
        fields = ['id', 'description', 'dailyCost', 'weeklyCost', 'monthlyCost', 'lateFee', 'changeBranchFee']


class BranchSerilzer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = ["id","branchName", "phoneNumber", "province", "city", "postalCode", "streetNumber", "streetName", "unitNumber"]

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ['id','firstname', 'lastname', 'email', 'phoneNumber', 'password', 'province', 'postalCode', 'streetNumber', 'streetName', 'unitNumber', 'branchID' ]

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id','firstname', 'lastname', 'driverLicense',  'email', 'password','phoneNumber', 'dob', 'goldMembership','province', 'postalCode', 'streetNumber', 'streetName', 'unitNumber']

class CarDamageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarDamage
        fields = ['id','date','damageCost','description']

class RentalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rental
        fields = ["id", "dateFrom", "dateTo", "dateReturned", "totalCost", "licensePlate" ,"goldMembership", "branchID", "carID", "typeID", "customerID", "employeeID"]

class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = ["id", "name", "phoneNumber", "province", "city", "postalCode", "streetNumber", "streetName", "unitNumber"]