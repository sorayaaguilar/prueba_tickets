// variables globales
var language = {
    'emptyTable'        : 'Sin Datos',
    'info'              : 'Mostrando _END_ de _TOTAL_ registros',
    'infoEmpty'         : '0-0 de 0',
    'infoFiltered'      : '',
    'infoPostFix'       : '',
    'thousands'         : ',',
    'lengthMenu'        : '_MENU_',
    'loadingRecords'    : 'Cargando...',
    'processing'        : 'Procesando...',
    'search'            : '',
    'searchPlaceholder' : 'Buscar',
    'zeroRecords'       : 'No se encontraron registros',
    'paginate'          : {
        'first'    : 'Primero',
        'last'     : 'Último',
        'next'     : 'Próximo',
        'previous' : 'Anterior'
    }
};

jQuery.extend(jQuery.validator.messages, {
    required: "Requerido",
      remote: "Please fix this field.",
      email: "Correo invalido",
      url: "Please enter a valid URL.",
      date: "Please enter a valid date.",
      dateISO: "Please enter a valid date (ISO).",
      number: "Ingrese un número",
      digits: "Please enter only digits.",
      creditcard: "Please enter a valid credit card number.",
      equalTo: "Please enter the same value again.",
      accept: "Archivo con extensión invalida.",
      maxlength: jQuery.validator.format("Máximo 8 {0} caracteres"),
      minlength: jQuery.validator.format("Mínimo 8 {0} caracteres"),
      rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
      range: jQuery.validator.format("Please enter a value between {0} and {1}."),
      max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
      min: jQuery.validator.format("Valor mayor o igual a {0}")
});

// Validaciones Genericas JQuery Validate
$.validator.addMethod("email", function(value, element) {
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    if(filter.test(value)) {
        return true;
    }
    else {
        return false;
    }
}, 'Correo inválido.');


// Validaciones Genericas JQuery Validate
$.validator.addMethod("rut", function(value, element) {
    var status = true;
    if (!$.validateRut(value)) {
        status = false
    }
    return status;
}, 'R.U.T. inválido.');

// loads
var LoadTable = function() {
    "use strict";
    return {
        //main function
        init: function(config) {
            var table;
            var language = {
                "decimal": "-",
                "thousands": ".",
                'emptyTable': 'Sin Datos',
                'info': 'mostranto _END_ de _TOTAL_ registros',
                'infoEmpty': '0-0 de 0',
                'infoFiltered': '',
                'infoPostFix': '',
                'lengthMenu': '_MENU_',
                'loadingRecords': 'Cargando...',
                'processing': 'Procesando...',
                'search': '',
                'searchPlaceholder': 'Buscar',
                'zeroRecords': 'No se encontraron registros',
                'paginate': {
                    'first': 'Primero',
                    'last': 'Último',
                    'next': 'Próximo',
                    'previous': 'Anterior'
                }
            };

      var buttons = [
        {
          extend: 'excel'
        },
        {
          extend: 'pdf'
        },
        // {
        //   extend: 'print',
        //   customize: function(win) {
        //     $(win.document.body).addClass('white-bg');
        //     $(win.document.body).css('font-size', '10px');
        //     $(win.document.body).find('table').addClass('compact').css('font-size', 'inherit');
        //   }
        // }
      ];

      if ($.fn.DataTable.isDataTable(config.id)) {
        table = $(config.id).DataTable();
        table.destroy();
        $(config.id).empty()
      }
      if (config.structure != undefined && $(config.id).length > 0) {
        $(config.id).append(config.structure.tfoot)
      }

      if ($(config.id).length !== 0) {
        table = $(config.id).DataTable({
          language: language, // lenguaje
          data: config.data == null ? false : config.data, // filas
          ajax: config.ajax == null ? false : config.ajax,
          deferRender: config.deferRender == null ? false : config.deferRender,
          order: config.order == null ? [
            [0, 'asc']
          ] : config.order, // columna a ordenar
          info: config.info == null ? true : config.info, // info
          responsive: config.responsive == null ? true : config.responsive,
          stateSave: config.stateSave == null ? true: config.stateSave,
          columns: config.columns == null ? [] : config.columns, // columnas
          columnDefs: config.columnDefs == null ? [] : config.columnDefs,
          paginate: config.paginate == null ? true : config.paginate, // paginador
          pageLength: config.pageLength == null ? 10 : config.pageLength, // elementos a mostar por defecto
          bLengthChange: config.bLengthChange == null ? true : config.bLengthChange, // elementos a mostrar
          searching: config.searching == null ? true : config.searching, // buscar
          ordering: config.ordering == null ? true : config.ordering, // ordenar
          drawCallback: config.drawCallback == null ? function(){} : config.drawCallback,
          pagingType: config.pagingType == null ? 'simple_numbers' : config.pagingType,
          dom: '<"top"lf<"btn-search">B><"form-search">rt<"bottom"ip>',
          buttons: config.buttons == null ? buttons : config.buttons,
          footerCallback: config.footerCallback == null ? function() {} : config.footerCallback,
          // dom: '<"top"lBf>rt<"bottom"ip><"clear">',
          // buttons: [{
          //     text: 'CSV',
          //     extend: 'csv',
          //     className: 'btn-sm'
          //   },
          //   {
          //     text: 'EXCEL',
          //     extend: 'excel',
          //     className: 'btn-sm'
          //   },
          //   {
          //     text: 'PDF',
          //     extend: 'pdf',
          //     className: 'btn-sm'
          //   },
          //   {
          //     text: 'Copiar',
          //     extend: 'copy',
          //     className: 'btn-sm'
          //   },
          //   {
          //     text: 'Imprimir',
          //     extend: 'print',
          //     className: 'btn-sm'
          //   }
          // ],
        });
      }
      return table
    }
  };
}();

