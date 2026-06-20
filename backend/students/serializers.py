
from rest_framework import serializers
from .models import StudentProfile

class StudentProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentProfile
        fields = [
            "id",
            "user",
            "admission_number",
            "roll_number",
            "academic_class",
            "section",
            "guardian_name",
            "guardian_phone",
        ]