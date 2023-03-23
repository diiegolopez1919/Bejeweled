let btnSub = document.getElementById("pagar");

window.onload = () => {
    cargarElementos();
}

const cargarElementos = async () => {

    const res = await fetch("http://localhost:3308/api/products/");
    const data = await res.json();

    const resCart = await fetch("http://localhost:3308/api/cart/");
    const dataCart = await resCart.json();

    const resSate = await fetch("http://localhost:3308/api/session");
    const userSessionState = await resSate.json();

    let idUser;
    userSessionState.forEach(user => {
        idUser = user.idUsuario;
    });

    const resIdPedido = await fetch(`http://localhost:3308/api/venta/maxIdPedido/${idUser}`);
    const dataIdPedido = await resIdPedido.json();
    let maxIdPedido;
    dataIdPedido.forEach(idMax => {
        maxIdPedido = idMax.maxIdPedido;
    });

    let total = 0;
    dataCart.forEach(item => {
        if(item.idUsuario == idUser){
            if((item.idPedido -1)== maxIdPedido || maxIdPedido == null){
                for (let prod of data) {
                    if (prod.idProducto == item.idProd) {
                        let divCont = document.getElementById("div-cont-cart");
                        let a = crearDiv("cart-item", "cart-item-" + item.idProd);
                        let img = crearImagen(prod.imagen1, "cart-img");
                        let h1 = crearH1("cart-prod-name");
                        let cant = crearInputCantidad(prod.idProducto);
                        let precio = crearH1("cart-precio", "cart-precio" + prod.idProducto);
                        let basura = crearImagen("assets/img/basura.png", "basura-cart", "basura-cart" + prod.idProducto)
        
                        //let quantity = document.getElementById("inputQ").value;
                        //let precioActual = parseInt(quantity) * item.precio;
                        h1.innerText = prod.nombre;
        
                        if ((item.total.toString()).includes(".")) {
                            precio.innerText = "$ " + item.total;
                        } else {
                            precio.innerText = "$ " + item.total + ".00";
                        }
                        total += item.total;
                        a.append(img, h1, cant, precio, basura);
                        divCont.append(a);
                        clickDeleteItem(item.idProd, item.idCart);
                        clickQuantitySelector(item.idCart, idUser, item.idPedido, item.idProd, item.precio);
                        document.getElementById("inputQ" + prod.idProducto).value = item.cantidad;
                        btnSub.addEventListener("click", (e) => {
                            window.location.href = "formPago.html";
                        });
                    }
                }
            }
            
        }
    });

    

    let totalH1 = document.getElementById("cart-total");
    if ((total.toString()).includes(".")) {
        totalH1.innerText = "$ " + total;
    } else {
        totalH1.innerText = "$ " + total + ".00";
    }
}

let flecha = document.getElementById("flecha-back");
flecha.addEventListener("click", () => {
    window.history.back();
});

const clickDeleteItem = (idProd, idCart) => {
    let iconDelete = document.getElementById("basura-cart" + idProd);
    iconDelete.addEventListener("click", () => {
        deleteCart(idCart);
        window.location.href = "cart.html";
    });
}



const crearBoton = (type, name, value, className = "", id = "") => {
    let btn = document.createElement("button");
    btn.type = type;
    btn.name = name;
    btn.name = value;
    if (className) btn.className = className;
    if (id) btn.setAttribute("id", id);
    return btn;
}

const crearInputCantidad = (idProducto) => {
    let divFromC = crearDiv("Form-QuantitySelector");
    let divCant = crearDiv("QuantitySelector");
    let spanMinus = crearSpan("quantity-selector", "minus" + idProducto);
    let spanPlus = crearSpan("quantity-selector", "plus" + idProducto);
    let input = crearInput("text", "quantity", "1", "quantity-input", "inputQ" + idProducto);

    spanMinus.innerHTML = '<svg class="Icon Icon-minus" role="presentation" viewBox="0 0 16 2"><path d="M1,1 L15,1" stroke="#ffffff " fill="none" fill-rule="evenodd" stroke-linecap="square"></path></svg>';
    spanPlus.innerHTML = '<svg class="Icon Icon-plus" role="presentation" viewBox="0 0 16 16"><g stroke="#ffffff " fill="none" fill-rule="evenodd" stroke-linecap="square"><path d="M8,1 L8,15"></path><path d="M1,8 L15,8"></path></g></svg>';
    divCant.append(spanMinus);
    divCant.append(input);
    divCant.append(spanPlus);
    divFromC.append(divCant);
    return divFromC;
}


