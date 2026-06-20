from django.db import transaction
from accounts.models import User
from .models import StudentProfile, AcademicClass, Section


@transaction.atomic
def register_student(validated_data):
    # Create User
    user = User.objects.create_user(
        username=validated_data["username"],
        password=validated_data["password"],
        role=User.Role.STUDENT,
    )

    # Get Class and Section
    academic_class = AcademicClass.objects.get(
        id=validated_data["academic_class"]
    )

    section = Section.objects.get(
        id=validated_data["section"]
    )

    # Create Student Profile
    student = StudentProfile.objects.create(
        user=user,
        admission_number=validated_data["admission_number"],
        roll_number=validated_data["roll_number"],
        academic_class=academic_class,
        section=section,
        guardian_name=validated_data["guardian_name"],
        guardian_phone=validated_data["guardian_phone"],
    )

    return student