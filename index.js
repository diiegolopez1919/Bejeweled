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
  
  const resSate = await fetch("http://localhost:3308/api/session");
  const userSessionState = await resSate.json();

  const resCart = await fetch("http://localhost:3308/api/cart/");
    const dataCart = await resCart.json();

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