const formulario = document.getElementById("form");
var validarUsuario = false;
var idUsuario = "";
document.getElementById("form_mensaje").classList.remove("form_mensaje-activo");

window.onload = () => {
    getUsuarios();
}

const getUsuarios = async () => {
    const resSate = await fetch("http://localhost:3308/api/session");
    const userSessionState = await resSate.json();

    if (userSessionState.length > 0) {
        document.getElementById("div-login").classList.add("div-login-inactivo");
        document.getElementById("cont-message-session").classList.add("cont-message-session-active");
    } else {
        const res = await fetch("http://localhost:3308/api/users/");
        const data = await res.json();
        formulario.addEventListener("submit", (e) => {
            e.preventDefault();
            const inputUsuario = document.getElementById("email");
            const inputPass = document.getElementById("password");
            for (let usuario of data) {
                if (usuario.correo === inputUsuario.value && usuario.contraseña === inputPass.value) {
                    idUsuario = usuario.idUsuario;
                    validarUsuario = true;
                    break;
                }
            }
            if (validarUsuario) {
                insertIntoSession(idUsuario,"Logged in");
                setTimeout(() => {
                    window.location.href = "index.html";
                }, 1000);

            } else {
                document.getElementById("form_mensaje").classList.add("form_mensaje-activo");
            }
        });
    }

}

const insertIntoSession = (idUsuario, state) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "idUsuario": idUsuario,
        "state": state
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:3308/api/session", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}





