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
        serializer = CarSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

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
            return Response(serializer.data)
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



#Creates/Adds in car type
#Endpoint cars type
@api_view(['GET','POST'])
def branch_details(request, format=None):
    #get all cars
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


#transfer car from one branch to another based on branch id
#Endpoint branchs/<int:id>
@api_view(['GET','PUT','DELETE'])
def branch_move(request, id, format=None):
    try:
        branch = Branch.objects.get(pk=id)
    except Branch.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    #Add to new branch
    if request.method == 'GET':
        serializer = BranchSerilzer(Branch)
        return Response(serializer.data)
    #Update to new branch
    elif request.method == 'PUT':
        serializer = BranchSerilzer(Branch, data=request.data) 
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    #Delete from old branch
    elif request.method == 'DELETE':
        Branch.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

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
                # check if user email exists
                customer = Customer.objects.raw("SELECT * FROM car_rental_customer WHERE email = '" + request.data["email"] + "' ;")
                if len(customer) > 0:
                    return Response({"message": "email exists"}, status=status.HTTP_400_BAD_REQUEST)
                finalData = request.data

                finalData["password"] = sha.hash(request.data["password"])

                finalData["dob"] = datetime.datetime.strptime(finalData["dob"], "%m/%d/%Y").date()
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
            # check for query params
            if (not email or not password):
                return Response({"message": "please fill all required fields"}, status=status.HTTP_400_BAD_REQUEST)
            # retrieve the employee by email    
            customer = Customer.objects.raw("SELECT * FROM car_rental_customer WHERE email = " + email + ";")
            if (len(customer) == 0):
                return Response({"message": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
            customer = customer[0]
            # check if passwords match

            passwordMatch = sha.hash(password, customer.password)

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
            customers = Customer.objects.all()
            serializer = CustomerSerializer(customers, many=True)
            return Response(serializer.data)
        elif request.method == "PUT":
            id = request.query_params.get("id")
            customer = Customer.objects.get(pk=id)
            serializer = CustomerSerializer(customer, data=request.data) 
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
    except Exception as e:
        print(e)
        return Response({"message": "Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




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



#If a car is returned a different branch and the customer is not a gold memeber
#charge the customer a fee.
def return_car_to_different_branch_fee(car_id, branch_id):
   
    select = "select goldMembership from car_rental_rental "
    cond = " where carID_id = " + car_id +  "  and branchID_id != " + branch_id + " and goldMembership == 'N' "

    query = select + cond

    with connection.cursor() as cursor:
        cursor.execute(query)     

    #if empty then the person is not a gold member charge them 10 bucks
    if cursor.fetchall() == 0:
        return 10
    else:
        return 0



@api_view(['POST'])
def return_car_to_branch(request):
    #body_unicode = request.body
    
    try:
    
        if request.method == "POST":
        
            car_id = request.data["car_id"]
            branch_id = request.data["branch_id"]
            
            update = "UPDATE car_rental_car SET BranchID_id = " + str(branch_id) + " , status = 'Available'"

            cond = " WHERE car_rental_car.id = " + str(car_id) + "  and car_rental_car.status == 'rented' "

            query = update + cond

            with connection.cursor() as cursor:
                    cursor.execute(query)        
            
            return Response({'success':'returned car'}, status=status.HTTP_200_OK)
    
    except Exception as e:
        print(e)
        return Response({"message": "Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

