from django.db import models
from django.conf import settings
from subjects.models import Subject


class TeacherProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )

    employee_id = models.CharField(max_length=30, unique=True)

    subject = models.ForeignKey(
        Subject,
        on_delete=models.CASCADE
    )

    qualification = models.CharField(max_length=100)
    experience = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.user.get_full_name() or self.user.username