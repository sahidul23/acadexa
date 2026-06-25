from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from students.models import StudentProfile
from teachers.models import TeacherProfile


class DashboardStatsAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        data = {
            "students": StudentProfile.objects.count(),
            "teachers": TeacherProfile.objects.count(),
            "tests": 0,
            "notes": 0,
        }

        return Response(data)