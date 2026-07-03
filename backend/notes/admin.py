from django.contrib import admin
from .models import Note


@admin.register(Note)
class NoteAdmin(admin.ModelAdmin):

    list_display = (
        "title",
        "subject",
        "chapter",
        "is_published",
        "created_at",
    )

    list_filter = (
        "subject",
        "is_published",
    )

    search_fields = (
        "title",
        "chapter",
    )