from rest_framework import serializers
from .models import (
    DailyPractice,
    PracticeQuestion,
    PracticeSubmission,
    SubmissionImage,
)


class PracticeQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PracticeQuestion
        fields = "__all__"


class SubmissionImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    class Meta:
        model = SubmissionImage
        fields = "__all__"
    def get_image(self, obj):
        request = self.context.get("request")
        if request:
            return request.build_absolute_uri(obj.image.url)
        return obj.image.url


class DailyPracticeSerializer(serializers.ModelSerializer):
    questions = PracticeQuestionSerializer(
        many=True,
        read_only=True,
    )

    created_by_name = serializers.CharField(
        source="created_by.username",
        read_only=True,
    )

    class Meta:
        model = DailyPractice
        fields = "__all__"

        read_only_fields = (
            "created_by",
            "created_by_name",
            "created_at",
        )


class PracticeSubmissionSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(
        source="student.username",
        read_only=True,
    )

    practice_title = serializers.CharField(
    source="practice.title",
    read_only=True,
)

    images = SubmissionImageSerializer(
        many=True,
        read_only=True,
    )
    total_assignment_marks = serializers.SerializerMethodField()
    percentage = serializers.SerializerMethodField()
    class Meta:
        model = PracticeSubmission
        fields = "__all__"

    def get_total_assignment_marks(self, obj):
        return sum(
            question.marks
            for question in obj.practice.questions.all()
        )

    def get_percentage(self, obj):
        total = self.get_total_assignment_marks(obj)

        if total == 0:
            return 0

        return round(
            (obj.total_marks / total) * 100,
            2,
        )