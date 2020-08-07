from django.contrib.auth import authenticate
from rest_framework.generics import CreateAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework_jwt.settings import api_settings

from .serliazers import RegisterSerializer, LoginSerializer, EditSerializer
from .models import User

JWT_PAYLOAD_HANDLER = api_settings.JWT_PAYLOAD_HANDLER
JWT_ENCODE_HANDLER = api_settings.JWT_ENCODE_HANDLER


class RegisterView(CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()
            user = authenticate(username=request.data['email'], password=request.data['password'])
            payload = JWT_PAYLOAD_HANDLER(user)
            jwt_token = JWT_ENCODE_HANDLER(payload)
            response = {
                'success': 'True',
                'status code': status.HTTP_201_CREATED,
                'message': 'User registered successfully',
                'token': jwt_token
            }

            return Response(response, status=status.HTTP_201_CREATED)
        else:
            response = {
                'success': 'False',
                'status code': status.HTTP_401_UNAUTHORIZED,
                'message': 'User Already Registered!',
            }
            return Response(response, status=status.HTTP_401_UNAUTHORIZED)


class LoginView(CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            response = {
                'success': 'True',
                'status code': status.HTTP_200_OK,
                'message': 'User logged in successfully',
                'token': serializer.data['token'],
            }
            status_code = status.HTTP_200_OK

            return Response(response, status=status_code)
        else:
            response = {
                'success': 'False',
                'status code': status.HTTP_401_UNAUTHORIZED,
                'message': 'Invalid Credentials! Please try again',
            }
            return Response(response, status=status.HTTP_401_UNAUTHORIZED)


class ProfileView(RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    authentication_class = (JSONWebTokenAuthentication,)

    def get(self, request):
        try:
            user_profile = User.objects.get(username=request.user)
            status_code = status.HTTP_200_OK
            response = {
                'success': 'true',
                'status code': status_code,
                'message': 'User profile fetched successfully',
                'data': [{
                    'email': user_profile.email,
                    'first_name': user_profile.first_name,
                    'last_name': user_profile.last_name,
                    'city': user_profile.city,
                    'state': user_profile.state,
                    'twitter': user_profile.twitter
                }]
            }

        except Exception as e:
            status_code = status.HTTP_400_BAD_REQUEST
            response = {
                'success': 'false',
                'status code': status.HTTP_400_BAD_REQUEST,
                'message': 'User does not exists',
                'error': str(e)
            }
        return Response(response, status=status_code)


class EditView(APIView):
    serializer_class = EditSerializer
    permission_classes = (IsAuthenticated,)
    authentication_classes = (JSONWebTokenAuthentication,)

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.update(User.objects.get(username=request.user), request.data)
            response = {
                'success': 'True',
                'status code': status.HTTP_200_OK,
            }
            status_code = status.HTTP_200_OK

            return Response(response, status=status_code)
        else:
            response = {
                'success': 'False',
                'status code': status.HTTP_401_UNAUTHORIZED,
            }
            return Response(response, status=status.HTTP_401_UNAUTHORIZED)
