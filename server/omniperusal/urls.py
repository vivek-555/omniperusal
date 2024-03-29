"""omniperusal URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from django.conf import settings
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from omniperusal.user import views, social_auth
from omniperusal.task.views import TaskViewSet

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'tasks', TaskViewSet)

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^docs/', include_docs_urls(title='omniperusal APIs')),
]

api_urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
    url(r'^rest-auth/facebook/$', social_auth.FacebookLogin.as_view(), name='fb_login'),
    url(r'^rest-auth/google/$', social_auth.GoogleLogin.as_view(), name='google_login'),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^rest-auth/', include('rest_auth.urls')),
]

urlpatterns += [
    url(r'^api/v1/', include(api_urlpatterns, namespace='v1')),
    url(r'^accounts/', include('allauth.urls')),
]

if settings.DEBUG:
    import debug_toolbar

    urlpatterns += [
        url(r'^__debug__/', include(debug_toolbar.urls)),
    ]