function eliminar_fila(obj, url, table, text){

    var fila = $(obj).closest('tr')

    Swal({
        title: '¿ Eliminar '+text+' ?',
        text:  "",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#FF6275',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        focusConfirm: false,
        focusCancel:false,
        reverseButtons: true
    }).then((result) => {
        if (result.value) {

            $.ajax({
                url: url,
                type: 'POST',
                data: {csrfmiddlewaretoken: getCookie('csrftoken')},
                statusCode: {
                    403: function () {
                        window.location.href = '/error-403/'
                    }
                },
                success: function(response){

                    // eliminar registro de la tabla
                    if (response.status == true) {
                        var tabla = $(table).DataTable();
                        tabla.row($(fila)).remove().draw();
                    }

                    notification_toastr({
                        type: response.status == true ? 'success' : 'error',
                        message: response.status == true ? 'Éxito'   : 'Error',
                        title: response.message
                    })

                },
                error:function(data){
                    notification_toastr({
                        type: 'error',
                        message: 'Error',
                        title: 'no se puede eliminar',
                    })
                }
            })
        }
    })

}

// generic functions

function getCookie(name){
  var cookieValue = null;
  if (document.cookie && document.cookie != '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = jQuery.trim(cookies[i]);
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) == (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

function loading(config) {

  var temp = ''
  temp += '<div class="text-center">'
  temp += '<div><i class="fas fa-spinner fa-pulse fa-3x"></i></div>'
  temp += '<h1>@title<h1>'
  temp += '<p>@decription</p>'
  temp += '</div>'
  temp = temp.replace(/@title/g, config.title == null ? 'Por favor espere' : config.title);
  temp = temp.replace(/@decription/g, config.description == null ? '' : config.description);

  if (config.active) {
    $.blockUI({
      message: temp,
      css: {
        backgroundColor: 'none',
        color: '#fff',
        border: 'none',
      }
    });
  } else {
    $.unblockUI();
  }
}

function verificar_navegador() {
    // Opera 8.0+
    var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    // Firefox 1.0+
    var isFirefox = typeof InstallTrigger !== 'undefined';
    // Safari 3.0+ "[object HTMLElementConstructor]"
    var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) {return p.toString() === "[object SafariRemoteNotification]";})(!window['safari'] || safari.pushNotification);
    // Internet Explorer 6-11
    var isIE = /*@cc_on!@*/false || !!document.documentMode;
    // Edge 20+
    var isEdge = !isIE && !!window.StyleMedia;
    // Chrome 1+
    var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

    return (isIE || isEdge || isSafari) ? false : true
}

