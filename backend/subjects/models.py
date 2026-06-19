from django.db import models


class AcademicClass(models.Model):
    STREAM_CHOICES = [
        ("SCIENCE", "Science"),
        ("COMMERCE", "Commerce"),
        ("ARTS", "Arts"),
    ]

    name = models.CharField(max_length=20)
    stream = models.CharField(max_length=20, choices=STREAM_CHOICES)

    def __str__(self):
        return f"{self.name} - {self.stream}"


class Section(models.Model):
    name = models.CharField(max_length=5, unique=True)

    def __str__(self):
        return self.name


class Subject(models.Model):
    code = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name