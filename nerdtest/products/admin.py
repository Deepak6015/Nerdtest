from django.contrib import admin

# Register your models here.
from .models import Tag, Product, ProductImage, ProductVideo, Variant


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1


class ProductVideoInline(admin.TabularInline):
    model = ProductVideo
    extra = 1


class VariantInline(admin.TabularInline):
    model = Variant
    extra = 1
    fields = ('name', 'sku', 'color', 'size', 'price', 'stock', 'image')


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'price', 'stock', 'created_at')
    search_fields = ('name', 'description')
    list_filter = ('created_at',)
    inlines = [ProductImageInline, ProductVideoInline, VariantInline]
    filter_horizontal = ('tags',)  # nice multi-select for tags


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)


@admin.register(Variant)
class VariantAdmin(admin.ModelAdmin):
    list_display = ('id', 'product', 'name', 'sku', 'price', 'stock')
    search_fields = ('sku', 'name', 'product__name')


@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ('id', 'product', 'alt_text')


@admin.register(ProductVideo)
class ProductVideoAdmin(admin.ModelAdmin):
    list_display = ('id', 'product', 'caption')
