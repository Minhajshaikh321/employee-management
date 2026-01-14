from django.contrib import admin
from .models import Employee


class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'department', 'role')
    search_fields = ('name', 'email')
    list_filter = ('department', 'role')


admin.site.register(Employee, EmployeeAdmin)