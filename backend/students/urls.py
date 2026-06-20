from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import StudentViewSet, StudentRegisterAPIView

router = DefaultRouter()
router.register("", StudentViewSet, basename="students")

urlpatterns = [
    path("register/", StudentRegisterAPIView.as_view(), name="student-register"),
]

urlpatterns += router.urls