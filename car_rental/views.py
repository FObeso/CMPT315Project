#Endpoints go here
from msilib.schema import ReserveCost
from django.http import JsonResponse
from .models import Car, CarType, Branch
from .serializers import CarSerializer, BranchSerilzer, CarTypeSerilzer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

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