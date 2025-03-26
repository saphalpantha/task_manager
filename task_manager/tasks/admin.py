from django.contrib import admin
from .models import Task
# Register your models here.


@admin.register(Task)

class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'description',  'status',  'created_at', 'updated_at', 'user')  # Customize the fields you want to display
    list_filter = ('status', 'created_at')  # Optional: Add filters for quick sorting
    search_fields = ('title', 'description', 'user')  # Optional: Add a search bar for title and description
    ordering = ('created_at',)  # Optional: Default ordering by created_at field