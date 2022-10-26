#Endpoints go here

from .models import Car, CarType, Branch, Customer, Employee
from .serializers import CarSerializer, BranchSerilzer, CarTypeSerilzer, CustomerSerializer, EmployeeSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from passlib.hash import md5_crypt as md5

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

# login employee
@api_view(['GET'])
def login_employee(request):
    try:
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

            passwordMatch = md5.crypt(password, employee.password) == employee.password

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

                finalData["password"] = md5.crypt(request.data["password"])

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

            passwordMatch = md5.crypt(password, customer.password) == customer.password

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