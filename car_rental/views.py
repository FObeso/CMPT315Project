#Endpoints go here

import json
from django.db import connection
from django.http import JsonResponse
from .models import *
from .serializers import *

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from passlib.hash import sha256_crypt as sha

import datetime

#Creates/Adds in car info
#Endpoint cars
@api_view(['GET','POST'])
def car_list(request, format=None):
    #get all cars
    #serialize them
    #return JSON
    if request.method == 'GET':
        cars = Car.objects.all()
        serializer = CarSerializer(cars, many=True)
        return Response(serializer.data)
    
    if request.method == 'POST':
        print(request.data)
        serializer = CarSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            print("here")
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("HIIII")
        

#Updates and deletes car based on id
#Endpoint cars/<int:id>
@api_view(['GET','PUT','DELETE'])
def car_detail(request, id, format=None):
    try:
        car = Car.objects.get(pk=id)
    except Car.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CarSerializer(car)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = CarSerializer(car, data=request.data) 
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        car.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


#Creates/Adds in car type
#Endpoint cars type
@api_view(['GET','POST'])
def car_type(request, format=None):
    #get all cars
    #serialize them
    #return JSON
    if request.method == 'GET':
        car_type = CarType.objects.all()
        serializer = CarTypeSerilzer(car_type, many=True)
        return Response(serializer.data)
    
    if request.method == 'POST':
        serializer = CarTypeSerilzer(data = request.data)
    
        if serializer.is_valid():
        #   print(serializer.errors)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

#Creates/Adds in branch
#Endpoint branch
@api_view(['GET','POST'])
def branch_details(request, format=None):
    #get all branches
    #serialize them
    #return JSON
    if request.method == 'GET':
        branch = Branch.objects.all()
        serializer = BranchSerilzer(branch, many=True)
        return Response(serializer.data)
    
    if request.method == 'POST':
        serializer = BranchSerilzer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


# register new employee
@api_view(['GET'])
def view_employees(request):
        if request.method == 'GET':
            employees = Employee.objects.all()
            serializer = EmployeeSerializer(employees, many=True)
            return Response(serializer.data)

