function finder(nombre){
  let index = carrito.findIndex(object => {
    return object.nombre === nombre;
  });
  return index
}

function carritoInner(element,dom,i) {
  subtotal = element.precioUn*element.cant
  dom.innerHTML = `<div id=itemC${i}>${element.cant} x ${element.nombre} $${subtotal}</div>`
  funcCalcularTotalScript()
}

function carritoHeaderBuilder() {
  const listaCarritoDiv = document.getElementById("listaCarritoDiv")
  listaCarritoDiv.innerHTML = `
  <thead>
  <tr>
    <th>Cantidad</th>
    <th>Cerveza</th>
    <th>Subtotal</th>
  </tr>
  </thead>

  <tbody id="listaCarrito">
  </tbody>`
}

function buttonsFunc(i){
  
  const btnAgregar = document.getElementById(`agregar${i}`)

  btnAgregar.addEventListener("click",()=>{
    carrito[i].cant++
    modifyList(i)
    funcCalcularTotalScript()
  })

  
  const btnSacar = document.getElementById(`sacar${i}`)

  btnSacar.addEventListener("click",()=>{
  carrito[i].cant--
  modifyList(i)
  if(carrito[i].cant==0){
    carrito.splice(i,1)
    carritoHeaderBuilder()
    carrito.forEach((element,index) => {
      listInnerHtml(index)
    })
    
    funcCalcularTotalScript()
  }

})
}

function listInnerHtml(i){
  const listaCarrito = document.getElementById("listaCarrito")

  const tr = document.createElement("tr")
  tr.setAttribute("id", `itemC${i}`);
  let subtotal = carrito[i].precioUn*carrito[i].cant

  tr.innerHTML = `

    <td><div class="cantCarr">${carrito[i].cant}<div class="buttonsDiv"><button id="agregar${i}" class="myButton agregar">+</button><button id="sacar${i}" class="myButton sacar">-</button></div></div></td>
    <td>${carrito[i].nombre}</td>
    <td>$${subtotal}</td>

  `
  listaCarrito.appendChild(tr)

  buttonsFunc(i)

  funcCalcularTotalScript()
}

function modifyList(i) {
    const itemToModify = document.getElementById(`itemC${i}`)
    let subtotal = carrito[i].precioUn*carrito[i].cant
    itemToModify.innerHTML = `

    <td><div class="cantCarr">${carrito[i].cant}<div class="buttonsDiv"><button id="agregar${i}" class="myButton agregar">+</button><button id="sacar${i}" class="myButton sacar">-</button></div></div></td>
    <td>${carrito[i].nombre}</td>
    <td>$${subtotal}</td>
    `
    buttonsFunc(i)
    funcCalcularTotalScript()
}


function funcCalcularTotalScript(){
  const totalCarrito = document.getElementById("totalCarrito")
  totalCarritoNro = 0
  carrito.forEach(element => {
    totalCarritoNro+=element.precioUn*element.cant
  });
  
  totalCarrito.innerHTML = "Total: $"+totalCarritoNro
  const carritoJSON = JSON.stringify(carrito)
  localStorage.setItem("carrito", carritoJSON)
  return totalCarrito
}

function funcVaciarCarrito(){
  carrito = []
  localStorage.clear()
  funcCalcularTotalScript()
}

let totalCarritoNro = 0


