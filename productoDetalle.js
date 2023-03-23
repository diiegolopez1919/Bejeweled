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
    let cont = 0;
    let cartText = document.getElementById("circulo-cart");
    separacion = window.location.href.split("=");
    id = separacion[1];
    const res = await fetch("http://localhost:3308/api/products/" + id + "");
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

    console.log(dataIdPedido)
    
    if (dataCart.length > 0) {
        dataCart.forEach(element => {
            if(element.idUsuario == idUser){
                dataIdPedido.forEach(idMax => {
                    if(idMax.maxIdPedido == (element.idPedido-1) || idMax.maxIdPedido == null){
                        cont++;
                        cartText.innerText = cont;
                        document.getElementById("circulo-cart").classList.add("circulo-cart-activo");
                    } else {
                        document.getElementById("circulo-cart").classList.remove("circulo-cart-activo");
                    }
                });
               
            }
        });
        
    } 

    if (userSessionState.length > 0) {
        document.getElementById("login-li").classList.add("login-li-inactivo");
        document.getElementById("reg-li").classList.add("login-li-inactivo");
        document.getElementById("users-div").classList.add("users-div-activo");
      } else {
        document.getElementById("login-li").classList.remove("login-li-inactivo");
        document.getElementById("reg-li").classList.remove("login-li-inactivo");
        document.getElementById("users-div").classList.remove("users-div-activo");
      }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let divProductos = document.getElementById("div-productos");
    data.forEach(res => {
        let div1 = crearDiv("cont-card");
        let div2 = crearDiv("imagen-div");
        let div3 = crearDiv("info-div");
        let div4 = crearDiv("imagenes-rest");
        let img1 = crearImagen(res.imagen1, "img-product");
        let img2 = crearImagen(res.imagen2, "img2-product");
        let img3 = crearImagen(res.imagen3, "img2-product");
        let img4 = crearImagen(res.imagen4, "img2-product");
        let h1 = crearH1("nombre-producto", res.idProducto);
        let h2 = crearH1("precio-producto");
        let p = crearP("descripcion-producto");
        p.innerText = res.descripcion;
        if ((res.precio.toString()).includes(".")) {
            h2.innerText = "$ " + res.precio;
        } else {
            h2.innerText = "$ " + res.precio + ".00";
        }
        let inputCant = crearInputCantidad();
        let btn = crearBoton("submit", "btn-submit", "Add To Cart", "btn-submit", "btn-submit");
        let err = crearH1("error-cart", "error-cart");
        err.innerText = "*ERROR: Product already in cart.";
        btn.innerText = "Add To Cart";
        let validarCartItem = false;
        for (let itemC of dataCart) {
            if(itemC.idUsuario == idUser){
                for(let idMax of dataIdPedido){
                    if(idMax.maxIdPedido == (itemC.idPedido-1) || idMax.maxIdPedido == null){
                        if(itemC.idProd == res.idProducto){
                            validarCartItem = true;
                            break;
                        }
                    }
                }   
            }
        }
        btn.addEventListener("click", (e) => {
            if (validarCartItem) {
                document.getElementById("error-cart").classList.add("error-cart-activo");
            } else {
                cont = cont + 1;
                cartText.innerText = cont;

                for(let idPedido of dataIdPedido){
                    if(idPedido.maxIdPedido == null){
                        var raw = JSON.stringify({
                            "idUsuario": idUser,
                            "idPedido": 1,
                            "idProd": res.idProducto,
                            "precio": res.precio,
                            "cantidad": document.getElementById("inputQ").value,
                            "total": document.getElementById("inputQ").value * res.precio
                        });
                    } else {
                        var raw = JSON.stringify({
                            "idUsuario": idUser,
                            "idPedido": parseInt(idPedido.maxIdPedido) + 1,
                            "idProd": res.idProducto,
                            "precio": res.precio,
                            "cantidad": document.getElementById("inputQ").value,
                            "total": document.getElementById("inputQ").value * res.precio
                        });
                    }
                }

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                fetch("http://localhost:3308/api/cart", requestOptions)
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
            }
        });
        h1.innerText = res.nombre;
        div4.append(img2, img3, img4);
        div2.append(div4);
        div2.append(img1);
        div1.append(div2);
        div3.append(h1);
        div3.append(h2);
        div3.append(inputCant);
        div3.append(btn);
        div3.append(err);
        div3.append(p);
        div1.append(div3);
        divProductos.append(div1);
        document.getElementById("error-cart").classList.remove("error-cart-activo");
    });
    clickQuantitySelector();
    logOutButton.addEventListener("click", () => {
        userSessionState.forEach(user => {
          logOut(user.idUsuario);
        });
      });
}

