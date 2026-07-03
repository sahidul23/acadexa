from rest_framework import serializers

from .models import (
    Test,
    Question,
    StudentAttempt,
)


class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = "__all__"


# ==========================
# Question Serializers
# ==========================

# Admin serializer (includes answer key)
class AdminQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = "__all__"


# Student serializer (hides answer key)
class StudentQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        exclude = [
            "correct_answer",
            "explanation",
        ]


# Used by existing admin CRUD
class QuestionSerializer(AdminQuestionSerializer):
    pass


# ==========================
# Student Result Serializer
# ==========================

class StudentResultSerializer(serializers.ModelSerializer):
    test_title = serializers.CharField(
        source="test.title",
        read_only=True
    )

    class Meta:
        model = StudentAttempt
        fields = [
            "id",
            "test",
            "test_title",
            "score",
            "correct_answers",
            "wrong_answers",
            "unanswered",
            "total_questions",
            "percentage",
            "started_at",
            "submitted_at",
        ]


# ==========================
# Admin Result Serializer
# ==========================

class AdminResultSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(
        source="student.username",
        read_only=True
    )

    test_title = serializers.CharField(
        source="test.title",
        read_only=True
    )

    class Meta:
        model = StudentAttempt
        fields = [
            "id",
            "student_name",
            "test_title",
            "score",
            "percentage",
            "correct_answers",
            "wrong_answers",
            "unanswered",
            "total_questions",
            "started_at",
            "submitted_at",
        ]



# ==========================
# Result Review Serializer
# ==========================

from .models import StudentAnswer


class ResultReviewSerializer(serializers.ModelSerializer):
    question_text = serializers.CharField(
        source="question.question_text",
        read_only=True,
    )

    option_a = serializers.CharField(
        source="question.option_a",
        read_only=True,
    )

    option_b = serializers.CharField(
        source="question.option_b",
        read_only=True,
    )

    option_c = serializers.CharField(
        source="question.option_c",
        read_only=True,
    )

    option_d = serializers.CharField(
        source="question.option_d",
        read_only=True,
    )

    correct_answer = serializers.CharField(
        source="question.correct_answer",
        read_only=True,
    )

    explanation = serializers.CharField(
        source="question.explanation",
        read_only=True,
    )

    marks = serializers.IntegerField(
        source="question.marks",
        read_only=True,
    )

    negative_marks = serializers.FloatField(
        source="question.negative_marks",
        read_only=True,
    )

    difficulty = serializers.CharField(
        source="question.difficulty",
        read_only=True,
    )

    class Meta:
        model = StudentAnswer
        fields = [
            "id",
            "question_text",
            "option_a",
            "option_b",
            "option_c",
            "option_d",
            "selected_answer",
            "correct_answer",
            "is_correct",
            "explanation",
            "marks",
            "negative_marks",
            "difficulty",
        ]