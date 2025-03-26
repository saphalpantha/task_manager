
from django.urls import path, include
from tasks import views;
from rest_framework.routers import DefaultRouter


app_name = 'tasks'

router = DefaultRouter()

router.register('', views.TaskView , 'tasks' )

urlpatterns = [
    path('tasks/', include(router.urls)),
]
