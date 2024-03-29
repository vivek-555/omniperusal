from django.db import models
from django.contrib.postgres import fields
from ..user.models import User


class Task(models.Model):
    TASK_STATUS_CHOICES = (
        ('open', 'Open'),
        ('closed', 'Closed'),
        ('in_progress', 'In Progress'),
        ('abandoned', 'Abandoned'),
    )

    name = models.CharField(max_length=255)
    description = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey('user.User', related_name='tasks', on_delete=models.CASCADE)
    google_place = fields.JSONField(null=True, blank=True)
    status = models.CharField(max_length=15, choices=TASK_STATUS_CHOICES, default='open')
    budget = models.DecimalField(max_digits=20, decimal_places=2)
    deadline = models.DateTimeField(null=True, blank=True)
    completed_on = models.DateTimeField(null=True, blank=True)
    completed_by = models.ForeignKey('user.User', null=True, blank=True, related_name='task_completed_by')
    task_pickers = models.ManyToManyField(User, through='TaskPickers', through_fields=('task', 'task_picker'))

    def __str__(self):
        return self.name


class TaskPickers(models.Model):
    STATUS_CHOICES = (
        ('active', 'Active'),
        ('waiting', 'Waiting'),
        ('completed', 'Completed'),
    )

    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
    task = models.ForeignKey('Task', on_delete=models.CASCADE)
    task_picker = models.ForeignKey('user.User', on_delete=models.CASCADE, related_name='task_picker')
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='active')
