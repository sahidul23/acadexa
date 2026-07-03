from django.contrib import admin
from django.urls import path, include

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path("admin/", admin.site.urls),

    path("api/", include("authentication.urls")),

    path("api/students/", include("students.urls")),

    path(
        "api/token/",
        TokenObtainPairView.as_view(),
        name="token_obtain_pair",
    ),

    path(
        "api/token/refresh/",
        TokenRefreshView.as_view(),
        name="token_refresh",
    ),

    path("api/dashboard/", include("dashboard.urls")),
    path("api/tests/", include("tests.urls")),
    path("api/notes/", include("notes.urls")),

    path(
        "api/motivation/",
        include("motivation.urls"),
    ),

    path(
        "api/daily-practice/",
        include("daily_practice.urls"),
    ),
]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT,
    )