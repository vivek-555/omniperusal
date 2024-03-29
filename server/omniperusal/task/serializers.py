from omniperusal.task.models import Task
from rest_framework import serializers


class TaskSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.email')
    completed_by = serializers.ReadOnlyField(source='completed_by.email')

    class Meta:
        model = Task
        fields = ('id', 'name', 'description', 'budget', 'google_place', 'created_on', 'updated_on', 'owner', 'status',
                  'completed_by', 'completed_on', 'deadline')
