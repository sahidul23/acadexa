from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response


from .models import (
    DailyPractice,
    PracticeQuestion,
    PracticeSubmission,
    SubmissionImage,
)

from .serializers import (
    DailyPracticeSerializer,
    PracticeQuestionSerializer,
    PracticeSubmissionSerializer,
)


class DailyPracticeViewSet(viewsets.ModelViewSet):
    serializer_class = DailyPracticeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if user.role == "STUDENT":
            return DailyPractice.objects.filter(
                is_published=True
            ).order_by("-publish_date")

        return DailyPractice.objects.all().order_by(
            "-publish_date"
        )

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class PracticeQuestionViewSet(viewsets.ModelViewSet):
    serializer_class = PracticeQuestionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = PracticeQuestion.objects.all()

        practice = self.request.query_params.get("practice")

        if practice:
            queryset = queryset.filter(
                practice_id=practice
            )

        return queryset


class PracticeSubmissionViewSet(viewsets.ModelViewSet):
    serializer_class = PracticeSubmissionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if user.role == "STUDENT":
            return PracticeSubmission.objects.filter(
                student=user
            )

        return PracticeSubmission.objects.all()

    @action(detail=False, methods=["post"], url_path="upload")
    def upload(self, request):
        practice_id = request.data.get("practice")

        if not practice_id:
            return Response(
                {"error": "Practice ID is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        submission, created = PracticeSubmission.objects.get_or_create(
            practice_id=practice_id,
            student=request.user,
        )

        submission.images.all().delete()

        images = request.FILES.getlist("images")

        for image in images:
            SubmissionImage.objects.create(
                submission=submission,
                image=image,
            )

        serializer = PracticeSubmissionSerializer(submission)

        return Response(serializer.data)

    
    @action(detail=True, methods=["get"])
    def review(self, request, pk=None):
        submission = self.get_object()

        serializer = PracticeSubmissionSerializer(
            submission,
            context={"request": request},
        )

        return Response(serializer.data)

    @action(detail=True, methods=["post"])
    def evaluate(self, request, pk=None):
        submission = self.get_object()

        marks = request.data.get("total_marks")

        if marks is not None:
            submission.total_marks = float(marks)

        submission.feedback = request.data.get(
            "feedback",
            submission.feedback,
        )

        submission.status = "Checked"

        submission.save()

        serializer = PracticeSubmissionSerializer(
            submission,
            context={"request": request},
        )

        return Response(serializer.data)