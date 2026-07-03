from rest_framework import serializers
from .models import Note


class NoteSerializer(serializers.ModelSerializer):
    uploaded_by_name = serializers.CharField(
        source="uploaded_by.username",
        read_only=True,
    )

    class Meta:
        model = Note
        fields = "__all__"

        read_only_fields = (
            "uploaded_by",
            "uploaded_by_name",
            "created_at",
        )