function change_company(row){
  //{TODO: esta función debiera consumir un servicio para obtener las empresas}

  var html = '';
  html = html + '<div class="col-sm-12 col-lg-12">'
  html = html + '<div class="widget-list widget-list-rounded m-b-30" data-id="widget">'
  for (var empresa in empresas){
      html = html + '<div class="widget-list-item">'
      html = html + '<div class="widget-list-media">'
      if (empresas[empresa].logo == ''){
        html = html + '<div class="widget-icon widget-icon-lg user rounded bg-grey pull-left m-r-5 m-b-5 text-white">'
        html = html + '<i class="fa fa-building"></i>'
        html = html + '</div>'
      }else{
        html = html + '<div class="widget-img widget-img-lg rounded bg-inverse pull-left m-r-5 m-b-5" style="background-image: url('+empresas[empresa].logo+')"></div>'
      }
      html = html + '</div>'
      html = html + '<div class="widget-list-content">'
      html = html + '<h4 class="widget-list-title">'+empresas[empresa].nombre+'</h4>'
      html = html + '<p class="widget-list-desc">'+empresas[empresa].giro+'</p>'
      html = html + '</div>'
      html = html + '<div class="widget-list-action">'
      html = html + '<a href="/'+empresas[empresa].id+'/1/contabilidad/dashboard/" class="btn btn-xs btn-primary">Ir a UWIGO <i class="fa fa-arrow-right m-l-5"></i></a>'
      html = html + '</div>'
      html = html + '</div>'
  }
  html = html + '</div>'
  html = html + '</div>'
  $('#m-change-empresa').find('.modal-body').html(html);
}

function desactiva_ayuda(obj,value){
  //{TODO: cambiar nombre}
    var desactive = null;

    if($(obj).is(':checked')){
        desactive = true;
        $('#help').removeClass('hide')
    }else{
        desactive = false;
        $('#help').addClass('hide')
    }

    $.ajax({
        url: '/desactiva-ayuda/',
        type: 'POST',
        data: {csrfmiddlewaretoken: getCookie('csrftoken'),
              valor:desactive},
        statusCode: {
            403: function () {
                window.location.href = '/error-403/'
            }
        },
        success: function(response){

        },
        error:function(data){
            notification_toast(
                'error',
                'Error',
                'no se puede quitar la ayuda'
            )
        }
    })
}

function cambiar_favorito(obj) {
    //{TODO: cambiar nombre}
  var pathname = window.location.pathname;
  var id = $(obj).data('id')
  var estado = false

  if($(obj).is(':checked')){
      estado = true;
  }

  $.ajax({
    url: '/cambiar/favorito/',
    type: 'POST',
    data: {
      csrfmiddlewaretoken: getCookie('csrftoken'),
      id: id,
      estado: estado,
    },
    statusCode: {
      403: function () {
        window.location.href = '/error-403/'
      }
    },
    success: function(response){

      if (response.status) {
        if (estado) {
          var temp = ''
          temp += '<a href="@url" data-toggle="dropdown" class="dropdown-item" data-id="@id">@nombre</a>'
          temp = temp.replace(/@url/g, pathname);
          temp = temp.replace(/@id/g, response.data.id);
          temp = temp.replace(/@nombre/g, response.data.nombre);
          $('li.dropdown-favoritos .sub-menu li').append(temp)

        }else{
          $('li.dropdown-favoritos .sub-menu li a[data-id="'+response.data.id+'"]').remove()
        }
      }

      if ($('li.dropdown-favoritos .sub-menu li a').length > 0){
          $('li.dropdown-favoritos').removeClass('hide')
      } else{
        $('li.dropdown-favoritos').addClass('hide')
      }

    },
    error:function(data){
      notification_toast(
        'error',
        'Error',
        'no se puede quitar la ayuda'
      )
    }
  })
}

