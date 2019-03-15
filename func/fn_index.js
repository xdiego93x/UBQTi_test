var lista_user = [];
var lista_skills = [];
var lista_imagen_perfil = [];

if(lista_user.length == 0){
    $.ajax({
        url: "http://localhost:3000/user",
        type: "GET",
        data: {  },
        dataType: "json",
        success: function (result) {
            lista_user.push(result['response']['data']);
            obtenerDatos();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (xhr.status == 200) {

            }
            //console.log(thrownError);
        }
    });
}

if(lista_skills.length == 0){
    $.ajax({
        url: "http://localhost:3000/skill",
        type: "GET",
        data: { },
        dataType: "json",
        success: function (result) {
            lista_skills.push(result['response']['data']);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (xhr.status == 200) {

            }
            //console.log(thrownError);
        }
    });
}

function obtenerDatos(){
    var html = '';
            $.each(lista_user[0], function (i, val) {
                $.each(val, function (id, val2) {
                    html = html+`<tr>
                                <td>` + val2.name + `</td>
                                <td>` + val2.last_name + `</td>
                                <td>` + val2.info.profession + `</td>
                                <td>` + val2.email + `</td>
                                <td><button type="submit" name="ver" onclick="ver('`+ id + `')" class="btn btn-primary">Ver</button></td>
                                <td><button type="submit" name="editar" onclick="editar('`+ id + `')" class="btn btn-primary">Editar</button></td>
                                <td><button type="submit" name="eliminar" onclick="eliminar('`+ id + `')" class="btn btn-primary">Eliminar</button></td>
                            </tr>`;
                })
            })
            $("#user").html(html);
}

function ver(id){
    var html = '';
    $.each(lista_user[0], function (i, val) {
        $.each(val, function (i2, val2) {
            if(id === i2){
                user = val2;
                html = `<div class="modal fade" id="modal_user" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Perfil</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <table class="table table-hover">
                        <tbody>`;

                htmlFinal = `</tbody>
                    </table>
                        <div class="modal-body">
                            <div class="form-group">
                                <img src="fotos/` + id + `_photo.jpg"></img>
                                <h1>` + user.name +` ` + user.last_name +  `</h1>
                                <h4>Profesión: ` + user.info.profession + `</h4>
                                <h4>Edad: ` + user.info.profession + `</h4>
                                <h4>Dirección: ` + user.info.address + `</h4>
                                <h4>Teléfono: ` + user.phone + `</h4>
                                <h4>Email: ` + user.email + `</h4>
                                <div style="float:left;margin-right:50px;">
                                    <canvas id="canvas1"></canvas>
                                    <div id="leyenda1" class="leyenda"></div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                    </div>
                    </div>
                    </div>
                    </div>`;
            }
        })
    })

    var image = '';
    $.ajax({
        url: "http://localhost:3000/imagen_perfil",
        type: "POST",
        data: { "id": id },
        dataType: "json",
        success: function (result) {

        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (xhr.status == 200) {

            }
            //console.log(thrownError);
        }
    });

    $("#modal").remove("#modal_user");
    $("#modal").html(html + htmlFinal + image);
    $('#modal_user').modal('show');
    $.each(lista_skills[0], function (i, val) {
        $.each(val, function (i2, val2) {
            if(id == i2){
                grafico(val2);
            }
        })
    })
}

function editar(id){
    var html = '';
    $.each(lista_user[0], function (i, val) {
        $.each(val, function (i2, val2) {
            if(id === i2){
                user = val2;
                html = `<div class="modal fade" id="modal_editar" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Perfil</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <table class="table table-hover">
                        <tbody>`;

                htmlFinal = `</tbody>
                    </table>
                        <div class="modal-body">
                            <div class="form-group">
                                <input type="text" class="form-control" id="name" placeholder="Nombre" value="` + user.name + `">
                                <input type="text" class="form-control" id="last_name" placeholder="Apellido" value="` + user.last_name + `">
                                <input type="text" class="form-control" id="birthdate" placeholder="Fecha de Nacimiento" value="` + user.birthdate + `">
                                <input type="text" class="form-control" id="email" placeholder="Email" value="` + user.email + `">
                                <input type="text" class="form-control" id="phone" placeholder="Teléfono" value="` + user.phone + `">
                                <input type="text" class="form-control" id="profession" placeholder=Procesión" value="` + user.info.profession + `">
                                <input type="text" class="form-control" id="address" placeholder="Dirección" value="` + user.info.address + `">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                            <button type="submit" onclick="actualizar('` + id + `');" name="actualizar" class="btn btn-primary">Actualizar</button>
                    </div>
                    </div>
                    </div>
                    </div>`;
            }
        })
    })
    $("#modal").remove("#modal_editar");
    $("#modal").html(html + htmlFinal);
    $('#modal_editar').modal('show');
}

function eliminar(id){
    $.each(lista_user[0], function (i, val) {
        $.each(val, function (i2, val2) {
            if(id === i2){
                console.log(lista_user[0]);
                lista_user[0].splice(i, 1);
            }
        })
    })
    obtenerDatos();
}

function actualizar(id){
    var name = $("#name").val();
    var last_name = $("#last_name").val();
    var birthdate = $("#birthdate").val();
    var email = $("#email").val();
    var phone = $("#phone").val();
    var profession = $("#profession").val();
    var address = $("#address").val();
    $.each(lista_user[0], function (i, val) {
        $.each(val, function (i2, val2) {
            if(id == i2){
                val2.name = name;
                val2.last_name = last_name;
                val2.birthdate = birthdate;
                val2.email = email;
                val2.phone = phone;
                val2.info.profession = profession;
                val2.info.address = address;
            }
        })
    })
    $('#modal_editar').modal('hide');
    obtenerDatos();
}

