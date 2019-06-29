from django.conf.urls import url
from django.contrib.auth.decorators import login_required

from tickets.apis import GetTicketList
from tickets.views import *

app_name = 'tickets'

urlpatterns = [
    url('list/', login_required(TicketList.as_view()), name='ticket_list'),
    url('new/', login_required(TicketNew.as_view()), name='ticket_new'),
    url('view/(?P<pk>\d+)/$', login_required(TicketView.as_view()), name='ticket_view'),
    url('get-tickets/', GetTicketList.as_view(), name='get_ticket'),
]