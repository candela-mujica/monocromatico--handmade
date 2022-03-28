const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaProductos = document.querySelector('#lista-productos');
let total = document.querySelector('#total');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    listaProductos.addEventListener('click', agregarProducto);
    carrito.addEventListener('click', eliminarProducto);

    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carritoHTML();
    })

    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        localStorage.removeItem('carrito');
        limpiarHTML();
        console.clear();
        console.log(articulosCarrito);
    });
}

function agregarProducto(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const productoSelecionado = e.target.parentElement.parentElement.parentElement;
        leerDatosProducto(productoSelecionado);
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Agregado!',
            showConfirmButton: false,
            timer: 1200,
        })
    }
}

function eliminarProducto(e) {
    if (e.target.classList.contains('borrar-producto')) {
        const productoId = e.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId);
        console.clear();
        console.log(articulosCarrito);
        carritoHTML();
    }
}

function leerDatosProducto(producto) {
    const infoProducto = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('p.card-title').textContent,
        precio: producto.querySelector('p.card-text').textContent,
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
        subtotal: 0
    }
    infoProducto.subtotal = Number(infoProducto.precio.replace('$', '')) * infoProducto.cantidad;
    const existe = articulosCarrito.some(producto => producto.id === infoProducto.id);
    if (existe) {
        const productos = articulosCarrito.map(producto => {
            if (producto.id === infoProducto.id) {
                producto.cantidad++;
                producto.subtotal = Number(producto.precio.replace('$', '')) * producto.cantidad;
                return producto;
            } else {
                return producto;
            }
        });
        articulosCarrito = [...productos];
    } else {
        articulosCarrito = [...articulosCarrito, infoProducto];
    }
    console.clear();
    console.log(articulosCarrito);
    carritoHTML();
}

// mostrar carrito en el html
function carritoHTML() {
    limpiarHTML();
    articulosCarrito.forEach(producto => {
        const { imagen, titulo, precio, cantidad, subtotal, id } = producto;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="carro__imagen">
                <img src="${imagen}" width="100">
            </td>
            <td class="carro__titulo">${titulo}</td>
            <td class="carro__precio">${precio}</td>
            <td class="carro__cantida">${cantidad}</td>
            <td class="carro__subtotal">$${subtotal}</td>
            <td>
                <a href="#" class="borrar-producto" data-id="${id}"> X </a>
            </td>
        `;
        contenedorCarrito.appendChild(row);
    });

    sincronizarStorage();
}

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}


function limpiarHTML() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
    total.innerHTML = `<p class="carroTotal">Total: $${totalGeneral()}</p>`;
}

function totalGeneral() {
    let productoTotal = articulosCarrito.reduce((total, producto) => total + producto.subtotal, 0);
    console.log(`Total : $${productoTotal}`);
    return productoTotal;
}