from django.db import models

class Tag(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField()
    url = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    tags = models.ManyToManyField(Tag, related_name="products", blank=True)

    def __str__(self):
        return self.name


class ProductImage(models.Model):
    product = models.ForeignKey(
        Product,
        related_name="images",
        on_delete=models.CASCADE
    )
    image = models.ImageField(upload_to="products/images/")
    alt_text = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f"Image of {self.product.name}"


class ProductVideo(models.Model):
    product = models.ForeignKey(
        Product,
        related_name="videos",
        on_delete=models.CASCADE
    )
    video = models.FileField(upload_to="products/videos/")
    caption = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f"Video of {self.product.name}"


class Variant(models.Model):
    product = models.ForeignKey(
        Product,
        related_name="variants",
        on_delete=models.CASCADE
    )
    name = models.CharField(max_length=255)
    sku = models.CharField(max_length=255)
    color = models.CharField(max_length=100, blank=True)
    size = models.CharField(max_length=100, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField()
    image = models.ImageField(upload_to="products/variants/", blank=True, null=True)

    def __str__(self):
        return f"{self.name} ({self.product.name})"
