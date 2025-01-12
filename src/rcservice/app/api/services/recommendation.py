
import warnings
warnings.filterwarnings('ignore')

import numpy as np
import pandas as pd

import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.metrics.pairwise import cosine_similarity

from sklearn.metrics import mean_squared_error
from ..models import ProductReviews, Users, Roles, Categories, ProductTags, Tags, Products
from ..serializers import Array1DSerializer

# Fetch all product_tags from database
def FetchAllProductTags():
    product_tags = ProductTags.objects.all().values('product__id', 'tag__id')
    result = []
    for ptag in product_tags:
        result.append([ptag['product__id'], ptag['tag__id']])
    return pd.DataFrame(result, columns=['product_id', 'tag_id'])

# Fetch all categoreis from database
def FetchAllCategories():
    categories = Categories.objects.all()
    result = []
    for category in categories:
        result.append(category.id)
    return result

# Fetch all tags from database
def FetchAllTags():
    tags = Tags.objects.all()
    result = []
    for tag in tags:
        result.append(tag.id)
    return result

# Fetch all products from database
def FetchAllProducts():
    proudcts = Products.objects.all()
    result = []
    for product in proudcts:
        result.append(product.id)
    return result
    

def FetchAllProductOfCategory(category_id):
    reviews = ProductReviews.objects.select_related('product').filter(product__category__id=category_id).values('product__id', 'rating')
    result = []
    for review in reviews:
        result.append([review['product__id'], review['rating']])
    return pd.DataFrame(result, columns=['product_id', 'rating'])

# Fetch data from database and create a dataframe
def FetchProductReviews():
    reviews = ProductReviews.objects.all()
    result = []
    for review in reviews:
        result.append([review.user.id, review.product.id, review.rating])
    return pd.DataFrame(result, columns=['user_id', 'product_id', 'rating'])

# Lấy danh sách các customer trong hệ thống
def FetchAllCustomers():
    role = Roles.objects.get(id=5)
    users = Users.objects.filter(role=role)
    return users

#-----------------------------------------------------------------#
# Pre-processing dataset
def PreProcessing(df : pd.DataFrame):
    # Chỉ lấy những uer có trên 2 đánh giá sản phẩm
    counts = df['user_id'].value_counts()
    df_final = df[df['user_id'].isin(counts[counts >= 1].index)]
    # Sắp xếp lại theo user_id tăng dần
    df_final.sort_values(by='user_id', ascending=True, inplace=True)
    
    df_final = df_final.groupby(['user_id', 'product_id'], as_index=False)['rating'].mean()
    
    # Tạo một ma trận user và product dựa trên rating
    final_ratings_matrix = df_final.pivot(index = 'user_id', columns ='product_id', values = 'rating').fillna(0)
    return final_ratings_matrix

# Calculate similar users
def similar_users(user_id, interactions_matrix):
    similarity = []
    users_id = interactions_matrix.index.tolist()
    # Tính toán similarity scores của user_id với từng user trong hệ thống
    for user in users_id:
        sim = cosine_similarity([interactions_matrix.loc[user_id]], [interactions_matrix.loc[user]])   
        similarity.append((user, sim))
    similarity.sort(key=lambda x: x[1], reverse=True)
    most_similar_users = [tup[0] for tup in similarity]
    similarity_score = [tup[1] for tup in similarity]
    
    most_similar_users.remove(user_id)
    similarity_score.remove(similarity_score[0])
    return most_similar_users, similarity_score

# Đề xuất danh sách sản phẩm
def collaborativeRecommendations(user_id, num_of_products, interactions_matrix):
    # Kiểm tra xem thử user_id có rating sản phẩm nào hay chưa
    if user_id not in interactions_matrix.index:
        return []
    # Tìm ra các user có hành vi tương tu với user_id
    most_similar_users = similar_users(user_id, interactions_matrix)[0]
    
    # Lấy danh sách các sản phẩm mà user_id đã tương tác
    prod_ids = set(list(interactions_matrix.columns[np.where(interactions_matrix.loc[user_id] > 0)]))
    recommendations = []
    
    observed_interactions = prod_ids.copy()
    for similar_user in most_similar_users:
        if len(recommendations) < num_of_products:
            # Lấy danh sách các sản phẩm mà user tương tự đã tương tác
            similar_user_prod_ids = set(list(interactions_matrix.columns[np.where(interactions_matrix.loc[similar_user] > 0)]))
            recommendations.extend(list(similar_user_prod_ids.difference(observed_interactions)))
            observed_interactions = observed_interactions.union(similar_user_prod_ids)
        else:
            break
    return recommendations

