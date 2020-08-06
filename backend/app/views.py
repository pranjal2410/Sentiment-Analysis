from rest_framework.generics import CreateAPIView

from .models import User
from .serliazers import UserSerializer


class RegisterView(CreateAPIView):
    model = User
    serializer_class = UserSerializer