function formatea_rut(rut) {
    if(rut!='') {
        rut = rut.replace('-', '').replace(/\./g, '');
        var dv = rut.substring(rut.length - 1)
        rut = rut.substring(0, rut.length - 1)
        rut += '';
        x = rut.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + '.' + '$2');
        }
        return x1 + x2 + '-' + dv;
    }
    else
        return ''
}

function modal_plancuenta(tabla, modal,empresa,modulo,fecha,tipo_comprobante){
    $.ajax({
        type: 'POST',
        url: '/'+empresa+'/'+modulo+'/contabilidad/modalplanporfecha/',
        data:{
            fecha_comprobante   : moment().format('DD/MM/YYYY'),
            csrfmiddlewaretoken : getCookie('csrftoken'),
            tipo_comprobante    : tipo_comprobante
        },
        success: function (data, textStatus, jqXHR) {
            var id_imputaciones = [];
            for(var i in data.imputaciones){
                id_imputaciones.push(data.imputaciones[i].id_imputacion)
            }
            var html = "";
            html+='<div class="table-responsive">';
            html+='<table id="tablaModalplan" class="table table-striped table-bordered" style="width: 100% !important;">';
            html+='<thead>';
            html+='</thead>';
            html+='<tbody>';
            for(var i in data.plan){
                html+='<tr>';
                html+='<td>'+data.plan[i].id+'</td>';

                html+='<td><a class="format-plan-cuenta codigo" onclick="seleccionarCodigoPlan('+data.plan[i].id+', \''+data.plan[i].codigo+'\', \''+data.plan[i].descripcion+'\', \''+data.plan[i].imputaciones+'\', \''+id_imputaciones+'\', \''+data.plan[i].es_analisis_cuenta+'\',\''+data.plan[i].es_doc_referencial+'\')">'+data.plan[i].codigo+'</a></td>';
                html+='<td><a onclick="seleccionarCodigoPlan('+data.plan[i].id+', \''+data.plan[i].codigo+'\', \''+data.plan[i].descripcion+'\', \''+data.plan[i].imputaciones+'\', \''+id_imputaciones+'\', \''+data.plan[i].es_analisis_cuenta+'\',\''+data.plan[i].es_doc_referencial+'\')">'+data.plan[i].agrupacion+'</a></td>';
                html+='<td><a onclick="seleccionarCodigoPlan('+data.plan[i].id+', \''+data.plan[i].codigo+'\', \''+data.plan[i].descripcion+'\', \''+data.plan[i].imputaciones+'\', \''+id_imputaciones+'\', \''+data.plan[i].es_analisis_cuenta+'\',\''+data.plan[i].es_doc_referencial+'\')">'+data.plan[i].descripcion+'</a></td>';
                html+='<td>'+data.plan[i].contra_cuenta_dif_cambio+'</td>';
                html+='<td>'+data.plan[i].es_analisis_cuenta+'</td>';
                html+='<td>'+data.plan[i].es_doc_referencial+'</td>';
                html+='<td>'+data.plan[i].es_flujo_caja+'</td>';

                for(var j in data.plan[i].imputaciones){
                    if(data.plan[i].imputaciones[j]){
                        html+='<td class="text-center project-status"><i class="fa fa-check" title="Bloqueo"></i> </td>';
                    }else{
                        html+=' <td class="text-center project-status"><i class="fa fa-times" title="Desbloqueado"></i></td>';
                    }
                }
                html+='</tr>';
            }
            html+='</tbody>';
            html+='</table>';
            html+='</div>';
            $('#m-plan-cuenta').find('.modal-body #tabla-plan-cuenta').html(html);

            var configuracion = {
              'searching': true,
              'order': [[1, 'asc']],
              'paginate': true,
              'bLengthChange': true,
              'bInfo': false,
              'buttons': []
            };

            var columns = [
                {
                    'width': '1%',
                    'data': 'id',
                    'title': 'Id',
                    'visible': false
                },
                {
                    'width': '4%',
                    'data': 'codigo',
                    'title': 'Código',
                    'orderable': true
                },
                {
                    'width': '5%',
                    'data' : 'agrupacion',
                    'title': 'Agrupación',
                    'orderable': false
                },
                {
                    'width': '5%',
                    'data' : 'descripcion',
                    'title': 'Desc',
                    'orderable': false
                },
                {
                    'width': '5%',
                    'data' : 'cc',
                    'title': 'CC',
                    'orderable': false,
                    'visible': false
                },
                {
                    'width': '5%',
                    'data' : 'ac',
                    'title': 'AC',
                    'orderable': false,
                    'visible': false
                },
                {
                    'width': '5%',
                    'data' : 'dr',
                    'title': 'DR',
                    'orderable': false,
                    'visible': false
                },
                {
                    'width': '5%',
                    'data' : 'fc',
                    'title': 'FC',
                    'orderable': false,
                    'visible': false
                }];

            for(var k in data.imputaciones){
                 val = {};
                 val.width = '5%';
                 val.data = data.imputaciones[k].nombreImputacion;
                 val.title = data.imputaciones[k].nombreImputacion;
                 val.orderable = false;
                 columns.push(val)
            }


            tabla_plan = generar_tabla('#tablaModalplan', columns, configuracion);
            // $('.format-plan-cuenta').attr('size', longitud_cuenta).mask(mascara_cuenta);
            $('#m-plan-cuenta').modal('show');
        }
    });
}

