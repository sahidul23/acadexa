from django.contrib import admin
from .models import AcademicClass, Section, Subject

admin.site.register(AcademicClass)
admin.site.register(Section)
admin.site.register(Subject)