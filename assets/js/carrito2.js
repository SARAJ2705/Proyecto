document.addEventListener("DOMContentLoaded", function () {
    // Seleccionar todos los botones de "Agregar al carrito"
    const botonesAgregar = document.querySelectorAll(".agregar-carrito");

    // Seleccionar el cuerpo de la tabla donde añadiremos los productos
    const listaCarrito = document.querySelector("#lista-carrito tbody");

    // Manejar clic en cada botón de agregar al carrito
    botonesAgregar.forEach((boton) => {
        boton.addEventListener("click", function (e) {
            e.preventDefault();

            // Obtener los datos del producto (puedes personalizar estas clases/datos)
            const productoCard = boton.closest(".card"); // La tarjeta del producto
            const nombreProducto = productoCard.querySelector("h1").textContent;
            const precioProducto = productoCard.querySelector(".precio").textContent;
            const cantidadProducto = productoCard.querySelector("#var-value").textContent;

            // Crear la fila con los datos
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${nombreProducto}</td>
                <td>${cantidadProducto}</td>
                <td>${precioProducto}</td>
                <td>
                    <a href="#" class="borrar-curso" style="color: red;">X</a>
                </td>
            `;

            // Agregar la fila al carrito
            listaCarrito.appendChild(fila);

            // Opcional: Mostrar un mensaje o actualizar contador
            alert("¡Producto agregado al carrito!");
        });
    });

    // Funcionalidad para eliminar productos del carrito
    listaCarrito.addEventListener("click", function (e) {
        if (e.target.classList.contains("borrar-curso")) {
            e.target.parentElement.parentElement.remove(); // Eliminar fila
        }
    });
});
