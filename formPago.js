document.getElementById("contenedor").classList.remove("contenedor-activo");
let profile = document.getElementById("img-user");
let ul = document.getElementById("ul-user");
let logOutButton = document.getElementById("logout");

let btn = document.getElementById("btn-buy");


let inputs = document.querySelectorAll(".input");

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

    const res = await fetch("http://34.204.81.172/api/products/");
    const data = await res.json();

    const resCart = await fetch("http://34.204.81.172/api/cart/");
    const dataCart = await resCart.json();

    let idUser;
    userSessionState.forEach(user => {
        idUser = user.idUsuario;
    });

    const resIdPedido = await fetch(`http://34.204.81.172/api/venta/maxIdPedido/${idUser}`);
    const dataIdPedido = await resIdPedido.json();
    let maxIdPedido;
    dataIdPedido.forEach(idMax => {
        maxIdPedido = idMax.maxIdPedido;
    });

    document.getElementById("err-blanks").classList.remove("err-blanks-activo");
    let validarCampos = false;
    btn.addEventListener("click", (e) => {
        inputs.forEach((e) => {
            if (e.value == 0) {
                document.getElementById("err-blanks").classList.add("err-blanks-activo");
            } else {
                validarCampos = true;

            }
        });
        if (validarCampos) {
            let idPedido;
            let fecha = new Date();
            let dia = fecha.getDay();
            let mes = fecha.getMonth() + 1;
            let año = fecha.getFullYear();

            dia = ('0' + dia).slice(-2);
            mes = ('0' + mes).slice(-2);

            let formatFecha = `${año}-${mes}-${dia}`;
            let total = 0;
            dataCart.forEach(item => {
                if (item.idUsuario == idUser) {
                    if ((item.idPedido-1) == maxIdPedido || maxIdPedido == null) {
                        idPedido = item.idPedido;
                        total += parseInt(item.total);
                    }
                }
            });
            insertVenta(idUser, idPedido, formatFecha, total)

            let countryInput = document.getElementById("country").value;
            let streetInput = document.getElementById("street").value;
            let postalInput = document.getElementById("postalcode").value;
            let cityInput = document.getElementById("city").value;
            let stateInput = document.getElementById("state").value;
            let cardInput = document.getElementById("card").value;
            let monthInput = document.getElementById("month").value;
            let yearInput = document.getElementById("year").value;
            let cvvInput = document.getElementById("cvv").value;
            insertShipping(idUser, countryInput, streetInput, postalInput, cityInput, stateInput, cardInput, monthInput, yearInput, cvvInput);
            document.getElementById("contenedor").classList.add("contenedor-activo");
            setTimeout(() => {
                window.location.href = "pedidos.html";
            }, 3000)
        }
    });


}

const insertVenta = (idUsuario, idPedido, fecha, total) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "idUsuario": idUsuario,
        "idPedido": idPedido,
        "fecha": fecha,
        "total": total
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://34.204.81.172/api/venta", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

const insertShipping = (idUsuario, country, street, postal, city, state, card, months, years, cvv) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "idUsuario": idUsuario,
        "country": country,
        "street": street,
        "postal": postal,
        "city": city,
        "state": state,
        "card": card,
        "months": months,
        "years": years,
        "cvv": cvv
    });



    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://34.204.81.172/api/shipping", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}