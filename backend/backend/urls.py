
# backend/urls.py

from django.contrib import admin
from django.urls import path, include  # Import include here

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('backapp.urls')),  # Make sure to replace 'your_app_name' with your actual app name
]

