
from django.shortcuts import render

from django.views.generic import TemplateView
from django.views import View
from django.http import HttpResponse

class HomeView(View):
    def get(self, request):
        return HttpResponse("Hello from Class-Based View!")

class IndexView(TemplateView):
    template_name = "index.html"