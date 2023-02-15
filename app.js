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

// function displayNone() {
//   document.getElementById("alertAgregado").style.display = "none"
// }

function funcCalcularTotalScript(){
  // const totalCarrito = document.createElement("div")
  // containerCarrito.appendChild(totalCarrito)
  const totalCarrito = document.getElementById("totalCarrito")
  let t = 0
  carrito.forEach(element => {
    t+=element.precioUn*element.cant
  });
  
  totalCarrito.innerHTML = "Total: $"+t
  return totalCarrito
}

function funcVaciarCarrito(){
  carrito = []
  localStorage.clear()
  funcCalcularTotalScript()
}

// function funcAgregarScriptCarrito{

// }

// function funcEliminarItempScriptCarrito() {
  
// }

class Beer{
  constructor(nombre, precio, alcohol, ibu, descripcion){
      this.nombre = nombre
      this.precio = Number(precio)            // valor del porron
      this.alcohol = Number(alcohol)
      this.ibu = Number(ibu)
      this.descripcion = descripcion
      this.cantidad = 0                       //cantidad que va a ser usado para armar el carrito de compras
  }
  agregar(cant){
      this.cantidad += cant
  }
  dtoMayor(){
      this.precio *= 4       // cada botellon viene por 2 litros, el porron es medio litro, asi que lo multiplico por el equivalente
      this.precio *= 0.85      // 15% de descuento por comprar por botellon
  }
}

const beer0 = new Beer("English Brown",330,5.5,22,"Elaborada con maltas caramelo, un toque de maltas oscuras y lúpulos ingleses, agradable aroma acaramelado y ligeramente balanceada hacia las maltas, con cuerpo medio y de color rojizo. Puede servirse con carnes rojas, hamburguesa y cerdo.")
const beer1 = new Beer("Blonde Ale",350,5.5,18,"Es una cerveza de cuerpo ligero, con amargor medio, aroma cítrico, con buena carbonatación pero con espuma poco persistente, fácil de beber y refrescante. Ideal para acompañar picadas, pizzas y frutos de mar.")
const beer2 = new Beer("Irish Stout",450,4.7,30,"Es una cerveza de color negro intenso, con aromas a maltas tostadas, café. En boca es una cerveza que se caracteriza por su cuerpo medio ligero, agradable al paladar. Ideal para acompañar quesos fuertes o postre.")
const beer3 = new Beer("Märzen",410,8.1,30,"Cerveza de color cobrizo. Ofrece aromas y sabores complejos dulces y tostados por las maltas especiales utilizadas, y frutales debido a los ésteres generados en la fermentación.")
const beer4 = new Beer("Barley Wine",400,10.5,50,"Cerveza color ámbar, de aroma maltoso y con toques a fruta madura y frutos secos. Sabor acaramelado equilibrado entre la malta y el lúpulo. Posee un acabado largo, licoroso y con gran personalidad.")
const beer5 = new Beer("IPA",330,5.9,50,"Es una cerveza elaborada a base de maltas pálidas y un toque de maltas caramelo, con fuerte sabor y aroma a lúpulos americanos, espuma blanca persistente, de cuerpo medio y con gran carácter. Ideal para maridar con quesos fuertes y picante.")
const beer6 = new Beer("Dubbel",360,7.1,22,"Cerveza de color cobrizo. Ofrece aromas y sabores complejos dulces y tostados por las maltas especiales utilizadas, y frutales debido a los ésteres generados en la fermentación.")
const beer7 = new Beer("Schwarzbier",380,6.2,23,"La Cerveza más oscura de Alemania, originaria de las regiones de Thuringia, Saxony y Franconia. Los sabores se inclinan más hacia el café y chocolate y menos al caramelo. Sin embargo, no es tostada como una Stout. Aroma a malta bajo a moderado, con un dulzor aromático leve y/o notas de malta torrada. De cuerpo medio-liviano a medio.")
const beer8 = new Beer("Honey",330,6.5,18,"De color dorado, cuerpo medio, con un intenso aroma y sabor a miel. Se caracteriza por ser muy fresca, agradable, de gusto dulce. Ideal para calmar la sed o acompañar ensaladas, platos de sabores neutros o afrutados.")
// const beer9 = new Beer("Porter",350,6.1,23,"De color oscuro y con reflejos rubí, espuma cremosa y persistente, con notas a café, chocolate y caramelo. Elaborada con una mezcla de maltas caramelo y oscuras. Ideal para acompañar carnes rojas y postres.")


let cervezas = [beer0,beer1,beer2,beer3,beer4,beer5,beer6,beer7,beer8]

const ul = document.getElementById("lista")

const containerCarrito = document.getElementById("containerCarrito")

const mostrarCarrito = document.getElementById("mostrarCarrito")

const panelCarrito = document.getElementById("panelCarrito")

cervezas.forEach((element,i) => {
    const li = document.createElement("li")
    li.innerHTML = `
      
        <ul class="col">
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
                  <input type="text" class="form-control" placeholder="Cant." size="1px" id="inputCant${i}">
                  <button type="button" class="btn btn-sm btn-outline-secondary" id="btnAgregar${i}">Agregar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    `
    ul.appendChild(li)
 
});


