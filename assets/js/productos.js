//DOM
document.addEventListener('DOMContentLoaded', () =>{ 
    //Variables
    const baseDeDatos = [
        {
            id: 1,
            nombre: 'Postres de 3 leches fresa',
            precio: 3500,
            imagen: 'assets/img/3leche3.jpeg',
            categoria: 'Postres 3 leches'
        },
        {
            id: 2,
            nombre: 'Deditos de queso',
            precio: 12000,
            imagen: 'assets/img/deditos.jpeg',
            categoria: 'Deditos'
        },
        {
            id: 3,
            nombre: 'Tortas personalizados',
            precio: 50000,
            imagen: 'assets/img/pudin.png',
            categoria: 'Otros productos'

        },
        {
            id: 4,
            nombre: 'Palillo de Donas',
            precio: 8000,
            imagen: 'assets/img/pudin.png',
            categoria: 'Otros productos'

        },
        {
            id: 5,
            nombre: 'Palillo de Donas',
            precio: 8000,
            imagen: 'assets/img/pudin.png',
            categoria: 'Otros productos'

        },
        {
            id: 6,
            nombre: 'Palillo de Donas',
            precio: 8000,
            imagen: 'assets/img/pudin.png',
            categoria: 'Otros productos'

        },

    ];

    let carrito =[];
    const divisa = '$';
    const DOMitems = document.querySelector('#items');
    const filtroSelect=document.querySelector('#filtro')
   /*  const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');
    const miLocalStorage = window.localStorage; */

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
            miNodo.style.border='none'
            
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
            miNodoBoton.style.color='#fff'
            miNodoBoton.style.backgroundColor='#ff0088';
            miNodoBoton.textContent = 'Comprar';
            /* miNodoBoton.setAttribute('marcador', info.id);
            miNodoBoton.addEventListener('click', anadirProductoAlCarrito); */

            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodo.appendChild(miNodoCardBody);
            DOMitems.appendChild(miNodo);
        });

    }

    filtroSelect.addEventListener('change', renderizarProductos);
    renderizarProductos();
});