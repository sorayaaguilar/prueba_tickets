from django import forms

from tickets.models import Ticket


class TicketForm(forms.ModelForm):

    def __init__(self, *args, **kwargs):
        super(TicketForm, self).__init__(*args, **kwargs)
        if self.instance.pk is not None:
            self.fields['titulo'].widget.attrs['disabled'] = 'disabled'
            self.fields['descripcion'].widget.attrs['disabled'] = 'disabled'
            self.fields['estado'].widget.attrs['disabled'] = 'disabled'

    tipo_estado = (
        (1, 'Abierto'),
        (2, 'Pendiente'),
        (3, 'En Proceso'),
        (4, 'Resuelto'),
        (3, 'Cerrado')
    )
    estado = forms.ChoiceField(
        widget=forms.Select(attrs={
                'class': 'form-control form-control-sm selectpickers',
                'data-actions-box':'true',
            }),
        label="Estado",
        error_messages={'required': "Requerido"},
        choices = tipo_estado
    )

    class Meta:
        model= Ticket
        fields= '__all__'

        widgets = {
            'titulo': forms.TextInput(attrs={'class': 'form-control'}),
            'descripcion': forms.Textarea(attrs={'class': 'form-control'})
        }
        labels = {
            'titulo': 'Titulo',
            'descripcion': 'Descripcion'
        }

        error_messages = {
            'titulo': {'required': "Requerido"},
            'descripcion': {'required': "Requerido"},
        }