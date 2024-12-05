//DOM
document.addEventListener('DOMContentLoaded', () =>{ 
    //Variables
    const baseDeDatos = [
        {
            id: 1,
            nombre: 'Postres de 3 leches fresa',
            precioInt: 4000,
            precio: '4.000',
            imagen: 'assets/img/3leche2.jpg',
            categoria: 'Postres 3 leches',
            menu: '3leches.html'
        },
        {
            id: 2,
            nombre: 'Bandeja de Deditos',
            precioInt: 12000,
            precio: '12.000',
            imagen: 'assets/img/deditos.jpeg',
            categoria: 'Deditos',
            menu: 'deditos.html'
        },
        {
            id: 3,
            nombre: 'Tortas personalizados',
            precioInt: 50000,
            precio: '50.000',
            imagen: 'assets/img/torta1.jpeg',
            categoria: 'Otros productos',
            menu: 'tortapersonalizada.html'

        },
        {
            id: 4,
            nombre: 'Palillo de Donas',
            precioInt: 8000,
            precio: '8.000',
            imagen: 'assets/img/dona1.jpeg',
            categoria: 'Otros productos',
            menu: 'donas.html'

        },
        {
            id: 5,
            nombre: 'Postre Napoleón',
            precioInt: 36000,
            precio: '36.000',
            imagen: 'assets/img/napoleon1.jpeg',
            categoria: 'Otros productos',
            menu: 'napoleon.html'

        },
        {
            id: 6,
            nombre: 'Fresas con Crema',
            precioInt: 15000,
            precio: '15.000',
            imagen: 'assets/img/fresas.jpg',
            categoria: 'Otros productos',
            menu: 'fresas.html'

        }
    ];

    let carrito =[]; 
    const divisa = '$';
    const DOMitems = document.querySelector('#items');
    const filtroSelect=document.querySelector('#filtro')
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');
    const miLocalStorage = window.localStorage;

    // Funciones

    function renderizarProductos() {
        DOMitems.innerHTML = "";

        const filtro = filtroSelect.value;
        const productosFiltrados = baseDeDatos.filter(producto => 
            filtro === "todas" || producto.categoria === filtro
        );

        productosFiltrados.forEach((info) => {
            const miNodo = document.createElement('div');
            miNodo.classList.add('card', 'col-sm-3');
            miNodo.style.margin='1em';
            miNodo.style.border='none';
            
            const miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body');
            
            const miNodoTitle = document.createElement('h6');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.textContent = info.nombre;
            miNodoTitle.style.marginTop='20px'
            
            const miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('img-fluid');
            miNodoImagen.setAttribute('src', info.imagen);
            miNodoImagen.style.borderRadius='5px'
            
            const miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent = `${info.precio}${divisa}`;
            
            const miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn', 'btn-light');
            miNodoBoton.style.color='#fff';
            miNodoBoton.style.backgroundColor='#ff0088';
            miNodoBoton.style.margin='5px'
            miNodoBoton.textContent = 'Comprar';
            miNodoBoton.setAttribute('marcador', info.id);


           miNodoBoton.addEventListener('click', () => {
            window.location.href = info.menu;
            });

            const miNodoBotonAgregar = document.createElement('button');
            miNodoBotonAgregar.classList.add('btn', 'btn-light');
            miNodoBotonAgregar.style.backgroundColor='#76054C';
            miNodoBotonAgregar.style.color='#fff';
            miNodoBotonAgregar.style.margin='5px'
            miNodoBotonAgregar.textContent = 'Agregar';
            miNodoBotonAgregar.setAttribute('marcador', info.id);
            miNodoBotonAgregar.addEventListener('click', anadirProductoAlCarrito);

            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodoCardBody.appendChild(miNodoBotonAgregar);
            miNodo.appendChild(miNodoCardBody);
            DOMitems.appendChild(miNodo);
        });

    }

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
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precioInt}${divisa}`;
            
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '2rem';
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
            return total + miItem[0].precioInt;
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

    renderizarProductos();
    cargarCarritoDeLocalStorage();
    renderizarCarrito();
});