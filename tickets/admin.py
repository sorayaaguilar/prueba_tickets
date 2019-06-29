# -*- coding: utf-8 -*-
from django.contrib import admin
from tickets.models import *

# Register your models here.
admin.site.register(Ticket, TicketAdmin)