function modal_personas(tabla, modal,empresa,modulo){
    $("#form-tipo-persona").find('input:checkbox').prop('checked', false);
    $.ajax({
            type: 'POST',
            url:  '/'+empresa+'/'+modulo+'/contabilidad/listarPersonas/',
            data: {
                csrfmiddlewaretoken: getCookie('csrftoken')
            },
            success: function (data, textStatus, jqXHR) {
                var url   = '/'+data.pk_empresa+'/'+data.pk_modulo+'/parametros/6/personas/new/';
                html = "";
                html+='<div class="row">';
                html+='<div class="col-sm-2">';
                html+='<button type="button" class="external btn btn-primary btn-xs" onclick="abrirEnPestana(\''+url+'\')"><i class="fa fa-plus"></i>  Contacto</button>';
                html+='</div>';
                html+='</div>';

                html+='<br>';

                html+='<div class="table-responsive">';
                html+='<table class="table table-striped table-bordered" id="tablaModalPersona" style="width: 100% !important;">';
                html+='<thead>';
                html+='</thead>';
                html+='<tbody>';
                for(var i in data.plan){
                    var id_fiscal = data.plan[i].extranjero?data.plan[i].id_fiscal:formatea_rut(data.plan[i].id_fiscal)
                    var nombre = (data.plan[i].nombre_fantasia != '') ? data.plan[i].nombre_fantasia : data.plan[i].razon_social;
                    html+='<tr>';
                    html+='<td>'+data.plan[i].id+'</td>';
                    html+='<td><a href="#" onclick="seleccionarCuentaAnalisis(\''+id_fiscal+'\', \''+data.plan[i].secuencia+'\',\''+nombre+'\')">'+id_fiscal+'</a></td>';
                    html+='<td><a href="#" onclick="seleccionarCuentaAnalisis(\''+id_fiscal+'\', \''+data.plan[i].secuencia+'\',\''+nombre+'\')">'+data.plan[i].secuencia+'</a></td>';
                    html+='<td><a href="#" onclick="seleccionarCuentaAnalisis(\''+id_fiscal+'\', \''+data.plan[i].secuencia+'\',\''+nombre+'\')">'+data.plan[i].nombre_fantasia+'</a></td>';
                    html+='<td><a href="#" onclick="seleccionarCuentaAnalisis(\''+id_fiscal+'\', \''+data.plan[i].secuencia+'\',\''+nombre+'\')">'+data.plan[i].telefono+'</a></td>';
                    html+='<td><a href="#" onclick="seleccionarCuentaAnalisis(\''+id_fiscal+'\', \''+data.plan[i].secuencia+'\',\''+nombre+'\')">'+data.plan[i].correo+'</a></td>';
                    html+='<td><a href="#" onclick="seleccionarCuentaAnalisis(\''+id_fiscal+'\', \''+data.plan[i].secuencia+'\',\''+nombre+'\')">'+data.plan[i].tipo_persona_id+'</a></td>';
                    // html+='<td class="text-center"><button type="button" class="btn btn-primary btn-xs" onclick="seleccionarCuentaAnalisis(\''+id_fiscal+'\', \''+data.plan[i].secuencia+'\',\''+data.plan[i].nombre_fantasia+'\')"><i class="fa fa-eye"></i> Seleccionar</button></a></td>';
                    html+='</tr>';
                }
                html+='</tbody>';
                html+='</table>';
                html+='</div>';
                $(modal).find('.modal-body #tabla-contactos').html(html);


                $(modal).modal('show');

                var html_select = ''
                if(data.tipo.length >0){

                    for(var a = 0; a <data.tipo.length; a++){

                        html_select += '<div class="form-group col-sm-2 col-lg-2">'
                        html_select += '<span>'
                        html_select += '<label for="id_codigo">'+data.tipo[a].detalle+':</label>'
                        html_select += '</span>'
                        html_select += '<label class="custom-control custom-checkbox">'
                        html_select += '<input class="custom-control-input" id="id_agrupacion_'+data.tipo[a].id+'"  data-id="'+data.tipo[a].id+'" data-descripcion="'+data.tipo[a].detalle+'" name="agrupacion_'+data.tipo[a].id+'" type="checkbox" onchange="desactivar_columnas_personas()">'
                        html_select += '<span class="c-indicator bg-primary custom-control-indicator"></span>'
                        html_select += '</label>'
                        html_select += '</div>'
                    }
                    $(modal).find('.modal-body #filtro-tipo-persona').html('')
                    $(modal).find('.modal-body #filtro-tipo-persona').append(html_select)
                }else{
                    $(modal).find('.modal-body #filtro-tipo-persona').html('');
                    $(modal).find('.modal-body #filtro-tipo-persona').append(html_select)
                }


                var configuracion = {
                  'searching': true,
                  'order': [[1, 'asc']],
                  'paginate': true,
                  'bLengthChange': true,
                  'bInfo': false,
                  'buttons': []
                };

                var columns= [
                    {
                        'data': 'id',
                        'title': 'id',
                        'visible': false
                    },
                    {
                        'width': '20%',
                        'data': 'id_fiscal',
                        'title': 'Rut'

                    },
                    {
                        'width': '20%',
                        'title': 'Sec',
                        'data' : 'secuencia',
                        'visible': true

                    },
                    {
                        'width': '20%',
                        'data': 'nombre',
                        'title': 'Nombre'

                    },
                    {
                        'width': '20%',
                        'data': 'telefono',
                        'title': 'Teléfono'

                    },
                    {
                        'width': '10%',
                        'data': 'ciudad',
                        'title': 'Correo'

                    },
                    {
                        'width': '10%',
                        'data': 'tipo',
                        'title': 'Tipo',
                        'visible': false

                    },
                    // {
                    //     'width': '10%',
                    //     'data': 'options',
                    //     'orderable': false,
                    //     'title': 'Opciones'
                    // }
                    ];
                tabla_perso = generar_tabla($(tabla), columns, configuracion);

            }
        });
}

