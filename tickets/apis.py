from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.views import APIView

from tickets.models import Ticket
from tickets.serializers import TicketSerializer


class GetTicketList(APIView):
    def get(self, request):

        atributo_concepto = Ticket.objects.all()
        serializer        = TicketSerializer(atributo_concepto, many=True)

        return Response(serializer.data)

    # def post(self, request):
    #     status = True
    #     error = ''
    #     message = 'Ticket creado exitosamente'
    #     try:
    #         serializer = TicketSerializer(data=request.data)
    #         if serializer.is_valid():
    #             serializer.save()
    #     except Exception as e:
    #         status = False
    #         error = str(e)
    #         message = 'Error al crear el ticket'
    #     context = {
    #         'status': status,
    #         'error': error,
    #         'message': message
    #     }
    #
    #     return JsonResponse(context)

# class AtributoConceptoDetail(APIView):
#     def get_object(self, pk):
#         return Ticket.objects.get(pk=pk)
#
#     def get(self, request, pk):
#         status = True
#         error = ''
#         serializer = None
#         try:
#             ticket = self.get_object(pk)
#             serializer = TicketSerializer(ticket)
#         except Exception as e:
#             status = False
#             error = str(e)
#         context = {
#             'data': serializer.data,
#             'status': status,
#             'error': error
#         }
#         return JsonResponse(context)
#
#     def put(self, request, pk):
#         status = True
#         error = ''
#         message = 'Ticket creado exitosamente'
#         ticket = self.get_object(pk)
#         try:
#             serializer = TicketSerializer(ticket, data=request.data)
#             if serializer.is_valid():
#                 serializer.save()
#             else:
#                 print(serializer.errors)
#         except Exception as e:
#             status = False
#             error = str(e)
#             message = 'Error al crear el ticket'
#         context = {
#             'status': status,
#             'error': error,
#             'message': message
#         }
#         return JsonResponse(context)