let cervezasJSON = []
fetch("data.json")
  .then((resp) => resp.json())
  .then((data) => {
    data.forEach((element,i) => {

      const li = document.createElement("li")
      li.innerHTML = `
        
          <div class="animate__fadeInUp">
            <div class="card shadow-sm">
              <img src="./img/cerveza${i}.jpg" alt="" class="bd-placeholder-img card-img-top imgCover" width="100%" height="225">
              <div class="card-body">
                <h3>${element.nombre}</h3>
                <p class="card-text cardD ofHidden">${element.descripcion}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <small class="text-muted">Alc.: ${element.alcohol}</small>
                  <small class="text-muted">IBU: ${element.ibu}</small>
                  <span>$${element.precio}</span>
                  <div class="btn-group">
                    <input type="number" class="form-control cantInput" placeholder="Cant." size="1px" id="inputCant${i}">
                    <button type="button" class="btn btn-sm btn-outline-secondary" id="btnAgregar${i}">Agregar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
      `
      ul.appendChild(li)

      const inputCant = document.getElementById(`inputCant${i}`)
    const btnAgregar = document.getElementById(`btnAgregar${i}`)
    
    btnAgregar.addEventListener("click", () => {
    
      const cantidad = inputCant.value
      
      if(cantidad==="" || cantidad <=0) return

      let finded = finder(element.nombre)

      if(finded==-1){
          carrito.push({nombre:element.nombre, cant: cantidad, precioUn:element.precio})
          let length = carrito.length-1
          listInnerHtml(length)

      }else{
        for (let index = 0; index < cantidad; index++) {
          carrito[finded].cant++
        }
        console.log("entra a else")
        modifyList(finded)
      }

      
      const alertAgregado = document.getElementById("alertAgregado")
      const alertText = document.createElement("div")
      alertAgregado.appendChild(alertText)

      alertText.innerHTML = `Agregaste ${cantidad} ${element.nombre} al carrito.`


      const agregarAnimationIn = [
        {transform: "translateY(0px)"},
        {transform: "translateY(-150px)"}
      ]
      const agregarAnimationOut = [
        {transform: "translateY(0px)"},
        {transform: "translateY(150px)"}
      ]

      const animationAgregarDuration = {
        duration: 500,
        iterations: 1,
      }
      function funcAgregarAniIn() {
        alertText.style.bottom = "50px"
      }
      function funcAgregarAniOut() {
        alertText.style.bottom = "-100px"
      }

      function agregarOutTimer() {
        alertText.animate(agregarAnimationOut,animationAgregarDuration)
      }

      alertText.animate(agregarAnimationIn,animationAgregarDuration)
      setTimeout(funcAgregarAniIn,500)

      setTimeout(agregarOutTimer,4500)
      setTimeout(funcAgregarAniOut,5000)


      //Fin animacion agregar al carrito


      
      inputCant.value = ""
    })
  })})
  .catch((err) => console.log("Error inesperado", err))


let carritoVisible = false

const ul = document.getElementById("lista")

const containerCarrito = document.getElementById("containerCarrito")

const mostrarCarrito = document.getElementById("mostrarCarrito")

const panelCarrito = document.getElementById("panelCarrito")


let carrito = []
const carritoLS = JSON.parse(localStorage.getItem("carrito"))

if(carritoLS){
    carrito = carritoLS
}

carrito.forEach((element,i) => {
  listInnerHtml(i)
});


// Animacion pestaña carrito

const carritoAnimationIn = [
  {transform: "translateX(0vw)"},
  {transform: "translateX(-66vw)"}
]
const carritoAnimationOut = [
  {transform: "translateX(0vw)"},
  {transform: "translateX(66vw)"}
]

const animationDuration = {
  duration: 500,
  iterations: 1,
}
function funcAniIn() {
  panelCarrito.style.left = "34vw"
}
function funcAniOut() {
  panelCarrito.style.left = "100vw"
}
//Fin animacion pestaña carrito


mostrarCarrito.addEventListener("click",() =>{
  if(carritoVisible==false){
    carritoVisible = true
    panelCarrito.animate(carritoAnimationIn,animationDuration)
    setTimeout(funcAniIn,500)
}
})

const cerrarCarrito = document.getElementById("close")

cerrarCarrito.addEventListener("click",() =>{
  if(carritoVisible==true){
    carritoVisible=false
    panelCarrito.animate(carritoAnimationOut,animationDuration)
    setTimeout(funcAniOut,500)
    funcCalcularTotalScript()
  }
})

const vaciarCarrito = document.getElementById("vaciarCarrito")  

vaciarCarrito.addEventListener("click",() =>{
  carritoHeaderBuilder()
  funcVaciarCarrito()
})

// Boton finalizar compra

const finCompra = document.getElementById("finCompra")

finCompra.addEventListener("click",()=>{
  swal({
    title: "Compra finalizada",
    text:`El total de su compra es de $${totalCarritoNro}
    Gracias por comprar con nosotros!`,
    icon: "success",
    button: "Aceptar",
  });
  carritoHeaderBuilder()
  funcVaciarCarrito()
})