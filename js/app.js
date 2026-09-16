const productos = [
  {
    id: 1,
    nombre: "Blusa Rosa",
    precio: 349,
    imagen: "https://placehold.co/600x750/f9e7ef/292459?text=Blusa+Rosa",
  },
  {
    id: 2,
    nombre: "Vestido Casual",
    precio: 599,
    imagen: "https://placehold.co/600x750/eee5f7/292459?text=Vestido",
  },
  {
    id: 3,
    nombre: "Jeans",
    precio: 549,
    imagen: "https://placehold.co/600x750/fff1d8/292459?text=Jeans",
  },
  {
    id: 4,
    nombre: "Bolsa",
    precio: 429,
    imagen: "https://placehold.co/600x750/f4d9e5/292459?text=Bolsa",
  },
  {
    id: 5,
    nombre: "Conjunto",
    precio: 699,
    imagen: "https://placehold.co/600x750/e7d9f4/292459?text=Conjunto",
  },
  {
    id: 6,
    nombre: "Accesorios",
    precio: 249,
    imagen: "https://placehold.co/600x750/fff0da/292459?text=Accesorios",
  },
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const listaProductos = document.getElementById("listaProductos");

const contenidoCarrito = document.getElementById("contenidoCarrito");

const contadorCarrito = document.getElementById("contadorCarrito");

const totalCarrito = document.getElementById("totalCarrito");

const btnComprar = document.getElementById("btnComprar");

function mostrarProductos() {
  listaProductos.innerHTML = "";

  productos.forEach((producto) => {
    listaProductos.innerHTML += `
            <div class="col-sm-6 col-lg-4">

                <div class="card product-card h-100">

                    <img
                        src="${producto.imagen}"
                        class="card-img-top product-image"
                        alt="${producto.nombre}"
                    >

                    <div class="card-body d-flex flex-column">

                        <h5 class="card-title fw-bold">
                            ${producto.nombre}
                        </h5>

                        <p class="product-price">
                            $${producto.precio.toFixed(2)}
                        </p>

                        <button
                            class="btn btn-principal mt-auto"
                            onclick="agregarAlCarrito(${producto.id})"
                        >
                            <i class="bi bi-bag-plus me-2"></i>
                            Agregar al carrito
                        </button>

                    </div>

                </div>

            </div>
        `;
  });
}

function agregarAlCarrito(idProducto) {
  const producto = productos.find((producto) => producto.id === idProducto);

  const productoExistente = carrito.find((item) => item.id === idProducto);

  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    carrito.push({
      ...producto,
      cantidad: 1,
    });
  }

  guardarCarrito();

  actualizarCarrito();
}

function aumentarCantidad(idProducto) {
  const producto = carrito.find((item) => item.id === idProducto);

  if (producto) {
    producto.cantidad++;
  }

  guardarCarrito();

  actualizarCarrito();
}

function disminuirCantidad(idProducto) {
  const producto = carrito.find((item) => item.id === idProducto);

  if (!producto) {
    return;
  }

  producto.cantidad--;

  if (producto.cantidad <= 0) {
    carrito = carrito.filter((item) => item.id !== idProducto);
  }

  guardarCarrito();

  actualizarCarrito();
}

function eliminarProducto(idProducto) {
  carrito = carrito.filter((item) => item.id !== idProducto);

  guardarCarrito();

  actualizarCarrito();
}

function actualizarCarrito() {
  contenidoCarrito.innerHTML = "";

  if (carrito.length === 0) {
    contenidoCarrito.innerHTML = `
            <div class="carrito-vacio">

                <i class="bi bi-bag"></i>

                <p>
                    Tu carrito está vacío.
                </p>

            </div>
        `;
  } else {
    carrito.forEach((producto) => {
      contenidoCarrito.innerHTML += `
                <div class="carrito-item">

                    <div class="d-flex justify-content-between">

                        <div>

                            <div class="carrito-item-name">
                                ${producto.nombre}
                            </div>

                            <div>
                                $${producto.precio.toFixed(2)}
                            </div>

                        </div>

                        <button
                            class="btn btn-sm btn-outline-danger"
                            onclick="eliminarProducto(${producto.id})"
                        >
                            <i class="bi bi-trash"></i>
                        </button>

                    </div>


                    <div class="carrito-controles d-flex align-items-center gap-2 mt-3">

                        <button
                            class="btn btn-outline-secondary"
                            onclick="disminuirCantidad(${producto.id})"
                        >
                            -
                        </button>

                        <span>
                            ${producto.cantidad}
                        </span>

                        <button
                            class="btn btn-outline-secondary"
                            onclick="aumentarCantidad(${producto.id})"
                        >
                            +
                        </button>

                    </div>

                </div>
            `;
    });
  }

  const cantidadTotal = carrito.reduce(
    (total, producto) => total + producto.cantidad,
    0,
  );

  contadorCarrito.textContent = cantidadTotal;

  const total = carrito.reduce(
    (total, producto) => total + producto.precio * producto.cantidad,
    0,
  );

  totalCarrito.textContent = `$${total.toFixed(2)}`;
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

btnComprar.addEventListener("click", () => {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");

    return;
  }

  let mensaje = "Hola, quiero realizar el siguiente pedido:%0A%0A";

  carrito.forEach((producto) => {
    mensaje +=
      `${producto.nombre} - ` +
      `${producto.cantidad} pieza(s) - ` +
      `$${(producto.precio * producto.cantidad).toFixed(2)}%0A`;
  });

  const total = carrito.reduce(
    (total, producto) => total + producto.precio * producto.cantidad,
    0,
  );

  mensaje += `%0ATotal: $${total.toFixed(2)}`;

  const numeroWhatsApp = "525621906374";

  window.open(`https://wa.me/${numeroWhatsApp}?text=${mensaje}`, "_blank");
});

mostrarProductos();

actualizarCarrito();