def collaborative_recommendations():
    # Lấy danh sách các đánh giá của sản phẩm
    reviews = FetchProductReviews()
    # Tạo ra ma trận dữ liệu quan hệ user và product trên rating
    final_rating = PreProcessing(reviews)
    # Lấy danh sách các user
    users = FetchAllCustomers()
    for user in users:
        # Lấy danh sách những sản phẩm đề xuất cho một user
        products = collaborativeRecommendations(user.id, 10, final_rating)
        result = ", ".join(map(str, products))
        Users.objects.filter(id=user.id).update(recommended_products=result)

#-----------------------------------------------------------------#
def similar_products(product_id, final_product_tags, n):
    similarity = []
    products_id = final_product_tags.index.tolist()
    for product in products_id:
        sim = cosine_similarity([final_product_tags.loc[product_id]], [final_product_tags.loc[product]])   
        similarity.append((product, sim))
    similarity.sort(key=lambda x: x[1], reverse=True)
    most_similar_products = [tup[0] for tup in similarity]
    similarity_score = [tup[1] for tup in similarity]
    
    most_similar_products.remove(product_id)
    similarity_score.remove(similarity_score[0])
    return most_similar_products, similarity_score

# Content-based preprocessing
def ContentBasedPreProcessing(product_tags : pd.DataFrame):
    tags = FetchAllTags()
    products = FetchAllProducts()
    
    df = pd.DataFrame(0, index=products, columns=tags)
    
    for _,row in product_tags.iterrows():
        df.loc[row['product_id'], row['tag_id']] = 1
    return df

def content_based_recommendations():
    # Lấy danh sách và trả về một dataframe các sản phẩm đã được gán tag
    product_tags = FetchAllProductTags()
    # Xử lí dữ liệu để tạo thành một ma trận mối quan hệ giữa sản phẩm và tags
    final_rating = ContentBasedPreProcessing(product_tags)
    # Lấy danh sách sản phẩm
    products = FetchAllProducts()
    for product in products:
        # Tìm ra top 5 sản phẩm tượng tự với sản phẩm đó
        similar_product = similar_products(product, final_rating, 10)[0][0:10]
        result = ", ".join(map(str, similar_product))
        Products.objects.filter(id=product).update(similar_products=result)
    

#-----------------------------------------------------------------#
# Rank-based preprocessing
def RankBasedPreProcessing(df : pd.DataFrame):
    average_rating = df.groupby('product_id').mean()['rating']
    count_rating = df.groupby('product_id').count()['rating']
    
    final_rating = pd.DataFrame({'avg_rating':average_rating, 'rating_count':count_rating})
    final_rating = final_rating.sort_values(by=['avg_rating', 'rating_count'],ascending=False)
    return final_rating

# Rank-based recommendations
def top_n_products(final_rating, n, min_interaction):
    recommendations_prod = final_rating[final_rating['rating_count']>min_interaction]
    
    #Sorting values w.r.t average rating 
    recommendations_prod = recommendations_prod.sort_values(by=['avg_rating', 'rating_count'], ascending=False)
    
    return recommendations_prod.index[:n]

# Tính top những sản phẩm nổi bật trong một danh mục sản phẩm
def rank_based_recommendations():
    # Lấy danh sách danh mục sản phẩm
    categories = FetchAllCategories()
    
    for category in categories:
        # Lấy danh sách các đánh giá của một danh mục sản phẩm
        review_df = FetchAllProductOfCategory(category)
        # Xử lí dữ liệu để tạo thành một ma trận đánh giá sản phẩm
        final_rating = RankBasedPreProcessing(review_df)
        # Lấy ra top 5 sản phẩm nổi bật trong danh mục
        top_products= top_n_products(final_rating, 10, 1)
        # Lưu vào trong bảng categories
        products = Array1DSerializer(top_products)
        result = ", ".join(map(str, products.data))
        Categories.objects.filter(id=category).update(top_products=result)
        
        
    

    


     