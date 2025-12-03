from rest_framework import serializers
from ..models import Tag, Product, ProductImage, ProductVideo, Variant

# Simple Tag serializer
class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["id", "name"]


# Variant as ModelSerializer (used for nested create/read)
class VariantSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Variant
        fields = ["id", "product", "name", "sku", "color", "size", "price", "stock", "image"]
        read_only_fields = ["product"]  # product will be set by ProductSerializer.create when nested


# ProductImage: allow product write (for direct upload)
class ProductImageSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all(), write_only=True)
    image_url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = ProductImage
        fields = ["id", "product", "image", "image_url", "alt_text"]

    def get_image_url(self, obj):
        request = self.context.get("request")
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        if obj.image:
            return obj.image.url
        return None


# ProductVideo: allow product write (for direct upload)
class ProductVideoSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all(), write_only=True)
    video_url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = ProductVideo
        fields = ["id", "product", "video", "video_url", "caption"]

    def get_video_url(self, obj):
        request = self.context.get("request")
        if obj.video and request:
            return request.build_absolute_uri(obj.video.url)
        if obj.video:
            return obj.video.url
        return None


# Product serializer: accepts tag IDs and nested variants (create/update)
class ProductSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField()
    description = serializers.CharField(allow_blank=True, required=False)
    price = serializers.DecimalField(max_digits=10, decimal_places=2)
    stock = serializers.IntegerField()
    created_at = serializers.DateTimeField(read_only=True)

    # Accept tags as list of IDs (PrimaryKeyRelatedField)
    tags = serializers.PrimaryKeyRelatedField(many=True, queryset=Tag.objects.all(), required=False)

    # Nested variants (list of objects) — used for creating/updating variants in bulk
    variants = VariantSerializer(many=True, required=False)

    # Read-only nested media/variants for responses
    images = ProductImageSerializer(many=True, read_only=True)
    videos = ProductVideoSerializer(many=True, read_only=True)
    # variants field above is used for both write and read; for read, we'll return serialized variants via to_representation

    def create(self, validated_data):
        tags_data = validated_data.pop("tags", [])
        variants_data = validated_data.pop("variants", [])

        # create product
        product = Product.objects.create(**validated_data)

        # set tags (PrimaryKeyRelatedField returns Tag instances)
        if tags_data:
            product.tags.set(tags_data)

        # create variants (associate product)
        for var in variants_data:
            # var may include id (ignored for create) or image (file) - image should be handled separately
            Variant.objects.create(product=product,
                                   name=var.get("name", ""),
                                   sku=var.get("sku", ""),
                                   color=var.get("color", ""),
                                   size=var.get("size", ""),
                                   price=var.get("price", 0),
                                   stock=var.get("stock", 0),
                                   )

        return product

    def update(self, instance, validated_data):
        tags_data = validated_data.pop("tags", None)
        variants_data = validated_data.pop("variants", None)

        # update primitive fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # tags: replace if provided
        if tags_data is not None:
            instance.tags.set(tags_data)

        # variants: replace strategy - delete existing and recreate
        if variants_data is not None:
            instance.variants.all().delete()
            for var in variants_data:
                Variant.objects.create(product=instance,
                                       name=var.get("name", ""),
                                       sku=var.get("sku", ""),
                                       color=var.get("color", ""),
                                       size=var.get("size", ""),
                                       price=var.get("price", 0),
                                       stock=var.get("stock", 0),
                                       )

        return instance 

    def to_representation(self, instance):
        # Build the nested representation
        return {
            "id": instance.id,
            "name": instance.name,
            "description": instance.description,
            "price": str(instance.price),
            "stock": instance.stock,
            "created_at": instance.created_at,
            "tags": TagSerializer(instance.tags.all(), many=True).data,
            "variants": VariantSerializer(instance.variants.all(), many=True, context=self.context).data,
            "images": ProductImageSerializer(instance.images.all(), many=True, context=self.context).data,
            "videos": ProductVideoSerializer(instance.videos.all(), many=True, context=self.context).data,
        }


