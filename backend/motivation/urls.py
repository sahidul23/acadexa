from rest_framework.routers import DefaultRouter

from .views import (
    MotivationVideoViewSet,
    MotivationWatchViewSet,
)

router = DefaultRouter()

router.register(
    "videos",
    MotivationVideoViewSet,
    basename="motivation-videos",
)

router.register(
    "watch",
    MotivationWatchViewSet,
    basename="motivation-watch",
)

urlpatterns = router.urls