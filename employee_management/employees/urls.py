from django.urls import path
from .views import EmployeeListCreateView, EmployeeDetailView

urlpatterns = [
    path('employees/',EmployeeListCreateView.as_view(),name='employee-list'),
    path('employees/<int:id>/',EmployeeDetailView.as_view(),name='employee-detail'),
]