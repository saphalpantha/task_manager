from rest_framework import viewsets, status
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TaskSerializer
from .models import Task
        
from rest_framework.permissions import IsAuthenticated


class TaskView(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    permission_classes = [IsAuthenticated]
    serializer_class = TaskSerializer
    queryset = Task.objects.all()


@api_view(['GET'])
def get_all_tasks(request):
    """
    List my all tasks.
    """
    tasks = Task.objects.filter(user=request.user)
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_single_task(request, pk):
    """
    Get a single task
    """
    try:
        task = Task.objects.get(user=request.user, pk=pk)
    except Task.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = TaskSerializer(task)
    return Response(serializer.data)


@api_view(['POST'])
def create_task(request):
    """
    Create Task from Request Body.
    """
    data = request.data
    task = Task.objects.create(body=data['body'])
    serializer = NoteSerializer(task, many=False)
    if serializer: return Response(serializer.data)
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def update_task(request, pk):
    """
    Update Task by Id.
    """
    data = request.data
    task = Task.objects.get(id=pk)
    serializer = NoteSerializer(instance=task, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_202_ACCEPTED)
    return Response(serializer.data)


@api_view(['DELETE'])
def delete_task(request,pk):
    """
    Delete Task by Id.
    """
    task = Task.objects.get(id=pk)
    task.delete()
    return Response("Note was deleted")
