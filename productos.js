var url = "";

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

const cargarElementos = async() => {
    let cont = 0;
    let cartText = document.getElementById("circulo-cart");
    separacion = window.location.href.split("=");
    id = separacion[1];
    if(id != undefined){
        url = "http://localhost:3308/api/products/artista/"+id+""; 
    } else {
        url = "http://localhost:3308/api/products/";
    }
    
    const res = await fetch (url);
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

    let divProductos = document.getElementById("div-cont");
    data.forEach(res => {
        let div1 = crearDiv("cont-card");
        let div2 = crearDiv("card");
        let img = crearImagen(res.imagen1,"img-product");
        let h1 = crearH1("nombre-producto", res.idProducto);
        let h2 = crearH1("precio-producto");
        if((res.precio.toString()).includes(".")){
            h2.innerText = "$ " + res.precio;
        } else {
            h2.innerText = "$ " + res.precio + ".00";
        }
        h1.innerText = res.nombre;
        div2.append(img);
        div1.append(div2);
        div1.append(h1);
        div1.append(h2);
        divProductos.append(div1);
        establecerClick(res.idProducto);
    });

    logOutButton.addEventListener("click", () => {
        userSessionState.forEach(user => {
          logOut(user.idUsuario);
        });
      })
    
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

const crearDiv = (className="",id="") => {
    let div = document.createElement("div");
    if(className) div.className = className;
    if(id) div.setAttribute("id", id);
    return div;
}

const crearH1 = (className="",id="") => {
    let h1 = document.createElement("h1");
    if(className) h1.className = className;
    if(id) h1.setAttribute("id", id);
    return h1;
}

const crearImagen = (src, className="", id="", alt="") => {
    let img = document.createElement("img");
    img.src = src;
    if(className) img.className = className;
    if(id) img.setAttribute("id", id);
    if(alt) img.alt = alt;
    return img;
}

const establecerClick = (idProducto) => {
    let h1 = document.getElementById(idProducto);
    h1.addEventListener("click", (e) => {
        window.location.href = "productoDetalle.html?id=" + idProducto;
    });
}

