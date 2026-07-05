from django.db import models
from django.conf import settings


class Test(models.Model):
    SUBJECT_CHOICES = [
        ("Physics", "Physics"),
        ("Chemistry", "Chemistry"),
        ("Mathematics", "Mathematics"),
        ("Biology", "Biology"),
        ("English", "English")
    ]

    title = models.CharField(max_length=200)

    subject = models.CharField(
        max_length=30,
        choices=SUBJECT_CHOICES
    )

    chapter = models.CharField(max_length=150)

    duration = models.PositiveIntegerField(
        help_text="Duration in minutes"
    )

    total_marks = models.PositiveIntegerField(default=0)

    is_published = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Question(models.Model):

    ANSWER_CHOICES = [
        ("A", "A"),
        ("B", "B"),
        ("C", "C"),
        ("D", "D"),
    ]

    DIFFICULTY_CHOICES = [
        ("Easy", "Easy"),
        ("Medium", "Medium"),
        ("Hard", "Hard"),
    ]

    test = models.ForeignKey(
        Test,
        on_delete=models.CASCADE,
        related_name="questions"
    )

    question_text = models.TextField()

    option_a = models.CharField(max_length=255)
    option_b = models.CharField(max_length=255)
    option_c = models.CharField(max_length=255)
    option_d = models.CharField(max_length=255)

    correct_answer = models.CharField(
        max_length=1,
        choices=ANSWER_CHOICES
    )

    marks = models.PositiveIntegerField(default=4)

    negative_marks = models.FloatField(default=1)

    difficulty = models.CharField(
        max_length=20,
        choices=DIFFICULTY_CHOICES,
        default="Medium"
    )

    explanation = models.TextField(
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.question_text[:50]


class StudentAttempt(models.Model):
    student = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )

    test = models.ForeignKey(
        Test,
        on_delete=models.CASCADE
    )

    score = models.PositiveIntegerField(default=0)

    total_questions = models.PositiveIntegerField(default=0)

    correct_answers = models.PositiveIntegerField(default=0)

    wrong_answers = models.PositiveIntegerField(default=0)

    unanswered = models.PositiveIntegerField(default=0)

    percentage = models.FloatField(default=0)

    started_at = models.DateTimeField(auto_now_add=True)

    submitted_at = models.DateTimeField(
        null=True,
        blank=True
    )

    class Meta:
        unique_together = ("student", "test")

    def __str__(self):
        return f"{self.student.username} - {self.test.title}"


class StudentAnswer(models.Model):
    attempt = models.ForeignKey(
        StudentAttempt,
        on_delete=models.CASCADE,
        related_name="answers"
    )

    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE
    )

    selected_answer = models.CharField(
        max_length=1,
        choices=Question.ANSWER_CHOICES
    )

    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.attempt.student.username} - Q{self.question.id}"
    

