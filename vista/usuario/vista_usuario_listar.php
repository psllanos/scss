<script type="text/javascript" src="../js/usuario.js?rev=<?php echo time(); ?>"></script>
<div class="col-md-12">
    <div class="box box-warning box-solid">
        <div class="box-header with-border">
            <h3 class="box-title">BIENVENIDO AL CONTENIDO DEL USUARIO</h3>

            <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
            </div>
            <!-- /.box-tools -->
        </div>
        <!-- /.box-header -->
        <div class="box-body">
            <div class="form-group">
                <div class="col-lg-10">
                    <div class="input-group">
                        <input type="text" class="global_filter form-control" id="global_filter" placeholder="Ingresar dato a buscar">
                        <span class="input-group-addon"><i class="fa fa-search"></i></span>
                    </div>
                </div>
                <div class="col-lg-2">
                    <button class="btn btn-danger" style="width:100%" onclick="AbrirModalRegistro()"><i class="glyphicon glyphicon-plus"></i> Nuevo Registro</button>
                </div>
            </div>
            <table id="tabla_usuario" class="display responsive nowrap" style="width:100%">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Usuario</th>
                        <th>Rol</th>
                        <th>Sexo</th>
                        <th>Estatus</th>
                        <th>Acci&oacute;n</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th>#</th>
                        <th>Usuario</th>
                        <th>Rol</th>
                        <th>Sexo</th>
                        <th>Estatus</th>
                        <th>Acci&oacute;n</th>
                    </tr>
                </tfoot>
            </table>
        </div>
        <!-- /.box-body -->
    </div>
    <!-- /.box -->
</div>
<form autocomplete="FALSE" onsubmit="return false">

    <!-- Modal -->
    <div class="modal fade" id="modal_registro" role="dialog">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Registro de Usuario</h4>
                </div>
                <div class="modal-body">
                    <div class="col-lg-20">
                        <label for="">Usuario</label>
                        <input type="text" class="form-control" id="txt_usu" placeholder="Ingrese Usuario"><br>
                    </div>
                    <div class="col-lg-15">
                        <label for="">Contrase&ntilde;a</label>
                        <input type="password" class="form-control" id="txt_con1" placeholder="Ingrese Contrase&ntilde;a"><br>
                    </div>
                    <div class="col-lg-20">
                        <label for="">Repita la Contrase&ntilde;a</label>
                        <input type="password" class="form-control" id="txt_con2" placeholder="Repita la Contrase&ntilde;a"><br>
                    </div>
                    <div class="col-lg-20">
                        <label for="">Sexo</label>
                        <select class="js-example-basic-single" name="state" id="cdm_sexo" style="width: 100%;">
                            <option value="">Seleccione</option>
                            <option value="M">Masculino</option>
                            <option value="F">Femenino</option>
                        </select><br><br>
                    </div>
                    <div class="col-lg-20">
                        <label for="">Rol</label>
                        <select class="js-example-basic-single" name="state" id="cdm_rol" style="width: 100%;">
                        </select><br><br>
                    </div>
                </div>

            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="RegistrarUsuario()">Registrar</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</form>
<script>
    $(document).ready(function() {
        listar_usuario();
        $('.js-example-basic-single').select2();
        listar_combo_rol();
        $("modal_registro").on('show.bs.modal', function() {
            $("#txt_usu").focus();
            $("#txt_con1").focus();
            $("#txt_con2").focus();
        });
    })
</script>