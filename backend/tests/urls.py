from rest_framework.routers import DefaultRouter
from .views import (
    TestViewSet,
    QuestionViewSet,
    ResultViewSet,
)

router = DefaultRouter()

# Register specific routes FIRST
router.register(
    "questions",
    QuestionViewSet,
    basename="questions",
)

router.register(
    "results",
    ResultViewSet,
    basename="results",
)

# Register tests LAST
router.register(
    "",
    TestViewSet,
    basename="tests",
)

urlpatterns = router.urls