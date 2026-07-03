from django.db import models
from django.conf import settings


class Note(models.Model):

    SUBJECT_CHOICES = [
        ("Physics", "Physics"),
        ("Chemistry", "Chemistry"),
        ("Mathematics", "Mathematics"),
        ("Biology", "Biology"),
    ]

    title = models.CharField(max_length=200)

    subject = models.CharField(
        max_length=30,
        choices=SUBJECT_CHOICES,
    )

    chapter = models.CharField(max_length=200)

    description = models.TextField(
        blank=True,
        null=True,
    )

    pdf_file = models.FileField(
        upload_to="notes/pdfs/",
        blank=True,
        null=True,
    )

    thumbnail = models.ImageField(
        upload_to="notes/thumbnails/",
        blank=True,
        null=True,
    )

    youtube_link = models.URLField(
        blank=True,
        null=True,
    )

    uploaded_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )

    is_published = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title