let carrito = []
const carritoLS = JSON.parse(localStorage.getItem("carrito"))

if(carritoLS){
    carrito = carritoLS
}

console.log(carrito)

carrito.forEach((element,i) => {
  const li = document.createElement("li")
  let subtotal = 0
  subtotal = element.precioUn*element.cant
  li.innerHTML = `<div id=itemC${i}>${element.cant} x ${element.nombre} $${subtotal}</div>`
  listaCarrito.appendChild(li)

});
funcCalcularTotalScript()


let finded

// const listaCarrito = document.createElement("ul")
// containerCarrito.appendChild(listaCarrito)


cervezas.forEach((element,i) => {
    const inputCant = document.getElementById(`inputCant${i}`)
    const btnAgregar = document.getElementById(`btnAgregar${i}`)
    
    btnAgregar.addEventListener("click", () => {
    
      const cantidad = inputCant.value
      
      if(cantidad==="") return

      finded = finder(element.nombre)

      console.log(finded)

      if(finded==-1){
          const listaCarrito = document.getElementById("listaCarrito")
          carrito.push({nombre:element.nombre, cant: cantidad, precioUn:element.precio})
          const li = document.createElement("li")
          let length = carrito.length-1
          console.log(length)

          console.log("producto",carrito[length].precioUn,carrito[length].cant)


          subtotal = carrito[length].precioUn*carrito[length].cant
          listaCarrito.appendChild(li)
          li.innerHTML = `<div id=itemC${length}>${carrito[length].cant} x ${carrito[length].nombre} $${subtotal}</div>`
          funcCalcularTotalScript()
      }else{
        const listaCarrito = document.getElementById("listaCarrito")
        for (let index = 0; index < cantidad; index++) {
          carrito[finded].cant++
        }
        console.log("entra a else")
        const elementoRepetido = document.getElementById(`itemC${finded}`)
        console.log(carrito[finded].precioUn,carrito[finded].cant)
        subtotal = carrito[finded].precioUn*carrito[finded].cant
        elementoRepetido.innerHTML = `${carrito[finded].cant} x ${carrito[finded].nombre} $${subtotal}`
        funcCalcularTotalScript()


          // carritoInner(element,elementoRepetido,i)
          // elementoRepetido = child UL [finded]
          // elementoRepetido.innerHTML = `${element.cant} x ${element.nombre} $${subtotal}`
      }


      const carritoJSON = JSON.stringify(carrito)
      localStorage.setItem("carrito", carritoJSON)


      
      const alertAgregado = document.getElementById("alertAgregado")
      const alertText = document.createElement("div")
      alertAgregado.appendChild(alertText)

      alertText.innerHTML = `Agregaste ${cantidad} ${element.nombre} al carrito.`
      // document.getElementById("alertAgregado").style.display = "block"      
      // setTimeout(displayNone, 4000)


      // Animacion agregar al carrito


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
      // console.log(carrito)
    })
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

// Animacion agregar al carrito

const agregarAnimationIn = [
  {transform: "translateY(0px)"},
  {transform: "translateY(-110px)"}
]
const agregarAnimationOut = [
  {transform: "translateY(0px)"},
  {transform: "translateY(110px)"}
]

const animationAgregarDuration = {
  duration: 500,
  iterations: 1,
}
function funcAgregarAniIn() {
  alertText.style.bottom = "50px"
}
function funcAgregarAniOut() {
  alertText.style.bottom = "-60px"
}
//Fin animacion agregar al carrito


mostrarCarrito.addEventListener("click",() =>{

  // const listaCarrito = document.createElement("ul")
  // containerCarrito.appendChild(listaCarrito)
  panelCarrito.animate(carritoAnimationIn,animationDuration)
  setTimeout(funcAniIn,500)
  
  carrito.forEach(element => {
    // const li = document.createElement("li")
    // let subtotal = 0
    // subtotal = element.precioUn*element.cant
    // li.innerHTML = `${element.cant} x ${element.nombre} $${subtotal}`
    // listaCarrito.appendChild(li)
  
  });


  // totalCarrito = funcCalcularTotalScript()
  


  const cerrarCarrito = document.getElementById("close")
  cerrarCarrito.addEventListener("click",() =>{
    panelCarrito.animate(carritoAnimationOut,animationDuration)
    setTimeout(funcAniOut,500)
    // listaCarrito.remove()
    // totalCarrito.remove()
    funcCalcularTotalScript()
  })
  const vaciarCarrito = document.getElementById("vaciarCarrito")  

  vaciarCarrito.addEventListener("click",() =>{
    document.getElementById("listaCarrito").remove()
    const listaCarritoDiv = document.getElementById("listaCarritoDiv")
    listaCarritoDiv.innerHTML = `<ul id= "listaCarrito"></ul>`
    // totalCarrito.remove()
    funcVaciarCarrito()
})
})