const formulario = document.getElementById("form");
const inputs = document.querySelectorAll("#form input");

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{2,20}$/, // Letras y espacios, pueden llevar acentos.
	apellido: /^[a-zA-ZÀ-ÿ\s]{2,50}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
}

const campos = {
    nombre: false,
    apellido: false,
    date: false,
    email: false,
    password: false
}

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "nombre":
            validarCampo(expresiones.nombre, e.target,"nombre");
            break;
        case "apellido":
            validarCampo(expresiones.apellido, e.target,"apellido");
            break;
        case "email":
            validarCampo(expresiones.correo, e.target,"email");
            break;
        case "fechaNac":
            validarFecha();
            break;
        case "password":
            validarCampo(expresiones.password, e.target,"password");
            validarPasswords();
            break;
        case "password2":
            validarPasswords();
            break;
    }
}

const validarFecha = () => {
    const inputDate = document.getElementById("fechaNac");
    if(inputDate.value !== ""){
        campos['date'] = true;
    } else {
        campos['date'] = false;
    }
}

const validarPasswords = () => {
    const inputPass1 = document.getElementById("password");
    const inputPass2 = document.getElementById("password2");
    if (inputPass1.value !== inputPass2.value) {
        document.getElementById(`grupo_password2`).classList.add('form_grupo-incorrecto');
        document.getElementById(`grupo_password2`).classList.remove('form_grupo-correcto');
        document.querySelector(`#grupo_password2 i`).classList.remove("fa-check-circle");
        document.querySelector(`#grupo_password2 i`).classList.add("fa-times-circle");
        document.querySelector(`#grupo_password2 .input-error`).classList.add("form_mensaje-activo");
        campos['password'] = false;
    } else {
        document.getElementById(`grupo_password2`).classList.remove('form_grupo-incorrecto');
        document.getElementById(`grupo_password2`).classList.add('form_grupo-correcto');
        document.querySelector(`#grupo_password2 i`).classList.remove("fa-times-circle");
        document.querySelector(`#grupo_password2 i`).classList.add("fa-check-circle");
        document.querySelector(`#grupo_password2 .input-error`).classList.remove("form_mensaje-activo");
        campos['password'] = true;
    }
}

const validarCampo = (expresion, input, campo) => {
    if(expresion.test(input.value)){
        document.getElementById(`grupo_${campo}`).classList.remove('form_grupo-incorrecto');
        document.getElementById(`grupo_${campo}`).classList.add('form_grupo-correcto');
        document.querySelector(`#grupo_${campo} i`).classList.remove("fa-times-circle");
        document.querySelector(`#grupo_${campo} i`).classList.add("fa-check-circle");
        document.querySelector(`#grupo_${campo} .input-error`).classList.remove("form_mensaje-activo");
        campos[campo] = true;
    } else {
        document.getElementById(`grupo_${campo}`).classList.add('form_grupo-incorrecto');
        document.getElementById(`grupo_${campo}`).classList.remove('form_grupo-correcto');
        document.querySelector(`#grupo_${campo} i`).classList.remove("fa-check-circle");
        document.querySelector(`#grupo_${campo} i`).classList.add("fa-times-circle");
        document.querySelector(`#grupo_${campo} .input-error`).classList.add("form_mensaje-activo");
        campos[campo] = false;
    }
}

inputs.forEach((input) => {
    input.addEventListener("keyup",  validarFormulario); // Al lventar una tecla
    input.addEventListener("blur",  validarFormulario); // Al dar click fuera del input
})

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    if(campos.nombre && campos.apellido && campos.date && campos.email && campos.password){
        let nombre = document.getElementById("nombre").value;
        let apellido = document.getElementById("apellido").value;
        let date = document.getElementById("fechaNac").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        ingresarDatos(nombre, apellido, date, email, password);
        document.querySelectorAll(".form_grupo-correcto").forEach((icono)=>{
            icono.classList.remove("form_grupo-correcto");
        });
        formulario.reset();
    } else {
        document.getElementById("form_mensaje").classList.add("form_mensaje-activo");
    }
})

const ingresarDatos = (nombre, apellido, date, email, password) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "nombre": nombre,
    "apellido": apellido,
    "fechaNac": date,
    "correo": email,
    "contraseña": password
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("http://localhost:3308/api/users", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}