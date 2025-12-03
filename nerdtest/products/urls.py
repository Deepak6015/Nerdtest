from django.urls import path,include
from .views import ProductListView,ProductDetailView,ProductCreateView

urlpatterns = [
    path('', ProductListView.as_view(), name='product_list'),
    path('<int:pk>/', ProductDetailView.as_view(), name='product_detail'),
    path('add/', ProductCreateView.as_view(), name='product_add'),
]
