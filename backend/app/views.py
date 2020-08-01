from rest_framework import status
from rest_framework.views import APIView
from rest_framework.views import Response


from . import  serliazers
from . import models


class HelloView(APIView):
    serliazers_class = serliazers.HelloSerializer

    def get(self, request):
        api_view = [
            'blah blah'
        ]

        return Response({'message': 'hello', 'api_view': api_view})

    def post(self, request):

        serializer = self.serliazers_class(data=request.data)
        if serializer.is_valid():
            name = serializer.validated_data.get('name')
            message = f'Hello {name}'
            return Response({'message': message})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
