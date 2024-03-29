from omniperusal.user.models import User
from omniperusal.task.models import Task
from django.contrib.auth.models import Group
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    tasks = serializers.HyperlinkedRelatedField(many=True, queryset=Task.objects.all(), view_name='task-detail')

    class Meta:
        model = User
        fields = ('id', 'url', 'email', 'first_name', 'last_name', 'phone_number', 'tasks')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('id', 'url', 'name')