const crearInput = (type, name, value, className = "", id = "") => {
    let input = document.createElement("input");
    input.type = type;
    input.value = value;
    input.name = name;
    if (className) input.className = className;
    if (id) input.setAttribute("id", id);
    return input;
}

const crearSpan = (className = "", id = "") => {
    let span = document.createElement("span");
    if (className) span.className = className;
    if (id) span.setAttribute("id", id);
    return span;
}

const crearDiv = (className = "", id = "") => {
    let div = document.createElement("div");
    if (className) div.className = className;
    if (id) div.setAttribute("id", id);
    return div;
}

const crearH1 = (className = "", id = "") => {
    let h1 = document.createElement("h1");
    if (className) h1.className = className;
    if (id) h1.setAttribute("id", id);
    return h1;
}

const crearImagen = (src, className = "", id = "", alt = "") => {
    let img = document.createElement("img");
    img.src = src;
    if (className) img.className = className;
    if (id) img.setAttribute("id", id);
    if (alt) img.alt = alt;
    return img;
}

const clickQuantitySelector = (idCart, idUsuario, idPedido, idProd, precio) => {
    let spanMinus = document.getElementById("minus" + idProd);
    let spanPlus = document.getElementById("plus" + idProd);
    spanMinus.addEventListener("click", (e) => {
        let quantity = document.getElementById("inputQ" + idProd).value;
        if (parseInt(quantity) > 1) {
            document.getElementById("inputQ" + idProd).value = parseInt(quantity) - 1;
            let totalC = parseInt(document.getElementById("inputQ" + idProd).value) * precio;
            let precioActualizado = document.getElementById("cart-precio" + idProd);
            if ((totalC.toString()).includes(".")) {
                precioActualizado.innerText = "$ " + totalC;
            } else {
                precioActualizado.innerText = "$ " + totalC + ".00";
            }
            let totalH1 = document.getElementById("cart-total");
            let totalCart = [];
            let numTotal = []
            totalCart = totalH1.innerText.split("$");
            numTotal = totalCart[1].split(".");
            totalH1.innerText = "$" + (parseInt(numTotal[0]) - precio) + ".00";

            editarQuantity(idCart, idUsuario, idPedido, idProd, precio, parseInt(document.getElementById("inputQ" + idProd).value), totalC);

        }

    });
    spanPlus.addEventListener("click", (e) => {
        let quantity = document.getElementById("inputQ" + idProd).value;
        if (parseInt(quantity) >= 1) {
            document.getElementById("inputQ" + idProd).value = parseInt(quantity) + 1;
            let totalC = parseInt(document.getElementById("inputQ" + idProd).value) * precio;
            let precioActualizado = document.getElementById("cart-precio" + idProd);
            if ((totalC.toString()).includes(".")) {
                precioActualizado.innerText = "$ " + totalC;
            } else {
                precioActualizado.innerText = "$ " + totalC + ".00";
            }
            let totalH1 = document.getElementById("cart-total");
            let totalCart = [];
            let numTotal = []
            totalCart = totalH1.innerText.split("$");
            numTotal = totalCart[1].split(".");
            totalH1.innerText = "$" + (parseInt(numTotal[0]) + precio) + ".00";
            editarQuantity(idCart, idUsuario, idPedido, idProd, precio, parseInt(document.getElementById("inputQ" + idProd).value), totalC);
        }
    });
}

const editarQuantity = (idCart, idUsuario, idPedido, idProd, precio, cantidad, total) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "idUsuario": idUsuario,
        "idPedido": idPedido,
        "idProd": idProd,
        "precio": precio,
        "cantidad": cantidad,
        "total": total
    });
    console.log(idCart);
    console.log(raw);

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(`http://localhost:3308/api/cart/${idCart}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

const deleteCart = (idCart) => {
    var raw = "";

    var requestOptions = {
        method: 'DELETE',
        body: raw,
        redirect: 'follow'
    };

    fetch(`http://localhost:3308/api/cart/${idCart}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}