"""car_rental URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from car_rental import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('admin/', admin.site.urls),
    path('cars/', views.car_list),
    path('cars/<int:id>', views.car_detail),
    path('carType/', views.car_type),
    path('branch/', views.branch_details),
    path('branch/<int:id>', views.branch_move),
    path('employees/', views.view_employees),
    path('employee/login/', views.login_employee),
    path('employee/register/', views.register_employee),
    path('login/', views.login_customer),
    path('register/', views.register_customer),
    path('customer/', views.customer),
    path('rental/', views.rental),
    path('lateFees/', views.late_fees), 
    path('returnCar/', views.return_car_to_branch),
    path('employee/branches/', views.add_branch),
]

urlpatterns = format_suffix_patterns(urlpatterns)
