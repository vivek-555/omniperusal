from rest_framework import viewsets
from omniperusal.task.models import Task
from omniperusal.task.serializers import TaskSerializer


class TaskViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Task.objects.all().order_by('-updated_on')
    serializer_class = TaskSerializer
    filter_fields = ('id', 'description', 'created_on', 'updated_on', 'owner__email')

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

        # def get_queryset(self):
        #     queryset = Task.objects.all()
        #     username = self.request.query_params.get('username', None)
        #     if username is not None:
        #         queryset = queryset.filter(owner__email=username)
        #     return queryset
