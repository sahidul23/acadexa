from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Note
from .serializers import NoteSerializer


class NoteViewSet(viewsets.ModelViewSet):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        user = self.request.user

        # Students only see published notes
        if user.role == "STUDENT":
            return Note.objects.filter(
                is_published=True
            ).order_by("-created_at")

        # Admin sees all notes
        return Note.objects.all().order_by("-created_at")

    def perform_create(self, serializer):
        serializer.save(uploaded_by=self.request.user)