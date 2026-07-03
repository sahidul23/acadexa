from rest_framework.routers import DefaultRouter

from .views import (
    DailyPracticeViewSet,
    PracticeQuestionViewSet,
    PracticeSubmissionViewSet,
)

router = DefaultRouter()

router.register(
    "assignments",
    DailyPracticeViewSet,
    basename="assignments",
)

router.register(
    "questions",
    PracticeQuestionViewSet,
    basename="practice-questions",
)

router.register(
    "submissions",
    PracticeSubmissionViewSet,
    basename="practice-submissions",
)

urlpatterns = router.urls