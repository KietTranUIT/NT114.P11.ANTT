from django.urls import path
from .views import RankBasedRecommendation, ContentBasedRecommendation, CollaborativeRecommendation

urlpatterns = [
    path('rankbased/', RankBasedRecommendation.as_view(), name='rankbased'),
    path('contentbased/', ContentBasedRecommendation.as_view(), name='contentbased'),
    path('collaborative/', CollaborativeRecommendation.as_view(), name='collaborative'),
]