# register new employee
@api_view(['POST'])
def register_employee(request):
        if request.method == "POST":
            #request.data._mutable = True
            try:
                # check if user email exists
                employee = Employee.objects.raw("SELECT * FROM car_rental_employee WHERE email = '" + request.data["email"] + "' ;")
                if len(employee) > 0:
                    return Response({"message": "email exists"}, status=status.HTTP_400_BAD_REQUEST)
                finalData = request.data

                finalData["password"] = sha.hash(request.data["password"])

                serializer = EmployeeSerializer(data=finalData)
                if serializer.is_valid():
                    serializer.save()
                    return Response({"employee": serializer.data}, status=status.HTTP_201_CREATED)
                else:
                    
                    print(serializer.errors)
                    return Response({"message": "Invalid Info"}, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                print(e)
                return Response({"message": "Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# login employeeS
@api_view(['GET'])
def login_employee(request):
    try:
        print("HERE")
        if request.method == 'GET':
            email = request.query_params.get("email")
            password = request.query_params.get('password')
            print(email)
            # check for query params
            if (not email or not password):
                return Response({"message": "please fill all required fields"}, status=status.HTTP_400_BAD_REQUEST)
            # retrieve the employee by email    
            employee = Employee.objects.raw("SELECT * FROM car_rental_employee WHERE email = " + email + ";")
            if (len(employee) == 0):
                return Response({"message": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
            employee = employee[0]
            # check if passwords match
            print(employee.password)
            passwordMatch = sha.verify(password, employee.password)

            print(passwordMatch)
            if (not passwordMatch):
                return Response({"message": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        serializer = EmployeeSerializer(employee)
        return Response({"employee": serializer.data}, status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return Response({"message": "Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# register new customer
@api_view(['POST'])
def register_customer(request):
        if request.method == "POST":
            try:
                print("HI")
                # check if user email exists
                customer = Customer.objects.raw("SELECT * FROM car_rental_customer WHERE email = '" + request.data["email"] + "' ;")
                if len(customer) > 0:
                    return Response({"message": "email exists"}, status=status.HTTP_400_BAD_REQUEST)
                finalData = request.data

                finalData["password"] = sha.hash(request.data["password"])

                finalData["dob"] = datetime.datetime.strptime(finalData["dob"], "%Y-%M-%d").date()
                serializer = CustomerSerializer(data=finalData)
                if serializer.is_valid():
                    serializer.save()
                    return Response({"customer": serializer.data}, status=status.HTTP_201_CREATED)
                else:
                    return Response({"message": "Invalid Info"}, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                print(e)
                return Response({"message": "Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#login customer
@api_view(["GET"])
def login_customer(request):
    try:
        if request.method == 'GET':
            email = request.query_params.get("email")
            password = request.query_params.get('password')
            print(email, password)
            # check for query params
            if (not email or not password):
                return Response({"message": "please fill all required fields"}, status=status.HTTP_400_BAD_REQUEST)
            # retrieve the employee by email    
            customer = Customer.objects.raw("SELECT * FROM car_rental_customer WHERE email = " + email + ";")
            if (len(customer) == 0):
                return Response({"message": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
            customer = customer[0]
            # check if passwords match

            passwordMatch = sha.verify(password, customer.password)

            print(passwordMatch)
            if (not passwordMatch):
                return Response({"message": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        serializer = CustomerSerializer(customer)
        return Response({"customer": serializer.data}, status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return Response({"message": "Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# CRUD endpoint for customer 
# get all customer
# update customer info

@api_view(['GET', 'PUT'])
def customer(request, format=None):
    try:
        if request.method == "GET":
            id = request.query_params.get("id")
            if id:
                customer = Customer.objects.get(pk=id)
                serializer = CustomerSerializer(customer)
                return Response(serializer.data, status=status.HTTP_200_OK)
            customers = Customer.objects.all()
            serializer = CustomerSerializer(customers, many=True)
            return Response(serializer.data)
        elif request.method == "PUT":
            id = request.data["id"]
            customer = Customer.objects.get(pk=id)
            serializer = CustomerSerializer(customer, data=request.data) 
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
    except Exception as e:
        print(e)
        return Response({"message": "Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



def return_car_to_branch(car_id, branch_id):
    #body_unicode = request.body
    try: 
 
        update = "UPDATE car_rental_car SET BranchID_id = " + str(branch_id)

        cond = " WHERE car_rental_car.id = " + str(car_id)

        query = update + cond

        with connection.cursor() as cursor:
                cursor.execute(query)        
            
        return True
    
    except Exception as e:
        print(e)
        return Response({"message": "Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


#Creates/Adds in rental table
#Endpoint Rentals
@api_view(['GET','POST', 'PUT'])
def rental(request, format=None):
   
    if request.method == 'GET':
        rentals = Rental.objects.all()
        serializer = RentalSerializer(rentals, many=True)
        return Response(serializer.data)
    
    if request.method == 'POST':
        finalData = request.data
        finalData["dateFrom"] =datetime.datetime.strptime(finalData["dateFrom"], "%Y-%m-%d").date()
        finalData["dateTo"] = datetime.datetime.strptime(finalData["dateTo"],  "%Y-%m-%d").date()
        serializer = RentalSerializer(data=finalData)


        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)  
    
        

    if request.method == 'PUT':
        print(request.data)
        id = request.data['id']

        rental = Rental.objects.get(pk=id)
        serializer = RentalSerializer(rental, data=request.data) 
        if request.data["returnBranchID"] != rental.rentalBranchID:
            # try:
            #     car = Car.objects.raw("UPDATE car_rental_car set branchID = " + request.data["returnBranchID"])
            # except Car.DoesNotExist:
            #     return Response(status=status.HTTP_404_NOT_FOUND)
            # carSerializer = CarSerializer(car) 
            # if carSerializer.is_valid():
            #     carSerializer.save()
            return_car_to_branch(request.data["carID"], request.data["returnBranchID"])

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



#calclates the late fee. 
@api_view(['GET'])
def late_fees(request):
    
    if request.method == "GET":
        select = "select customerID_id, dateTo, dateReturned, (ROUND((JULIANDAY(dateReturned) - JULIANDAY(dateTo)) )) * lateFee AS difference"
    
        query = select + " from car_rental_rental, car_rental_cartype " +" where car_rental_rental.typeID_id = car_rental_cartype.id and customerID_id "

        with connection.cursor() as cursor:
            cursor.execute(query)
        
            db = cursor.fetchall() 
            json_data = []
            for data in db:
                json_data.append({"customer_id" : data[0], "dateTo" : data[1], "dateReturned" : data[2],  "late_fee" : data[3]})
            
    
        return JsonResponse(json_data, safe=False)



# #If a car is returned a different branch and the customer is not a gold memeber
# #charge the customer a fee.
# def return_car_to_different_branch_fee(car_id, branch_id):
   
#     select = "select goldMembership from car_rental_rental "
#     cond = " where carID_id = " + car_id +  "  and branchID_id != " + branch_id + " and goldMembership == 'N' "

#     query = select + cond

#     with connection.cursor() as cursor:
#         cursor.execute(query)     

#     #if empty then the person is not a gold member charge them 10 bucks
#     if cursor.fetchall() == 0:
#         return 10
#     else:
#         return 0





# add branch
@api_view(['POST'])
def add_branch(request):
        if request.method == "POST":
            try:
                # check if user email exists
                branch = Branch.objects.raw("SELECT * FROM car_rental_branch WHERE phoneNumber = '" + request.data["phoneNumber"] + "' ;")
                if len(branch) > 0:
                    return Response({"message": "phoneNumber exists"}, status=status.HTTP_400_BAD_REQUEST)
                print(request.data)
                serializer = BranchSerializer(data=request.data)
            
                if serializer.is_valid():
                    serializer.save()
                    return Response({"branch": serializer.data}, status=status.HTTP_201_CREATED)
                else:
                    return Response({"message": "Invalid Info"}, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                print(e)
                return Response({"message": "Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# carDamages
@api_view(['GET','POST'])
def car_damages(request, format=None):
   
    if request.method == 'GET':
        damages = CarDamage.objects.all()
        serializer = CarDamageSerializer(damages, many=True)
        return Response(serializer.data)
    
    if request.method == 'POST':
        finalData = request.data
        finalData["damageDate"] = datetime.datetime.strptime(finalData["damageDate"], "%m/%d/%Y").date()
        serializer = CarDamageSerializer(data=finalData)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
