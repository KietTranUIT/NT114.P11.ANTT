from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Products
from .services.recommendation import rank_based_recommendations, content_based_recommendations, collaborative_recommendations
    
class RankBasedRecommendation(APIView):
    def get(self, request):
        rank_based_recommendations()
        return Response('Rank based recommendation is successfully executed')

class ContentBasedRecommendation(APIView):
    def get(self, request):
        content_based_recommendations()
        return Response('Content based recommendation is successfully executed')
    
class CollaborativeRecommendation(APIView):
    def get(self, request):
        collaborative_recommendations()
        return Response('Collaborative recommendation is successfully executed')
        
        
        
        
