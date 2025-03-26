from django.db import models
from enum import Enum
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _ 

# Create your models here.

class TaskStatus(models.TextChoices):
    PENDING = "P", _("PENDING") 
    IN_PROGRESS = "I", _("IN_PROGRESS")
    COMPLETED = "C", _("COMPLETED")

    @classmethod
    def choices(cls):
        return [(key, key.value) for key in cls ]

class Task(models.Model):
    
    title = models.CharField(max_length=255)
    description = models.TextField()
    status = models.CharField(max_length=255, choices=TaskStatus.choices, default=TaskStatus.PENDING)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.title

    