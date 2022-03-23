//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritobtn = document.querySelector('#vaciar-carrito');
const listaProductos = document.querySelector('#lista-productos');

cargarEventListener();
function cargarEventListener() {
listaProductos.addEventListener('click', agregarProductos);
}


//Funciones
function agregarProductos(e) {
    e.preventDefault();
    console.log('Haciendo click');
}

