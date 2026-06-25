from rest_framework.routers import DefaultRouter
from .views import TestViewSet, QuestionViewSet

router = DefaultRouter()

router.register("questions", QuestionViewSet, basename="questions")
router.register("", TestViewSet, basename="tests")

urlpatterns = router.urls