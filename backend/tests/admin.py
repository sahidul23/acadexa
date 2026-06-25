from django.contrib import admin
from .models import Test, Question, StudentAttempt, StudentAnswer


@admin.register(Test)
class TestAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "subject",
        "duration",
        "total_marks",
        "is_published",
    )

    list_filter = (
        "subject",
        "is_published",
    )

    search_fields = (
        "title",
    )


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "test",
        "difficulty",
        "marks",
        "negative_marks",
    )

    list_filter = (
        "difficulty",
        "test",
    )

    search_fields = (
        "question_text",
    )


admin.site.register(StudentAttempt)
admin.site.register(StudentAnswer)