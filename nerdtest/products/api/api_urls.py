from django.urls import path, include
from rest_framework.routers import DefaultRouter

from products.views import (
    TagViewSet, ProductViewSet, VariantViewSet,
    ProductImageViewSet, ProductVideoViewSet
)

router = DefaultRouter()
router.register(r"tags", TagViewSet)
router.register(r"products", ProductViewSet)
router.register(r"variants", VariantViewSet)
router.register(r"product-images", ProductImageViewSet)
router.register(r"product-videos", ProductVideoViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
