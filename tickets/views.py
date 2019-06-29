# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

# Create your views here.
from django.urls import reverse
from django.views.generic import ListView, FormView, UpdateView

from tickets.forms import TicketForm
from tickets.models import Ticket



class TicketList(ListView):
    model           = Ticket
    template_name   = 'ticket/list.html'

    def get_context_data(self, **kwargs):
        context = super(TicketList, self).get_context_data(**kwargs)
        return context

    def get_queryset(self):
        queryset = Ticket.objects.all()
        return queryset

class TicketMixin(object):
    template_name = 'ticket/new.html'
    form_class = TicketForm
    def get_success_url(self, **kwargs):
        return reverse('tickets:ticket_list')

    def form_invalid(self, form):
        response = super(TicketMixin, self).form_invalid(form)
        return response

    def form_valid(self, form, **kwargs):
        self.object = form.save()

        response = super(TicketMixin, self).form_valid(form)
        return response

class TicketNew(TicketMixin, FormView):
    model = Ticket

    def get_context_data(self, **kwargs):
        context = super(TicketNew, self).get_context_data(**kwargs)
        context['action'] = 'new'
        return context

class TicketView(TicketMixin, UpdateView):
    model = Ticket
    def get_context_data(self, **kwargs):
        context = super(TicketView, self).get_context_data(**kwargs)

        context['action'] = 'view'
        return context