function grafico(skills){
    var count = 0;
    $.each(skills, function (i, val) {
        if(count == 0){
            skill_name = i;
            skill_val = val;
        }
        if(count == 1){
            skill_name_1 = i;
            skill_val_1 = val;
        }
        if(count == 2){
            skill_name_2 = i;
            skill_val_2 = val;
        }
        if(count == 3){
            skill_name_3 = i;
            skill_val_3 = val;
        }
        count++;
    })

    // definimos los valor del gráfico.
    var valores={
        skill:{valor:skill_val,color:"Orange",name:skill_name},
        skill_1:{valor:skill_val_1,color:"green",name:skill_name_1},
        skill_2:{valor:skill_val_2,color:"purple",name:skill_name_2},
        skill_3:{valor:skill_val_3,color:"red",name:skill_name_3}
    }

    /**
     * Clase para generar graficos de pastel
     * Tiene que recibir:
     *	el id del canvas
     *	la anchura y altura del canvas
     *	un array con los valores a mostrar del tipo:
     *		var valores={
     *			"Access":	{valor:10,color:"blue"},
     *			"PHP":		{valor:23,color:"red"},
     *			"Python":	{valor:18,color:"green"},
     *			".NET":		{valor:12,color:"Orange"},
     *			"C++":		{valor:30,color:"Cyan"}
     *		}
     */
    var miPastel=function(canvasId,width,height,valores) {
        this.canvas=document.getElementById(canvasId);;
        this.canvas.width=width;
        this.canvas.height=height;
        this.radio=Math.min(this.canvas.width/2,this.canvas.height/2)
        this.context=this.canvas.getContext("2d");
        this.valores=valores;
        this.tamanoDonut=0;

        /**
         * Dibuja un gráfico de pastel
         */
        this.dibujar=function() {
            this.total=this.getTotal();
            var valor=0;
            var inicioAngulo=0;
            var angulo=0;

            // creamos los quesos del pastel
            for(var i in this.valores)
            {
                valor=valores[i]["valor"];
                color=valores[i]["color"];
                angulo=2*Math.PI*valor/this.total;

                this.context.fillStyle=color;
                this.context.beginPath();
                this.context.moveTo(this.canvas.width/2, this.canvas.height/2);
                this.context.arc(this.canvas.width/2, this.canvas.height/2, this.radio, inicioAngulo, (inicioAngulo+angulo));
                this.context.closePath();
                this.context.fill();
                inicioAngulo+=angulo;
            }
        }

        /**
         * Dibuja un gráfico de pastel con una redonda en medio en modo de donut
         * Tiene que recibir:
         *	el tamaño de la redonda central (0 no hay redonda - 1 es todo)
         *	el color de la redonda
         */
        this.dibujarDonut=function(tamano,color) {
            this.tamanoDonut=tamano;
            this.dibujar();

            // creamos un circulo del color recibido en medio
            this.context.fillStyle=color;
            this.context.beginPath();
            this.context.moveTo(this.canvas.width/2, this.canvas.height/2);
            this.context.arc(this.canvas.width/2, this.canvas.height/2, this.radio*tamano, 0, 2*Math.PI);
            this.context.closePath();
            this.context.fill();
        }

        /**
         * Pone el tanto por ciento de cada uno de los valores
         * Tiene que recibir:
         *	el color del texto
         */
        this.ponerPorCiento=function(color){
            var valor=0;
            var etiquetaX=0;
            var etiquetaY=0;
            var inicioAngulo=0;
            var angulo=0;
            var texto="";
            var incrementar=0;

            // si hemos dibujado un donut, tenemos que incrementar el valor del radio
            // para que quede centrado
            if(this.tamanoDonut)
                incrementar=(this.radio*this.tamanoDonut)/2;

            this.context.font="bold 12pt Calibri";
            this.context.fillStyle=color;
            for(var i in this.valores)
            {
                valor=valores[i]["valor"];
                angulo=2*Math.PI*valor/this.total;

                // calculamos la posición del texto
                etiquetaX=this.canvas.width/2+(incrementar+this.radio/2)*Math.cos(inicioAngulo+angulo/2);
                etiquetaY=this.canvas.height/2+(incrementar+this.radio/2)*Math.sin(inicioAngulo+angulo/2);

                texto=Math.round(100*valor/this.total);

                // movemos la posición unos pixels si estamos en la parte izquierda
                // del pastel para que quede mas centrado
                if(etiquetaX<this.canvas.width/2)
                    etiquetaX-=10;

                // ponemos los valores
                this.context.beginPath();
                this.context.fillText(texto+"%", etiquetaX, etiquetaY);
                this.context.stroke();

                inicioAngulo+=angulo;
            }
        }

        /**
         * Function que devuelve la suma del total de los valores recibidos en el array
         */
        this.getTotal=function() {
            var total=0;
            for(var i in this.valores)
            {
                total+=valores[i]["valor"];
            }
            return total;
        }

        /**
         * Función que devuelve una lista (<ul><li>) con la leyenda
         * Tiene que recibir el id donde poner la leyenda
         */
        this.ponerLeyenda=function(leyendaId) {
            var codigoHTML="<ul class='leyenda'>";

            for(var i in this.valores)
            {
                codigoHTML+="<li><span style='background-color:"+valores[i]["color"]+"'></span>"+valores[i]["name"]+"</li>";
            }
            codigoHTML+="</ul>";
            document.getElementById(leyendaId).innerHTML=codigoHTML;
        }
    }

    // generamos el primer pastel
    var pastel=new miPastel("canvas1",300,300,valores);
    pastel.dibujar();
    pastel.ponerPorCiento("white");
    pastel.ponerLeyenda("leyenda1");
}