const logOut = (idUsuario) => {
    var raw = "";
  
    var requestOptions = {
      method: 'DELETE',
      body: raw,
      redirect: 'follow'
    };
  
    fetch("http://localhost:3308/api/session/"+idUsuario, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
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

const crearInputCantidad = () => {
    let divFromC = crearDiv("Form-QuantitySelector");
    let divCant = crearDiv("QuantitySelector");
    let spanMinus = crearSpan("quantity-selector", "minus");
    let spanPlus = crearSpan("quantity-selector", "plus");
    let input = crearInput("text", "quantity", "1", "quantity-input", "inputQ");

    spanMinus.innerHTML = '<svg class="Icon Icon-minus" role="presentation" viewBox="0 0 16 2"><path d="M1,1 L15,1" stroke="#53fad6 " fill="none" fill-rule="evenodd" stroke-linecap="square"></path></svg>';
    spanPlus.innerHTML = '<svg class="Icon Icon-plus" role="presentation" viewBox="0 0 16 16"><g stroke="#53fad6 " fill="none" fill-rule="evenodd" stroke-linecap="square"><path d="M8,1 L8,15"></path><path d="M1,8 L15,8"></path></g></svg>';
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

const crearP = (className = "", id = "") => {
    let p = document.createElement("p");
    if (className) p.className = className;
    if (id) p.setAttribute("id", id);
    return p;
}

const crearImagen = (src, className = "", id = "", alt = "") => {
    let img = document.createElement("img");
    img.src = src;
    if (className) img.className = className;
    if (id) img.setAttribute("id", id);
    if (alt) img.alt = alt;
    return img;
}

const establecerClick = (idProducto) => {
    let h1 = document.getElementById(idProducto);
    h1.addEventListener("click", (e) => {

    });
}

const clickQuantitySelector = () => {
    let spanMinus = document.getElementById("minus");
    let spanPlus = document.getElementById("plus");
    spanMinus.addEventListener("click", (e) => {
        let quantity = document.getElementById("inputQ").value;
        document.getElementById("inputQ").value = parseInt(quantity) - 1;
    });
    spanPlus.addEventListener("click", (e) => {
        let quantity = document.getElementById("inputQ").value;
        document.getElementById("inputQ").value = parseInt(quantity) + 1;
    });
}

const cart = (data, idProd, cant) => {
    let divCont = crearDiv("divCont");
    let divCart = crearDiv("divCart");
    data.forEach(res => {
        if (res.idProducto == idProd) {
            let divProd = crearDiv("divProd");
            let img = crearImagen(res.imagen, "img-cart");
            let h1 = crearH1("nombre-cart-prod");
            h1.innerText = res.nombre;
            let h2 = crearH1("cant-cart");
            h2.innerText = cant;
            let h3 = crearH1("precio-cart");
            if ((res.precio.toString()).includes(".")) {
                h3.innerText = "$ " + res.precio;
            } else {
                h3.innerText = "$ " + res.precio + ".00";
            }
            divProd.append(img);
            divProd.append(h1);
            divProd.append(h2);
            divProd.append(h3);
            divCart.append(divProd);
            divCont.append(s)
        }
    });

}