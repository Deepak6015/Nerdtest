from django.views.generic import ListView, DetailView, CreateView
from django.shortcuts import render

from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import AllowAny

from .models import (
    Product, Tag, ProductImage, ProductVideo, Variant
)

# Correct import path for serializers
from .api.serializers import (
    TagSerializer, ProductSerializer,
    ProductImageSerializer, ProductVideoSerializer,
    VariantSerializer
)

# -----------------------------
# Django HTML Views
# -----------------------------

class ProductListView(ListView):
    model = Product
    template_name = "product_list.html"
    context_object_name = "products"


class ProductDetailView(DetailView):
    model = Product
    template_name = "product_detail.html"


class ProductCreateView(CreateView):
    model = Product
    fields = ['name', 'price', 'stock']
    template_name = 'product_form.html'
    success_url = '/products/'


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ["name"]


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.prefetch_related("tags", "images", "videos", "variants").all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ["tags__name", "price", "stock"]
    search_fields = ["name", "description", "tags__name"]
    ordering_fields = ["price", "created_at", "stock"]
    ordering = ["-created_at"]


class VariantViewSet(viewsets.ModelViewSet):
    queryset = Variant.objects.select_related("product").all()
    serializer_class = VariantSerializer
    permission_classes = [AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ["sku", "name", "color", "size"]


class ProductImageViewSet(viewsets.ModelViewSet):
    queryset = ProductImage.objects.select_related("product").all()
    serializer_class = ProductImageSerializer
    permission_classes = [AllowAny]


class ProductVideoViewSet(viewsets.ModelViewSet):
    queryset = ProductVideo.objects.select_related("product").all()
    serializer_class = ProductVideoSerializer
    permission_classes = [AllowAny]