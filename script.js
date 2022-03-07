const agregarAlCarroBoton = document.querySelectorAll('.agregarAlCarro');

agregarAlCarroBoton.forEach((botonAgregar) => {
    botonAgregar.addEventListener('click', agregarAlCarroClick);  
});

const contenedorItems = document.querySelector('.contenedorItems');

function agregarAlCarroClick(event) {
    const boton = event.target;
    const item = boton.closest('.cards');
    
    const itemNombre = item.querySelector('.itemNombre').textContent;
    const itemPrecio = item.querySelector('.itemPrecio').textContent;
    const itemImagen = item.querySelector('.itemImagen').src;
    agregarItemAlCarro(itemNombre, itemPrecio, itemImagen);
}

function agregarItemAlCarro(itemNombre, itemPrecio, itemImagen){
    const elementosNombres = contenedorItems.getElementsByClassName('itemNombre');
      for (let i = 0; i < elementosNombres.length; i++) {
        if (elementosNombres[i].innerText === itemNombre) {
          let itemCantidad = elementosNombres[i]  
          .parentElement.parentElement.parentElement.querySelector('.itemCantidad');          
          itemCantidad.value++;
          $('.toast').toast('show');
          actualizarTotal();
          return;
        }
    }
    const carroFila = document.createElement('div');
    const carroContenido = 
    `<div class="row contenedorItems">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${itemImagen} class="itemImagen">
                <h6 class="shopping-cart-item-title itemNombre text-truncate ml-3 mb-0">${itemNombre}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 itemPrecio">${itemPrecio}</p>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-quantity d-flex align-items-center h-100 border-bottom pb-2 pt-3 cantidad">
                <input class="shopping-cart-quantity-input itemCantidad" type="number" value="1">
                <button class="btn btn-danger botonBorrar" type="button">X</button>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="mb-0 itemPrecio">Total</p>
            </div>
        </div>
    </div>`;
    carroFila.innerHTML = carroContenido;
    contenedorItems.append = (carroFila);

    carroFila
    .querySelector('.botonBorrar')
    .addEventListener('click', borrarItem);

    carroFila
    .querySelector('.carroCantidadItem')
    .addEventListener('change', cantidadNueva);

    actualizarTotal();
}

function actualizarTotal(){
    let total = 0
    const carroTotal = document.querySelector('.carroTotal');

    const itemsDelCarro = document.querySelectorAll('.itemsDelCarro');
    itemsDelCarro.forEach((itemsDelCarro) => {
        const carroPrecioItemElemento = itemsDelCarro.querySelector(
          '.carroPrecioItem'
        );
        const carroPrecioItem = Number(
            carroPrecioItemElemento.textContent.replace('$', '')
        );
        const carroCantidadItemElemento = itemsDelCarro.querySelector(
            '.carroCantidadItem'
        );
        const carroCantidadItem = Number(
            carroCantidadItemElemento.value
        );
        total = total + carroPrecioItem * carroCantidadItem
        });
        carroTotal.innerHTML = `${total}$`;
}

function borrarItem(event) {
    const botonClick = event.target;
    botonClick.closest('.itemsDelCarro').remove();
    actualizarTotal();
  }
  
function cantidadNueva(event) {
    const input = event.target;
    input.value <= 0 ? (input.value = 1) : null;
    actualizarTotal();
}