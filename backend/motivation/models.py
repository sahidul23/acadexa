from django.db import models
from django.conf import settings


class MotivationVideo(models.Model):
    TARGET_CHOICES = [
        ("ALL", "All Students"),
        ("1-5", "Class 1-5"),
        ("6-8", "Class 6-8"),
        ("9-10", "Class 9-10"),
        ("11-12", "Class 11-12"),
    ]

    title = models.CharField(max_length=200)

    description = models.TextField(blank=True)

    video = models.FileField(
        upload_to="motivation_videos/",
        blank=True,
        null=True,
    )

    youtube_link = models.URLField(
        blank=True,
        null=True,
    )

    publish_date = models.DateField()

    target_class = models.CharField(
        max_length=20,
        choices=TARGET_CHOICES,
        default="ALL",
    )

    is_active = models.BooleanField(default=True)

    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    def __str__(self):
        return self.title


class MotivationWatch(models.Model):
    student = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )

    motivation = models.ForeignKey(
        MotivationVideo,
        on_delete=models.CASCADE,
    )

    watched_at = models.DateTimeField(
        auto_now_add=True,
    )

    completed = models.BooleanField(
        default=False,
    )

    camera_enabled = models.BooleanField(
        default=False,
    )

    class Meta:
        unique_together = (
            "student",
            "motivation",
        )

    def __str__(self):
        return f"{self.student.username} - {self.motivation.title}"