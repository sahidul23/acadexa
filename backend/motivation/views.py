from datetime import date

from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import (
    MotivationVideo,
    MotivationWatch,
)

from .serializers import (
    MotivationVideoSerializer,
    MotivationWatchSerializer,
)


class MotivationVideoViewSet(viewsets.ModelViewSet):
    serializer_class = MotivationVideoSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        return {
            "request": self.request,
        }

    def get_queryset(self):
        user = self.request.user

        if user.role == "STUDENT":
            return MotivationVideo.objects.filter(
                is_active=True,
                publish_date=date.today(),
            )

        return MotivationVideo.objects.all().order_by(
            "-publish_date"
        )

    def perform_create(self, serializer):
        print("=" * 50)
        print("FILES:", self.request.FILES)
        print("DATA:", self.request.data)
        print("USER:", self.request.user)
        print("=" * 50)

        serializer.save(created_by=self.request.user)


class MotivationWatchViewSet(viewsets.ModelViewSet):
    serializer_class = MotivationWatchSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if user.role == "STUDENT":
            return MotivationWatch.objects.filter(
                student=user
            )

        return MotivationWatch.objects.all()

    @action(detail=False, methods=["post"])
    def complete(self, request):

        motivation_id = request.data.get(
            "motivation"
        )

        watch, created = MotivationWatch.objects.get_or_create(
            student=request.user,
            motivation_id=motivation_id,
        )

        watch.completed = True
        watch.camera_enabled = request.data.get(
            "camera_enabled",
            False,
        )

        watch.save()

        serializer = MotivationWatchSerializer(
            watch
        )

        return Response(serializer.data)