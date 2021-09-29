function VerificarUsuario(){
  var usu = $("#txt_usu").val();
  var con = $("#txt_con").val();

  if(usu.length==0 || con.length==0){
      return Swal.fire("Mensaje De Advertencia","Llene los campos vacios","warning");
  }
  $.ajax({
      url:'../controlador/usuario/controlador_verificar_usuario.php',
      type:'POST',
      data:{
          user:usu,
          pass:con
      }
  }).done(function(resp){
      if(resp==0){
          Swal.fire("Mensaje De Error",'Usuario y/o contrase\u00f1a incorrecta',"error");
      }else{
          var data= JSON.parse(resp);
          if(data[0][5]==='INACTIVO'){
              return Swal.fire("Mensaje De Advertencia","Lo sentimos el usuario "+usu+" se encuentra suspendido, comuniquese con el administrador","warning");
          }
          $.ajax({
              url:'../controlador/usuario/controlador_crear_session.php',
              type:'POST',
              data:{
                  idusuario:data[0][0],
                  user:data[0][1],
                  rol:data[0][6]
              }
          }).done(function(resp){
              let timerInterval
              Swal.fire({
              title: 'BIENVENIDO AL SISTEMA',
              html: 'Usted sera redireccionado en <b></b> milisegundos.',
              timer: 2000,
              timerProgressBar: true,
              onBeforeOpen: () => {
                  Swal.showLoading()
                  timerInterval = setInterval(() => {
                  const content = Swal.getContent()
                  if (content) {
                      const b = content.querySelector('b')
                      if (b) {
                      b.textContent = Swal.getTimerLeft()
                      }
                  }
                  }, 100)
              },
              onClose: () => {
                  clearInterval(timerInterval)
              }
              }).then((result) => {
              /* Read more about handling dismissals below */
              if (result.dismiss === Swal.DismissReason.timer) {
                  location.reload();
              }
})
          })
         
      }
  })
}

function listar_usuario(){
  var table = $("#tabla_usuario").DataTable({
     "ordering":false,
     "paging": false,
     "searching": { "regex": true },
     "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
     "pageLength": 10,
     "destroy":true,
     "async": false ,
     "processing": true,
     "ajax":{
         "url":"../controlador/usuario/controlador_usuario_listar.php",
         type:'POST'
     },
     "columns":[
         {"data":"posicion"},
         {"data":"usu_nombre"},
         {"data":"rol_nombre"},
         {"data":"usu_sexo",
              render: function (data, type, row ) {
                  if(data=='M'){
                      return "MASCULINO";                   
                  }else{
                      return "FEMINO";                 
                  }
              }
         }, 
         {"data":"usu_estatus",
           render: function (data, type, row ) {
             if(data=='ACTIVO'){
                 return "<span class='label label-success'>"+data+"</span>";                   
             }else{
               return "<span class='label label-danger'>"+data+"</span>";                 
             }
           }
         },  
         {"defaultContent":"<button style='font-size:13px;' type='button' class='editar btn btn-primary'><i class='fa fa-edit'></i></button>"}
     ],

     "language":idioma_espanol,
     select: true
 });
 document.getElementById("tabla_usuario_filter").style.display="none";
 $('input.global_filter').on( 'keyup click', function () {
      filterGlobal();
  } );
  $('input.column_filter').on( 'keyup click', function () {
      filterColumn( $(this).parents('tr').attr('data-column') );
  });

}

function filterGlobal() {
  $('#tabla_usuario').DataTable().search(
      $('#global_filter').val(),
  ).draw();
}
