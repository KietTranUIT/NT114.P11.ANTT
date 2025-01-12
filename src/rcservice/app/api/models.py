from django.db import models

# Create your models here.
class Brands(models.Model):
    name = models.CharField(unique=True, max_length=255)
    description = models.TextField(blank=True, null=True)
    logo = models.CharField(max_length=255, blank=True, null=True)
    slug = models.CharField(unique=True, max_length=255)
    website = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'brands'
        
class Categories(models.Model):
    name = models.CharField(unique=True, max_length=50)
    description = models.TextField(max_length=255, blank=True, null=True)
    slug = models.CharField(unique=True, max_length=100)
    parent = models.ForeignKey('self', models.DO_NOTHING, blank=True, null=True)
    icon = models.TextField(blank=True, null=True)
    top_products = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'categories'
        
class ProductReviews(models.Model):
    product = models.ForeignKey('Products', models.DO_NOTHING)
    user = models.ForeignKey('Users', models.DO_NOTHING)
    rating = models.IntegerField(blank=True, null=True)
    content = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'product_reviews'

class ProductTags(models.Model):
    product = models.ForeignKey('Products', models.DO_NOTHING, blank=True, null=True)
    tag = models.ForeignKey('Tags', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'product_tags'
        
class Products(models.Model):
    name = models.CharField(unique=True, max_length=1000)
    description = models.TextField(blank=True, null=True)
    slug = models.CharField(unique=True, max_length=1000)
    status = models.TextField(blank=True, null=True)  # This field type is a guess.
    brand = models.ForeignKey(Brands, models.DO_NOTHING, blank=True, null=True)
    category = models.ForeignKey(Categories, models.DO_NOTHING, blank=True, null=True)
    regular_price = models.FloatField()
    sale_price = models.FloatField(blank=True, null=True)
    start_sale = models.DateTimeField(blank=True, null=True)
    end_sale = models.DateTimeField(blank=True, null=True)
    stock = models.IntegerField(blank=True, null=True)
    review_allowed = models.BooleanField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)
    rating = models.FloatField(blank=True, null=True)
    discount = models.FloatField(blank=True, null=True)
    similar_products = models.CharField(max_length=255, blank=True, null=True)
    type_discount = models.TextField(blank=True, null=True)  # This field type is a guess.

    class Meta:
        managed = False
        db_table = 'products'
        
class Roles(models.Model):
    name = models.CharField(unique=True, max_length=10)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'roles'

class Tags(models.Model):
    name = models.CharField(unique=True, max_length=255)
    description = models.TextField(blank=True, null=True)
    slug = models.CharField(unique=True, max_length=255)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tags'
        
class Users(models.Model):
    email = models.CharField(unique=True, max_length=254)
    phone_number = models.CharField(unique=True, max_length=11, blank=True, null=True)
    full_name = models.CharField(max_length=100)
    day_of_birth = models.DateField(blank=True, null=True)
    password = models.CharField(max_length=100, blank=True, null=True)
    recommended_products = models.CharField(max_length=255, blank=True, null=True)
    oauth_token = models.CharField(blank=True, null=True)
    status = models.TextField(blank=True, null=True)  # This field type is a guess.
    role = models.ForeignKey(Roles, models.DO_NOTHING)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'users'