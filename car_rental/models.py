from unittest.util import _MAX_LENGTH
from django.db import models

class Branch(models.Model):
    id = models.AutoField(primary_key=True)
    phoneNumber = models.CharField(max_length=12)
    province = models.CharField(max_length=45)
    city = models.CharField(max_length=45)
    postalCode = models.CharField(max_length=7)
    streetNumber = models.CharField(max_length=45)
    streetName = models.CharField(max_length=45)
    unitNumber = models.IntegerField()

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
    def __str__(self):
        return self.manufacturer+ ' ' +self.model + ' - ' + str(self.mileage)

class Customer(models.Model):
    id = models.AutoField(primary_key=True)
    firstname = models.CharField(max_length=45)
    lastname = models.CharField(max_length=45)
    driverLicense = models.CharField(max_length=45)
    email = models.EmailField()
    phoneNumber = models.CharField(max_length=45)
    dob = models.DateField() #https://www.geeksforgeeks.org/datefield-django-models/
    goldMembership = models.CharField(max_length=45)
    province = models.CharField(max_length=45)
    postalCode = models.CharField(max_length=7)
    streetNumber = models.CharField(max_length=45)
    streetName = models.CharField(max_length=45)
    unitNumber = models.IntegerField()

class Employee(models.Model):
    id = models.AutoField(primary_key=True)
    firstname = models.CharField(max_length=45)
    lastname = models.CharField(max_length=45)
    email = models.EmailField()
    phoneNumber = models.CharField(max_length=45)
    password = models.CharField(max_length=45)
    province = models.CharField(max_length=45)
    postalCode = models.CharField(max_length=7)
    streetNumber = models.CharField(max_length=45)
    streetName = models.CharField(max_length=45)
    unitNumber = models.IntegerField()
    branchID = models.ForeignKey(Branch, on_delete=models.CASCADE)

class Rental(models.Model):
    id = models.AutoField(primary_key=True)
    dateFrom = models.DateField()
    dateTo = models.DateField()
    dateReturned = models.DateField()
    totalCost = models.FloatField()
    licensePlate = models.CharField(max_length=45)
    
    #How to pull from customer.goldMembership?
    goldMembership = models.CharField(max_length=45) #incorrect rn
    
    #Foreign Key
    branchID = models.ForeignKey(Branch, on_delete=models.CASCADE)
    carID = models.ForeignKey(Car, on_delete=models.CASCADE)
    typeID = models.ForeignKey(CarType,on_delete=models.CASCADE)
    customerID = models.ForeignKey(Customer, on_delete=models.CASCADE)
    employeeID = models.ForeignKey(Employee, on_delete=models.CASCADE)