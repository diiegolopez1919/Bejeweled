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
  const res = await fetch("http://34.204.81.172/api/products/");
    const data = await res.json();
  
    const resCart = await fetch("http://34.204.81.172/api/cart/");
    const dataCart = await resCart.json();

    const resVenta = await fetch("http://34.204.81.172/api/venta/");
    const dataVenta = await resVenta.json();

    const resSate = await fetch("http://34.204.81.172/api/session");
    const userSessionState = await resSate.json();

    let idUser;
    userSessionState.forEach(user => {
        idUser = user.idUsuario;
    });

    const resIdPedido = await fetch(`http://34.204.81.172/api/venta/maxIdPedido/${idUser}`);
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

    if (userSessionState.length == 0) {
        window.location.href = "inicioSesion.html";
      }
    
    let divCont = document.getElementById("pedidos-list");
    let contV = 0;
    dataVenta.forEach(pedido => {
      if(pedido.idUsuario == idUser){
        console.log(pedido.idPedido)
        contV++;
        let divItem = crearDiv("item-pedido","item-pedido");
        let titleP = crearH1("titleP","titleP"+pedido.idVenta);
        let tot = crearH1("titleT");
        tot.innerText = "$" + pedido.total +".00";
        titleP.innerText = "Order " + contV;
        divItem.append(titleP,tot);
        divCont.append(divItem);
        let divDespleg = crearDiv("div-prod-cart", "div-prod-cart"+pedido.idVenta);
        dataCart.forEach(cart => {
          if(cart.idUsuario == pedido.idUsuario){
            if(cart.idPedido == pedido.idPedido){
              for(let prod of data){
                if(prod.idProducto == cart.idProd){
                  let divProds = crearDiv("prod-cart");
                  let img = crearImagen(prod.imagen1, "imagen-prod-list");
                  let nameProd = crearH1("name-prod");
                  nameProd.innerText = prod.nombre;
                  let cant = crearH1("cant-v");
                  cant.innerText = "Cantidad: "+cart.cantidad;
                  divProds.append(img,nameProd,cant);
                  divDespleg.append(divProds);
                  divCont.append(divDespleg);
                  break;
                }
              }
            }
          }
        });
        let clickOrder = document.getElementById("titleP"+pedido.idVenta);
        let div = document.getElementById("div-prod-cart"+pedido.idVenta);
        $(clickOrder).hover(function () {
          $(div).css({
            "display": "block"
          });
        });
        
        $(div).hover(function () {
          $(div).css({
            "display": "block"
          });
        }, function () {
          $(div).css({
            "display": "none"
          });
        });
      }
    });
}

const logOut = (idUsuario) => {
    var raw = "";
  
    var requestOptions = {
      method: 'DELETE',
      body: raw,
      redirect: 'follow'
    };
  
    fetch("http://34.204.81.172/api/session/"+idUsuario, requestOptions)
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