from django.db import models
from django.conf import settings
from subjects.models import AcademicClass, Section


class StudentProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )

    admission_number = models.CharField(max_length=30, unique=True)
    roll_number = models.CharField(max_length=20)

    academic_class = models.ForeignKey(
        AcademicClass,
        on_delete=models.CASCADE
    )

    section = models.ForeignKey(
        Section,
        on_delete=models.CASCADE
    )

    guardian_name = models.CharField(max_length=100)
    guardian_phone = models.CharField(max_length=15)

    def __str__(self):
        return self.user.get_full_name() or self.user.username