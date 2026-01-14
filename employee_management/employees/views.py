from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Employee
from .serializers import EmployeeSerializer
from django.core.paginator import Paginator

class EmployeeListCreateView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request,format=None): #create employee
        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self,request,format=None): #list employees with pagination +filtering
        employees = Employee.objects.all().order_by('id')
        department=request.query_params.get('department')
        role=request.query_params.get('role')
        if department:
            employees=employees.filter(department=department)
        if role:
            employees=employees.filter(role=role)
        paginator=Paginator(employees,10) #10 employees per page
        page_number=request.query_params.get('page',1)
        page_obj=paginator.get_page(page_number)
        serializer=EmployeeSerializer(page_obj, many=True)
        
        return Response({'results': serializer.data,'count': paginator.count,'num_pages': paginator.num_pages,'current_page': page_obj.number}, status=status.HTTP_200_OK)
    
class EmployeeDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(Self,request,id,format=None): #get single employee
        emp=get_object_or_404(Employee,id=id)
        serializer=EmployeeSerializer(emp)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    def put(Self,request,id,format=None): #update single employee
        emp=get_object_or_404(Employee,id=id)
        serializer=EmployeeSerializer(emp,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self,request,id,format=None): #delete single employee
        emp=get_object_or_404(Employee,id=id)
        emp.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    