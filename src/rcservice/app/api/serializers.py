from rest_framework import serializers
from .models import Products, ProductReviews, Users

class ProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = '__all__'
        
class ProductReviewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductReviews
        fields = '__all__'

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'
        
class Array1DSerializer(serializers.ListSerializer):
    child = serializers.IntegerField() 
    
class Array2DSerializer(serializers.Serializer):
    array_2d = Array1DSerializer(many=True)