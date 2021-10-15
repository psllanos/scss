function VerificarUsuario() {
  var usu = $("#txt_usu").val();
  var con = $("#txt_con").val();

  if (usu.length == 0 || con.length == 0) {
    return Swal.fire(
      "Mensaje De Advertencia",
      "Llene los campos vacios",
      "warning"
    );
  }
  $.ajax({
    url: "../controlador/usuario/controlador_verificar_usuario.php",
    type: "POST",
    data: {
      user: usu,
      pass: con,
    },
  }).done(function (resp) {
    if (resp == 0) {
      Swal.fire(
        "Mensaje De Error",
        "Usuario y/o contrase\u00f1a incorrecta",
        "error"
      );
    } else {
      var data = JSON.parse(resp);
      if (data[0][5] === "INACTIVO") {
        return Swal.fire(
          "Mensaje De Advertencia",
          "Lo sentimos el usuario " +
            usu +
            " se encuentra suspendido, comuniquese con el administrador",
          "warning"
        );
      }
      $.ajax({
        url: "../controlador/usuario/controlador_crear_session.php",
        type: "POST",
        data: {
          idusuario: data[0][0],
          user: data[0][1],
          rol: data[0][6],
        },
      }).done(function (resp) {
        let timerInterval;
        Swal.fire({
          title: "BIENVENIDO AL SISTEMA",
          html: "Usted sera redireccionado en <b></b> milisegundos.",
          timer: 2000,
          timerProgressBar: true,
          onBeforeOpen: () => {
            Swal.showLoading();
            timerInterval = setInterval(() => {
              const content = Swal.getContent();
              if (content) {
                const b = content.querySelector("b");
                if (b) {
                  b.textContent = Swal.getTimerLeft();
                }
              }
            }, 100);
          },
          onClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            location.reload();
          }
        });
      });
    }
  });
}
var table;
function listar_usuario() {
  table = $("#tabla_usuario").DataTable({
    ordering: false,
    paging: false,
    searching: { regex: true },
    lengthMenu: [
      [10, 25, 50, 100, -1],
      [10, 25, 50, 100, "All"],
    ],
    pageLength: 10,
    destroy: true,
    async: false,
    processing: true,
    ajax: {
      url: "../controlador/usuario/controlador_usuario_listar.php",
      type: "POST",
    },
    columns: [
      { data: "posicion" },
      { data: "usu_nombre" },
      { data: "rol_nombre" },
      {
        data: "usu_sexo",
        render: function (data, type, row) {
          if (data == "M") {
            return "MASCULINO";
          } else {
            return "FEMINO";
          }
        },
      },
      {
        data: "usu_estatus",
        render: function (data, type, row) {
          if (data == "ACTIVO") {
            return "<span class='label label-success'>" + data + "</span>";
          } else {
            return "<span class='label label-danger'>" + data + "</span>";
          }
        },
      },
      {
        defaultContent:
          "<button style='font-size:13px;' type='button' class='editar btn btn-primary'><i class='fa fa-edit'></i></button>",
      },
    ],

    language: idioma_espanol,
    select: true,
  });
  document.getElementById("tabla_usuario_filter").style.display = "none";
  $("input.global_filter").on("keyup click", function () {
    filterGlobal();
  });
  $("input.column_filter").on("keyup click", function () {
    filterColumn($(this).parents("tr").attr("data-column"));
  });
}

function filterGlobal() {
  $("#tabla_usuario").DataTable().search($("#global_filter").val()).draw();
}

function AbrirModalRegistro() {
  $("#modal_registro").modal({ backdrop: "static", keyboard: false });
  $("#modal_registro").modal("show");
}

function listar_combo_rol() {
  $.ajax({
    url: "../controlador/usuario/controlador_combo_rol_listar.php",
    type: "POST",
  }).done(function (resp) {
    var data = JSON.parse(resp);
    var cadena = "";
    if (data.length > 0) {
      for (var i = 0; i < data.length; i++) {
        cadena +=
          "<option value='" + data[i][0] + "'>" + data[i][1] + "</option>";
      }
      $("#cdm_rol").html(cadena);
    } else {
      cadena += "<option value='0'>No hay registros</option>";
    }
  });
}
function RegistrarUsuario() {
  var usu = $("#txt_usu").val();
  var contra = $("#txt_con1").val();
  var contra2 = $("#txt_con2").val();
  var sexo = $("#cdm_sexo").val();
  var rol = $("#cdm_rol").val();
  if (
    usu.length == 0 ||
    contra.length == 0 ||
    contra2.length == 0 ||
    sexo.length == 0 ||
    rol.length == 0
  ) {
    return Swal.fire(
      "Mensaje De Advertencia",
      "Todos los campos son obligatorios",
      "warning"
    );
  }
  if (contra != contra2) {
    return Swal.fire(
      "Mensaje de advertencia",
      "Las contraseñas no coinciden",
      "warning"
    );
  }
  $.ajax({
    url: "../controlador/usuario/controlador_usuario_registrar.php",
    type: "POST",
    data: {
      usuario:usu,
      contrasena:contra,
      sexo:sexo,
      rol:rol,
    },
  }).done(function (resp) {
    
    if (resp > 0) {
      if (resp == 1) {
        $("#modal_registro").modal("hide");
        setTimeout(() => {
          resolve({
            '#ff0000': 'Red',
            '#00ff00': 'Green',
            '#0000ff': 'Blue'
          })
        }, 1000);
        Swal.fire(
          "Mensaje de confirmacion",
          "Datos Correctos, Nuevo Usuario Registrado",
          "success"
        ).then((value) => {
          limpiarRegistro();
          table.ajax.reload();
        });
      }else{
        return Swal.fire(
          "Mensaje de Advertencia","Lo sentimos el usuario ya se encuentra en la base de datos","error");
      }
    } else {
      Swal.fire(
        "Mensaje de error",
        "Lo sentimos, no se pudo generar el  registro",
        "error"
      );
    }
  });
}
function limpiarRegistro() {
  $("#txt_usu").val("");
  $("#txt_con1").val("");
  $("#txt_con2").val("");
  $("#cdm_sexo").val("");
  $("#cdm_rol").val("");
}
