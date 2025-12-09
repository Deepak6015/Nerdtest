from rest_framework import serializers
from ..models import Tag, Product, ProductImage, ProductVideo, Variant


# TAG SERIALIZER
class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["id", "name"]



# VARIANT SERIALIZER +
class VariantSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Variant
        fields = [
            "id", "product", "name", "sku",
            "color", "size", "price", "stock", "image"
        ]
        read_only_fields = ["product"]

    # VALIDATION
    def validate_price(self, value):
        if value < 0:
            raise serializers.ValidationError("Price cannot be negative.")
        return value

    def validate_stock(self, value):
        if value < 0:
            raise serializers.ValidationError("Stock cannot be negative.")
        return value

    def validate_image(self, value):
        if value:
            ext = value.name.split(".")[-1].lower()
            if ext not in ["png", "jpg", "jpeg"]:
                raise serializers.ValidationError(
                    "Variant image must be PNG, JPG, or JPEG."
                )
        return value

    def validate_sku(self, value):
        # Ensure SKU is unique across variants (serializer-level check for clearer errors)
        existing = Variant.objects.filter(sku=value)
        instance_id = getattr(self.instance, 'id', None)
        if instance_id:
            existing = existing.exclude(id=instance_id)
        if existing.exists():
            raise serializers.ValidationError("Variant SKU must be unique.")
        return value


# PRODUCT IMAGE SERIALIZER + VALIDATION

class ProductImageSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        write_only=True
    )
    image_url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = ProductImage
        fields = ["id", "product", "image", "image_url", "alt_text"]

    def validate_image(self, value):
        ext = value.name.split(".")[-1].lower()
        if ext not in ["png", "jpg", "jpeg"]:
            raise serializers.ValidationError("Only PNG, JPG, and JPEG allowed.")

        if value.size > 5 * 1024 * 1024:
            raise serializers.ValidationError("Image size cannot exceed 5MB.")

        return value

    def get_image_url(self, obj):
        request = self.context.get("request")
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return obj.image.url if obj.image else None



# PRODUCT VIDEO SERIALIZER 
class ProductVideoSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        write_only=True
    )
    video_url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = ProductVideo
        fields = ["id", "product", "video", "video_url", "caption"]

    def validate_video(self, value):
        ext = value.name.split(".")[-1].lower()
        if ext != "mp4":
            raise serializers.ValidationError("Only MP4 videos are allowed.")

        if value.size > 20 * 1024 * 1024:
            raise serializers.ValidationError("Video size cannot exceed 20MB.")

        return value

    def get_video_url(self, obj):
        request = self.context.get("request")
        if obj.video and request:
            return request.build_absolute_uri(obj.video.url)
        return obj.video.url if obj.video else None


# -----------------------------------------------------
# PRODUCT SERIALIZER (MAIN)
# -----------------------------------------------------
class ProductSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField()
    description = serializers.CharField(allow_blank=True, required=False)
    price = serializers.DecimalField(max_digits=10, decimal_places=2)
    stock = serializers.IntegerField()
    created_at = serializers.DateTimeField(read_only=True)

    # Accept tag IDs
    tags = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Tag.objects.all(),
        required=False
    )

    # Nested variants (write)
    variants = VariantSerializer(many=True, required=False)

    # Read-only nested media
    images = ProductImageSerializer(many=True, read_only=True)
    videos = ProductVideoSerializer(many=True, read_only=True)

    # FIELD VALIDATIONS
    def validate_name(self, value):
        if len(value) < 2:
            raise serializers.ValidationError(
                "Product name must be at least 2 characters long."
            )
        # Ensure uniqueness of product name (allow same name when updating the same instance)
        existing = Product.objects.filter(name=value)
        instance_id = getattr(self, 'instance', None)
        inst_id = instance_id.id if instance_id else None
        if inst_id:
            existing = existing.exclude(id=inst_id)
        if existing.exists():
            raise serializers.ValidationError("Product name must be unique.")

        return value

    def validate_price(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "Price must be greater than zero."
            )
        return value

    def validate_stock(self, value):
        if value < 0:
            raise serializers.ValidationError(
                "Stock cannot be negative."
            )
        return value

    def validate(self, attrs):
        # Validate that tags exist
        tags = attrs.get("tags", [])
        if tags and len(tags) != Tag.objects.filter(id__in=[t.id for t in tags]).count():
            raise serializers.ValidationError("One or more tag IDs are invalid.")

        return attrs


    # CREATE PRODUCT

    def create(self, validated_data):
        tags_data = validated_data.pop("tags", [])
        variants_data = validated_data.pop("variants", [])

        product = Product.objects.create(**validated_data)

        # Assign tags
        if tags_data:
            product.tags.set(tags_data)

        # Create variants
        for var in variants_data:
            Variant.objects.create(
                product=product,
                name=var.get("name", ""),
                sku=var.get("sku", ""),
                color=var.get("color", ""),
                size=var.get("size", ""),
                price=var.get("price", 0),
                stock=var.get("stock", 0),
            )

        return product

    # UPDATE PRODUCT
    def update(self, instance, validated_data):
        tags_data = validated_data.pop("tags", None)
        variants_data = validated_data.pop("variants", None)

        # Update basic fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Update tags
        if tags_data is not None:
            instance.tags.set(tags_data)

        # Replace all variants
        if variants_data is not None:
            instance.variants.all().delete()
            for var in variants_data:
                Variant.objects.create(
                    product=instance,
                    name=var.get("name", ""),
                    sku=var.get("sku", ""),
                    color=var.get("color", ""),
                    size=var.get("size", ""),
                    price=var.get("price", 0),
                    stock=var.get("stock", 0),
                )

        return instance

    def to_representation(self, instance):
        return {
            "id": instance.id,
            "name": instance.name,
            "description": instance.description,
            "price": str(instance.price),
            "stock": instance.stock,
            "created_at": instance.created_at,
            "tags": TagSerializer(instance.tags.all(), many=True, context=self.context).data,
            "variants": VariantSerializer(instance.variants.all(), many=True, context=self.context).data,
            # pass serializer context so nested serializers can build absolute URLs
            "images": ProductImageSerializer(instance.images.all(), many=True, context=self.context).data,
            "videos": ProductVideoSerializer(instance.videos.all(), many=True, context=self.context).data,
        }
