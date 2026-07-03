from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone

from .models import (
    Test,
    Question,
    StudentAttempt,
    StudentAnswer,
)

from .serializers import (
    TestSerializer,
    AdminQuestionSerializer,
    StudentQuestionSerializer,
    StudentResultSerializer,
    AdminResultSerializer,
)


from .serializers import (
    TestSerializer,
    AdminQuestionSerializer,
    StudentQuestionSerializer,
    StudentResultSerializer,
    AdminResultSerializer,
    ResultReviewSerializer,   # <-- add this
)


class TestViewSet(viewsets.ModelViewSet):
    queryset = Test.objects.all()
    serializer_class = TestSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=["post"], url_path="submit")
    def submit_exam(self, request, pk=None):
        test = self.get_object()

        answers = request.data.get("answers", {})
        questions = Question.objects.filter(test=test)

        score = 0
        correct = 0
        wrong = 0
        unanswered = 0

        attempt, created = StudentAttempt.objects.get_or_create(
            student=request.user,
            test=test,
        )

        # Delete previous answers
        attempt.answers.all().delete()

        for question in questions:

            selected = answers.get(str(question.id))

            if not selected:
                unanswered += 1
                continue

            is_correct = selected == question.correct_answer

            StudentAnswer.objects.create(
                attempt=attempt,
                question=question,
                selected_answer=selected,
                is_correct=is_correct,
            )

            if is_correct:
                score += question.marks
                correct += 1
            else:
                score -= question.negative_marks
                wrong += 1

        total_questions = questions.count()

        percentage = (
            (correct / total_questions) * 100
            if total_questions
            else 0
        )

        attempt.score = max(score, 0)
        attempt.correct_answers = correct
        attempt.wrong_answers = wrong
        attempt.unanswered = unanswered
        attempt.total_questions = total_questions
        attempt.percentage = round(percentage, 2)
        attempt.submitted_at = timezone.now()

        attempt.save()

        return Response(
            {
                "attempt_id": attempt.id,
                "score": attempt.score,
                "correct": correct,
                "wrong": wrong,
                "unanswered": unanswered,
                "percentage": attempt.percentage,
            },
            status=status.HTTP_200_OK,
        )


class QuestionViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Question.objects.all()

        test_id = self.request.query_params.get("test")

        if test_id:
            queryset = queryset.filter(test_id=test_id)

        return queryset

    def get_serializer_class(self):
        user = self.request.user

        if getattr(user, "role", None) == "STUDENT":
            return StudentQuestionSerializer

        return AdminQuestionSerializer


class ResultViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if user.role == "STUDENT":
            return StudentAttempt.objects.filter(
                student=user
            ).order_by("-submitted_at")

        return StudentAttempt.objects.all().order_by("-submitted_at")

    def get_serializer_class(self):
        if self.request.user.role == "STUDENT":
            return StudentResultSerializer

        return AdminResultSerializer

    @action(detail=True, methods=["get"])
    def details(self, request, pk=None):
        attempt = self.get_object()

        if (
            request.user.role == "STUDENT"
            and attempt.student != request.user
        ):
            return Response(
                {"error": "Permission denied"},
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = self.get_serializer(attempt)
        return Response(serializer.data)

    @action(detail=True, methods=["get"])
    def review(self, request, pk=None):
        attempt = self.get_object()

        if (
            request.user.role == "STUDENT"
            and attempt.student != request.user
        ):
            return Response(
                {"error": "Permission denied"},
                status=status.HTTP_403_FORBIDDEN,
            )

        answers = attempt.answers.select_related("question")

        serializer = ResultReviewSerializer(
            answers,
            many=True,
        )

        return Response(serializer.data)