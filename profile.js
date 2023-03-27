let profile = document.getElementById("img-user");
let ul = document.getElementById("ul-user");
let logOutButton = document.getElementById("logout");

$(profile).hover(function () {
    $(ul).css({
        "display": "block"
    });
});

$(ul).hover(function () {
    $(ul).css({
        "display": "block"
    });
}, function () {
    $(ul).css({
        "display": "none"
    });
});

window.onload = () => {
    cargarElementos();
}

const cargarElementos = async () => {
    const resSate = await fetch("http://34.204.81.172/api/session");
    const userSessionState = await resSate.json();
    if (userSessionState.length > 0) {
        let idSession = "";
        userSessionState.forEach(usuario => {
            idSession = usuario.idUsuario;
        });

        const res = await fetch("http://34.204.81.172/api/users");
        const users = await res.json();

        logOutButton.addEventListener("click", () => {
            logOut(idSession);
            window.location.href = "index.html";
        });


        for (let usuario of users) {
            if (idSession == usuario.idUsuario) {
                let titleProfile = document.getElementById("nombre-user");
                let username = document.getElementById("username");
                let name = document.getElementById("name");
                let nac = document.getElementById("nac");
                let password = document.getElementById("password");
                let email = document.getElementById("email");
                let lastname = document.getElementById("apellido");
                if ((usuario.nombre).includes(" ")) {
                    let partTitle = [];
                    partTitle = usuario.nombre.split(" ");
                    titleProfile.innerText = partTitle[0] + "\n" + partTitle[1];
                    let userN = (usuario.nombre).replace(" ", "");
                    username.innerText = "@" + (userN).toLowerCase();
                } else {
                    titleProfile.innerText = usuario.nombre;
                    username.innerText = "@" + (usuario.nombre).toLowerCase();
                }
                name.value = usuario.nombre;
                lastname.value = usuario.apellido;
                nac.value = (usuario.fechaNac).substring(0, 10);
                password.value = usuario.contraseña;
                email.value = usuario.correo;

                let editar = document.getElementById("a-editar");
                editar.addEventListener("click", (e) => {
                    editarUsuario(usuario.idUsuario, name.value, lastname.value, email.value, password.value, nac.value);
                });

                let deleteA = document.getElementById("delete-a");
                deleteA.addEventListener("click", (e) => {
                    deleteAccount(usuario.idUsuario);
                    window.location.href = "profile.html";
                });

                let logOutA = document.getElementById("logout-a");
                logOutA.addEventListener("click", (e) => {
                    logOut(usuario.idUsuario);
                    window.location.href = "index.html";
                });

                break;
            }
        }
    } else {
        window.location.href = "index.html";
    }




}

const logOut = (idUsuario) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = "";

    var requestOptions = {
        method: 'DELETE',
        body: raw,
        redirect: 'follow'
    };

    fetch(`http://34.204.81.172/api/session/${idUsuario}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

}

const editarUsuario = (idUsuario, nombre, apellido, email, password, nac) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "nombre": nombre,
        "apellido": apellido,
        "correo": email,
        "contraseña": password,
        "fechaNac": nac
    });

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(`http://34.204.81.172/api/users/${idUsuario}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

const deleteAccount = (idUsuario) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = "";

    var requestOptions = {
        method: 'DELETE',
        body: raw,
        redirect: 'follow'
    };

    fetch(`http://34.204.81.172/api/users/${idUsuario}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

}