function form_errors(errors, level, prefix){
	if (level == 'parent') {
		$.each(errors, function(index, value) {
			$("#id_" + index).closest('.form-group').find('.container-error').append(value[0])
		});
	}else{
		$.each(errors, function(index, value) {
			$.each(value, function(k, v) {
				$('#id_'+prefix+'-'+index+'-'+k).closest('.form-group').find('.container-error').append(v)
			})
		});
	}
}

function form_clear(form, fields, errors){

	if (fields) {
		// limpiar inputs y selects normales
		$(form+' .form-group input[type="number"]').val('')
		$(form+' .form-group input[type="email"]').val('')
		$(form+' .form-group input[type="text"]').val('')
        $(form+' .form-group input[type="checkbox"]').prop('checked', false)
		$(form+' .form-group textarea').val('')
		$(form+' select option:first-child').prop('selected', true);

		// limpiar inputs y selects formularios hijos
		$(form+' tbody input').val('')

		// limpiar select 2
		$(form+' .select2').val(null).trigger("change")

        // limpiar selectpicker
        $(form+' .selectpicker').val(null).trigger("change")

	};

	if (errors) {
		// limpiar error del formulario
		$(form+' .container-error').html('')
	};
}

function generar_tabla(tabla, columns, configuracion){
    var table;

    var buttons = [
    {
        extend: 'excel'
    },
    {
        extend: 'pdf'
    },
    {
        extend: 'print',
        customize: function (win){
            $(win.document.body).addClass('white-bg');
            $(win.document.body).css('font-size', '10px');
            $(win.document.body).find('table').addClass('compact').css('font-size', 'inherit');
        }
    }];

    table = $(tabla).DataTable({
        'language'      : language,
        'pageLength'    : 10,
        'searching'     : configuracion.searching == null ? true : configuracion.searching,
        'order'         : configuracion.order == null ? [[0, 'desc']] : configuracion.order,
        'paginate'      :  configuracion.paginate == null  ? true : configuracion.paginate,
        'bLengthChange' : configuracion.bLengthChange == null  ? true : configuracion.bLengthChange,
        'bInfo'         : configuracion.bInfo == null  ? true : configuracion.bInfo,
        'pagingType'    : 'simple_numbers',
        'columns'       : columns,
        'dom'           :  '<lf<t>ip>',
        'rowsGroup'     : configuracion.rowsGroup == null  ? false : configuracion.rowsGroup,
        'buttons'       : configuracion.buttons == null  ? buttons : configuracion.buttons,
        'rowReorder'    : configuracion.rowReorder == null  ? false : configuracion.rowReorder,
        'drawCallback'  : configuracion.drawCallback == null ? function(){$('[data-toggle="tooltip"]').tooltip();} : configuracion.drawCallback,

    });

    if(!configuracion.searching){
      $(tabla+'_filter').css('display' , 'none');
    }
    return table;
}

