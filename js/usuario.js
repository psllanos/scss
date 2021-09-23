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
        Swal.fire({
          title: "Bienvenido A SCSS",
          html: "Usted esta siendo redireccionado espere <b></b> milisegundos.",
          timer: 3000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const b = Swal.getHtmlContainer().querySelector("b");
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft();
            }, 100);
          },
          willClose: () => {
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

function listar_usuario() {
  var table = $("#tabla_usuario").DataTable({
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
            return "FEMENINO";
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
          "<button style='font-size:13px;' type='button' class='editar btn btn-primary'>",
      },
    ],

    language: idioma_espanol,
    select: true,
  });
}
