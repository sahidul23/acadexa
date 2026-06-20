from rest_framework import serializers
from .models import StudentProfile

class StudentProfileSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source="user.username", read_only=True)
    class_name = serializers.StringRelatedField(source="academic_class", read_only=True)
    section_name = serializers.StringRelatedField(source="section", read_only=True)

    class Meta:
        model = StudentProfile
        fields = [
            "id",
            "student_name",
            "admission_number",
            "roll_number",
            "class_name",
            "section_name",
            "guardian_name",
            "guardian_phone",
        ]