from django.db import models
from django.core.validators import EmailValidator
from django.utils.timezone import now

# Create your models here.
class Employee(models.Model):   
    name=models.CharField(max_length=50,null=False)
    email=models.EmailField(max_length=100,unique=True,validators=[EmailValidator()])
    department=models.CharField(max_length=80,blank=True)
    role=models.CharField(max_length=80,blank=True)
    doj=models.DateField(default=now,null=False)
    
    def __str__(self):
        return self.email

