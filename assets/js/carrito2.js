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

const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 
let articulosCarrito = [];

// Listeners
cargarEventListeners();

function cargarEventListeners() {
     // Dispara cuando se presiona "Agregar Carrito"
     listaCursos.addEventListener('click', agregarCurso);

     // Cuando se elimina un curso del carrito
     carrito.addEventListener('click', eliminarCurso);

     // Al Vaciar el carrito
     vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

}


// Funciones
// Función que añade el curso al carrito
function agregarCurso(e) {
    e.preventDefault();
    // Delegation para agregar-carrito
    if(e.target.classList.contains('agregar-carrito')) {
         const curso = e.target.parentElement.parentElement;
         // Enviamos el curso seleccionado para tomar sus datos
         leerDatosCurso(curso);
    }
}

// Lee los datos del curso
function leerDatosCurso(curso) {

    if( articulosCarrito.some( curso => curso.id === infoCurso.id ) ) { 
         const cursos = articulosCarrito.map( curso => {
              if( curso.id === infoCurso.id ) {
                   curso.cantidad++;
                    return curso;
               } else {
                    return curso;
            }
         })
         articulosCarrito = [...cursos];
    }  else {
         articulosCarrito = [...articulosCarrito, infoCurso];
    }

    // console.log(articulosCarrito)

    

    // console.log(articulosCarrito)
    carritoHTML();
}

// Elimina el curso del carrito en el DOM
function eliminarCurso(e) {
    e.preventDefault();
    if(e.target.classList.contains('borrar-curso') ) {
         // e.target.parentElement.parentElement.remove();
         const cursoId = e.target.getAttribute('data-id')
         
         // Eliminar del arreglo del carrito
         articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

         carritoHTML();
    }
}


// Muestra el curso seleccionado en el Carrito
function carritoHTML() {

    vaciarCarrito();

    articulosCarrito.forEach(curso => {
         const row = document.createElement('tr');
         row.innerHTML = `
              <td>  
                   <img src="${curso.imagen}" width=100>
              </td>
              <td>${curso.titulo}</td>
              <td>${curso.precio}</td>
              <td>${curso.cantidad} </td>
              <td>
                   <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
              </td>
         `;
         contenedorCarrito.appendChild(row);
    });

}

// Elimina los cursos del carrito en el DOM
function vaciarCarrito() {
    // forma lenta
    // contenedorCarrito.innerHTML = '';


    // forma rapida (recomendada)
    while(contenedorCarrito.firstChild) {
         contenedorCarrito.removeChild(contenedorCarrito.firstChild);
     }
}