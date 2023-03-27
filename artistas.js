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
    const res = await fetch ("http://34.204.81.172/api/artists/");
    const data = await res.json();

    let cont = 0;
    let cartText = document.getElementById("circulo-cart");
    const resSate = await fetch("http://34.204.81.172/api/session");
    const userSessionState = await resSate.json();
  
    const resCart = await fetch("http://34.204.81.172/api/cart/");
      const dataCart = await resCart.json();
  
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

    let divArtistas = document.getElementById("div-cont");
    data.forEach(res => {
        idArtista = res.idArtista;
        let div1 = crearDiv("cont-card");
        let div2 = crearDiv("card");
        let img = crearImagen(res.imagen,"img-artista",res.idArtista);
        let h1 = crearH1("nombre-artista");
        if((res.nombre).includes(" ")){
            let part = [];
            part = res.nombre.split(" ");
            h1.innerText = part[0] + "\n" + part[1];
        } else {
            h1.innerText = res.nombre;
        }
        div2.append(h1);
        div2.append(img);
        div1.append(div2);
        divArtistas.append(div1);
        establecerClick(res.idArtista);
    });

    logOutButton.addEventListener("click", () => {
        userSessionState.forEach(user => {
          logOut(idUser);
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

const establecerClick = (idArtista) => {
    let img = document.getElementById(idArtista);
    img.addEventListener("click", (e) => {
            window.location.href = "productos.html?=" + idArtista;
    });
}







