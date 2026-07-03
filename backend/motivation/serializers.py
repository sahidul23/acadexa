from rest_framework import serializers
from .models import MotivationVideo, MotivationWatch


class MotivationVideoSerializer(serializers.ModelSerializer):
    created_by_name = serializers.CharField(
        source="created_by.username",
        read_only=True,
    )

    video = serializers.SerializerMethodField()

    class Meta:
        model = MotivationVideo
        fields = "__all__"
        read_only_fields = (
            "created_by",
            "created_by_name",
            "created_at",
        )

    def get_video(self, obj):
        if not obj.video:
            return None

        request = self.context.get("request")

        if request:
            return request.build_absolute_uri(obj.video.url)

        return obj.video.url


class MotivationWatchSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(
        source="student.username",
        read_only=True,
    )

    video_title = serializers.CharField(
        source="motivation.title",
        read_only=True,
    )

    class Meta:
        model = MotivationWatch
        fields = "__all__"