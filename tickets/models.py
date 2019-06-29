# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import datetime

from dateutil.relativedelta import relativedelta
from django.db import models
from django.contrib import admin

class Ticket(models.Model):
    tipo_estado = (
        (1, 'Abierto'),
        (2, 'Pendiente'),
        (3, 'En Proceso'),
        (4, 'Resuelto'),
        (3, 'Cerrado'),
    )
    titulo = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=300)
    estado = models.IntegerField(choices=tipo_estado)
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    @property
    def tiempo_creacion(self):
        return relativedelta(datetime.datetime.now().date(), self.fecha_creacion.date()).days

    def __str__(self):
        return '%s' % (self.descripcion)

    class Meta:
        verbose_name = 'Ticket'
        verbose_name_plural = 'Tickets'


class TicketAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'descripcion', 'estado', 'tiempo_creacion')
    list_filter = ('titulo', 'descripcion', 'estado')
    ordering = ('fecha_creacion',)
    search_fields = ('titulo',)
