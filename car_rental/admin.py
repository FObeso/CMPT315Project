from django.contrib import admin
from .models import *

admin.site.register(Car)
admin.site.register(Branch)
admin.site.register(CarType)
admin.site.register(Employee)
admin.site.register(Customer)
#admin.site.register(Rental)
admin.site.register(CarDamage)

#places search box so users can find transactions for a branch
class search(admin.ModelAdmin):
    search_fields = ['branchID__id']
      
class MyAdmin(admin.ModelAdmin):
    autocomplete_fields = ['BranchID']

admin.site.register(Rental,search)
