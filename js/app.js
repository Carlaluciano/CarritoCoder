//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritobtn = document.querySelector('#vaciar-carrito');
const listaProductos = document.querySelector('#lista-productos');
let articuloCarrito = [];


cargarEventListener();
function cargarEventListener() {
    // Agrega producto al carrito
listaProductos.addEventListener('click', agregarProductos);

//Elimina producto del carrito
carrito.addEventListener('click', eliminarProducto);

//vaciar carrito
vaciarCarritobtn.addEventListener('click', () => {
    articuloCarrito = []; // reinicia el carrito

    limpiarHTML(); // Eliminamos todos los productos
});


}


//Funciones
function agregarProductos(e) {
    e.preventDefault();
    
    if(e.target.classList.contains('agregar-carrito')){
    
        const productoSeleccionado = e.target.parentElement.parentElement;
        leerDatosProducto(productoSeleccionado);

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Producto agregado con exito'
          })
    }

}

//Elimina Producto del carrito

function eliminarProducto(e){
    if(e.target.classList.contains('borrar-curso')){
        const productoId = e.target.getAttribute('data-id');

        //Elimina del arreglo los productos
        articuloCarrito = articuloCarrito.filter( producto => producto.id !== producto.id);

        carritoHTML(); // itera sobre el carrito

        Swal.fire({
            title: 'Estas seguro que deseas eliminar el producto?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'si'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Eliminado',
                'El producto fue eliminado correctamente.',
                'success'
              )
            }
          })
    }
    
}


// Lee el HTML y extrae la info del producto

function leerDatosProducto(producto){
  
    //crear un objeto con el contenido
    const infoProducto = {
        imagen:producto.querySelector('img').src,
        nombre: producto.querySelector('h4').textContent,
        precio: producto.querySelector('.precio span').textContent,
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad:1
    }

    //revisa si un elemento ya existe en el carrito
    const existe = articuloCarrito.some(producto => producto.id === infoProducto.id); 
         if (existe) articuloCarrito.forEach(producto => {
    // se actualiza la cantidad
         if (producto.id === infoProducto.id) 
             producto.cantidad++; 
           })
    // se agrega el nuevo curso
       else articuloCarrito = [...articuloCarrito, infoProducto] 



    carritoHTML();
    
}
   

 //Muestra el carrito en el HTML

 function carritoHTML(){
//limpia el HTML
limpiarHTML();

//recorre el carrito y genera el HTML

     articuloCarrito.forEach( producto => {
         const {imagen, nombre, precio, cantidad, id} = producto;
         const row = document.createElement('tr');
         row.innerHTML = `
           <td>
           <img src="${imagen}" width="100">
           </td>

           <td>${nombre}</td>
           <td>${precio}</td>
           <td> ${cantidad}</td>

           <td>
           <a href="#" class="borrar-curso" data-id="${producto.id}"> X </a>
           </td>
         `;

        //agrega el HTML en el tbody
        contenedorCarrito.appendChild (row);

     });
 }

 // Elimina los cursos del tbody

 function limpiarHTML(){
     
    while(contenedorCarrito.firstChild){
      contenedorCarrito.removeChild(contenedorCarrito.firstChild)
     }
 }

 // Agregamos un Fetch

 const listado = document.querySelector('#card')
 console.log(listado)

 fetch('js/data.json')
 .then ( (res) => res.json() )
 .then ( data => {

  data.forEach((producto) => {

const li = document.createElement('li')
li.innerHTML=`
<h4>${producto.nombre}</h4>
<p>${producto.precio}</p>
<p>codigo: ${producto.id}</p>

`
lista.append(li)
 })

 })