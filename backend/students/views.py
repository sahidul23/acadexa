from rest_framework import viewsets
from .models import StudentProfile
from .serializers import StudentProfileSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import StudentRegisterSerializer
from .services import register_student

class StudentViewSet(viewsets.ModelViewSet):
    queryset = StudentProfile.objects.all()
    serializer_class = StudentProfileSerializer
    permission_classes = [IsAuthenticated]


class StudentRegisterAPIView(APIView):

    def post(self, request):
        serializer = StudentRegisterSerializer(data=request.data)

        if serializer.is_valid():
            student = register_student(serializer.validated_data)

            return Response(
                {
                    "message": "Student registered successfully",
                    "student_id": student.id,
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)