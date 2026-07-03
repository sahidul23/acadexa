from django.db import models
from django.conf import settings


class DailyPractice(models.Model):
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

    description = models.TextField(blank=True)

    publish_date = models.DateField()

    submission_deadline = models.DateTimeField()

    is_published = models.BooleanField(default=False)

    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class PracticeQuestion(models.Model):
    practice = models.ForeignKey(
        DailyPractice,
        on_delete=models.CASCADE,
        related_name="questions",
    )

    question_text = models.TextField()

    marks = models.PositiveIntegerField(default=5)

    order = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.practice.title} - Q{self.order}"


class PracticeSubmission(models.Model):
    STATUS_CHOICES = [
        ("Pending", "Pending"),
        ("Checked", "Checked"),
    ]

    practice = models.ForeignKey(
        DailyPractice,
        on_delete=models.CASCADE,
    )

    student = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )

    submitted_at = models.DateTimeField(auto_now_add=True)

    total_marks = models.FloatField(
        default=0
    )

    feedback = models.TextField(
        blank=True
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="Pending",
    )

    class Meta:
        unique_together = (
            "practice",
            "student",
        )

    def __str__(self):
        return f"{self.student.username} - {self.practice.title}"


class SubmissionImage(models.Model):
    submission = models.ForeignKey(
        PracticeSubmission,
        on_delete=models.CASCADE,
        related_name="images",
    )

    image = models.ImageField(
        upload_to="practice_submissions/"
    )

    def __str__(self):
        return f"Image {self.id}"