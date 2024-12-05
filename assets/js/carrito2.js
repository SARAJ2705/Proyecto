document.addEventListener('DOMContentLoaded', () => { 
    // Variables
    const baseDeDatos = [
        {
            id: 1,
            nombre: 'Jarro al 100% en barro',
            precio: 250000,
            imagen: 'assests/img/jarro1.png',
            categoria: 'sombreros'
        },
        {
            id: 2,
            nombre: 'Mochila al 100%',
            precio: 150000,
            imagen: 'assets/img/mochila1.png',
            categoria: 'sombreros'
        },
        {
            id: 3,
            nombre: 'Vajilla 100%',
            precio: 250000,
            imagen: 'assests/img/vajilla1.png',
            categoria: 'sombreros'
        },
        {
            id: 4,
            nombre: 'cadena multiuso',
            precio: 120000,
            imagen: 'assests/img/producto2.jpg',
            categoria: 'mochilas'
        },
        {
            id: 5,
            nombre: 'jarroens 100%',
            precio: 120000,
            imagen: 'assests/img/producto1.jpg',
            categoria: 'bolsos'
        },
        {
            id: 6,
            nombre: 'pulseras 2000',
            precio: 120000,
            imagen: 'assests/img/producto4.jpg',
            categoria: 'hamacas'
        }
    ];

    let carrito = [];
    const divisa = '$';
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');
    const miLocalStorage = window.localStorage;
    const filtroSelect = document.getElementById("filtro");

    function anadirProductoAlCarrito(evento) {
        carrito.push(evento.target.getAttribute('marcador'));
        renderizarCarrito();
        guardarCarritoEnLocalStorage();
        handleCarritoValue(carrito.length);
    }

    function handleCarritoValue(value) {
        const carritoContainer = document.getElementById("carrito-value");
        carritoContainer.textContent = `${value}`;
    }

    function renderizarCarrito() {
        DOMcarrito.textContent = '';
        const carritoSinDuplicados = [...new Set(carrito)];

        carritoSinDuplicados.forEach((item) => {
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });

            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                return itemId === item ? total += 1 : total;
            }, 0);

            const miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
            
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarItemCarrito);
            
            miNodo.appendChild(miBoton);
            DOMcarrito.appendChild(miNodo);
        });
        DOMtotal.textContent = calcularTotal();
    }

    function borrarItemCarrito(evento) {
        const id = evento.target.dataset.item;
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });
        renderizarCarrito();
        guardarCarritoEnLocalStorage();
        handleCarritoValue(carrito.length);
    }

    function calcularTotal() {
        return carrito.reduce((total, item) => {
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            return total + miItem[0].precio;
        }, 0).toFixed(2);
    }

    function vaciarCarrito() {
        carrito = [];
        renderizarCarrito();
        localStorage.clear();
    }

    function guardarCarritoEnLocalStorage() {
        miLocalStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function cargarCarritoDeLocalStorage() {
        if (miLocalStorage.getItem('carrito') !== null) {
            carrito = JSON.parse(miLocalStorage.getItem('carrito'));
            handleCarritoValue(carrito.length);
        }
    }

    // Eventos
    DOMbotonVaciar.addEventListener('click', vaciarCarrito);
    filtroSelect.addEventListener('change', renderizarProductos);

    // Inicio
    cargarCarritoDeLocalStorage();
    renderizarCarrito();
});