function desactivar_columnas() {
    var search = '';
    $("#form-agrupacion input:checkbox:checked").each(function () {
        search += $(this).attr('data-descripcion') + '|'
    });
    tabla_plan.columns(2).search(search.slice(0, -1), true, false).draw()
    // $('.format-plan-cuenta').attr('size', longitud_cuenta).mask(mascara_cuenta);
}

function valida_rango_fechas(form) {

    $.validator.addMethod("ddmmyyyy", function(value, element) {

        var match = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(value),
        isDate = function (m, d, y) {
            return m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && d <= (new Date(y, m, 0)).getDate();
        };
        return match && isDate(match[2], match[1], match[3]);
    },"Ingresar fecha valida en formato dd/mm/yyyy");

    $.validator.addMethod("rango_fecha", function (value, element) {
        fecha_desde  = $(form + ' input[name="fecha_desde"]').val()
        fecha_hasta  = $(form + ' input[name="fecha_hasta"]').val()

        array_fecha_desde = fecha_desde.split("/")
        array_fecha_hasta = fecha_hasta.split("/")

        if (array_fecha_desde[2] < array_fecha_hasta[2]) {
            return true;
        }
        else if(array_fecha_desde[2] == array_fecha_hasta[2]){

            if (array_fecha_desde[1] < array_fecha_hasta[1]) {
                return true;
            }else if(array_fecha_desde[1] == array_fecha_hasta[1]){

                if (array_fecha_desde[0] <= array_fecha_hasta[0]) {
                    return true;
                }else{
                    return false;
                }
            }else{
                return false;
            }
        }
        else{
            return false;
        }
    }, 'Rango de fechas inválido');
}

function busqueda_avanzada(obj, value, form) {
    if (!$(obj).is(':checked')) {
        $(form).removeClass('show')
    } else {
        $(form).addClass('show')
    }
}

function notification_toastr(config){
    toastr.options = {
      "closeButton": true,
      "progressBar": true,
      "positionClass": "toast-top-right",
      "preventDuplicates": false,
      "onclick": null,
      "timeOut": "5000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    }
    toastr[config.type](config.message, config.title)
}


$(document).ready(function() {
    App.init();
})
