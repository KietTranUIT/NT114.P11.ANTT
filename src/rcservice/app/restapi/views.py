from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Products

class ProductList(APIView):
    def get(self, request):
        products = Products.objects.all()
        print(products)
        return Response('hello')
