from unittest.util import _MAX_LENGTH
from django.db import models


class Branch(models.Model):
    id = models.AutoField(primary_key=True)
    branchName = models.CharField(max_length=50, null=True, blank=True)
    phoneNumber = models.CharField(max_length=12)
    province = models.CharField(max_length=45)
    city = models.CharField(max_length=45)
    postalCode = models.CharField(max_length=7)
    streetNumber = models.CharField(max_length=45)
    streetName = models.CharField(max_length=45)
    unitNumber = models.IntegerField(null=True, blank=True)


class CarType(models.Model):
    id = models.AutoField(primary_key=True)
    description = models.TextField()
    dailyCost = models.FloatField()
    weeklyCost = models.FloatField()
    monthlyCost = models.FloatField()
    lateFee = models.FloatField()
    changeBranchFee = models.FloatField()


class Car(models.Model):
    id = models.AutoField(primary_key=True)
    manufacturer = models.CharField(max_length=45)
    model = models.CharField(max_length=45)
    fuelType = models.CharField(max_length=45)
    colour = models.CharField(max_length=45)
    licensePlate = models.CharField(max_length=12)
    status = models.CharField(max_length=45)
    mileage = models.IntegerField()
    typeID = models.ForeignKey(CarType, on_delete=models.CASCADE)
    BranchID = models.ForeignKey(Branch, on_delete=models.CASCADE)
    image = models.ImageField(
        default="", upload_to="./car_pictures", null=True, blank=True)

    def __str__(self):
        return self.manufacturer + ' ' + self.model + ' - ' + str(self.mileage)


class Customer(models.Model):
    id = models.AutoField(primary_key=True)
    firstname = models.CharField(max_length=45)
    lastname = models.CharField(max_length=45)
    driverLicense = models.CharField(max_length=45)
    email = models.EmailField()
    password = models.CharField(max_length=100)
    phoneNumber = models.CharField(max_length=45)
    dob = models.DateField()  # https://www.geeksforgeeks.org/datefield-django-models/
    goldMembership = models.BooleanField(null=True, blank=True)
    city = models.CharField(max_length=45)
    province = models.CharField(max_length=45)
    postalCode = models.CharField(max_length=7)
    streetNumber = models.CharField(max_length=45)
    streetName = models.CharField(max_length=45)
    unitNumber = models.IntegerField(null=True, blank=True)


class Employee(models.Model):
    id = models.AutoField(primary_key=True)
    firstname = models.CharField(max_length=45)
    lastname = models.CharField(max_length=45)
    email = models.EmailField(null=True, blank=True)
    phoneNumber = models.CharField(max_length=45)
    password = models.CharField(max_length=100)
    province = models.CharField(max_length=45)
    postalCode = models.CharField(max_length=7)
    streetNumber = models.CharField(max_length=45)
    streetName = models.CharField(max_length=45)
    unitNumber = models.IntegerField(null=True, blank=True)
    branchID = models.ForeignKey(Branch, on_delete=models.CASCADE)


class Rental(models.Model):
    id = models.AutoField(primary_key=True)
    dateFrom = models.DateField()
    dateTo = models.DateField()
    dateReturned = models.DateField(null=True, blank=True)
    totalCost = models.FloatField(null=True, blank=True)
    # Foreign Key
    rentalBranchID = models.ForeignKey(Branch,related_name='rentalBranchID', on_delete=models.CASCADE)
    returnBranchID = models.ForeignKey(
        Branch,related_name='returnBranchID', on_delete=models.CASCADE, null=True, blank=True)
    carID = models.ForeignKey(Car, on_delete=models.CASCADE)
    typeID = models.ForeignKey(CarType, on_delete=models.CASCADE)
    customerID = models.ForeignKey(Customer, on_delete=models.CASCADE)
    rentalEmployeeID = models.ForeignKey(
        Employee,related_name='rentalEmployeeID', on_delete=models.SET_NULL, null=True, blank=True)
    returnEmployeeID = models.ForeignKey(
        Employee, related_name='returnEmployeeID', on_delete=models.SET_NULL, null=True, blank=True)


class CarDamage(models.Model):
    id = models.AutoField(primary_key=True)
    date = models.DateField()
    description = models.TextField()
    damageCost = models.IntegerField()
    carID = models.ForeignKey(Car, on_delete=models.CASCADE)
    image = models.ImageField(
        default="", upload_to="./car_pictures/car_damages")
