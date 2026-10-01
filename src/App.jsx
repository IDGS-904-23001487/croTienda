import { useState, useEffect } from "react";

const listaAbarrotes = [
  {
    id: 1,
    nombre: "Leche",
    precio: 16.50,
    categoria: "Lácteos",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaIviQx7yWozJosB5dh7VmQyAyXIz4FtCLDdsKnPmP2g&s=10"
  },
  {
    id: 2,
    nombre: "Refresco Cola",
    precio: 22.00,
    categoria: "Bebidas",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREUjsxY4psB5LLl1Talba449WewaCEpiv6v_iPTnDzyA&s"
  },
  {
    id: 3,
    nombre: "Papas",
    precio: 25.00,
    categoria: "Frituras",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1Ji9mEXYq2CARV3TH4iJJlZ0bw-qLfT45E6LK0lvogQ&s=10"
  },
  {
    id: 4,
    nombre: "Pan Blanco",
    precio: 45.00,
    categoria: "Panadería",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9FBnTfvFirJIx-9F3H6Z7peoxQVbuPInjYE3h5LaGBQ&s=10"
  }
];

const obtenerProductosAPI = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(listaAbarrotes);
    }, 3000);
  });
};

const agregarAlCarrito = (producto) => {
  alert(`¡Agregado!: ${producto.nombre} por $${producto.precio.toFixed(2)} MXN`);
};

const formatearPrecio = (valor) => {
  return `$${valor.toFixed(2)}`;
};

const generarMensajeBienvenida = (tienda) => {
  return `Productos de ${tienda}`;
};


const Encabezado = ({ titulo, subtitulo }) => (
  <header className="bg-success text-white text-center py-4 mb-4 shadow-sm rounded-bottom">
    <h1 className="fw-bold">{titulo}</h1>
    <p className="text-warning m-0 fw-semibold">{subtitulo}</p>
  </header>
);

const TarjetaProducto = ({ producto }) => (
  <div className="card h-100 shadow-sm border-0">
    <img
      src={producto.imagen}
      className="card-img-top"
      alt={producto.nombre}
      style={{ height: "200px", objectFit: "cover" }}
    />
    <div className="card-body text-center d-flex flex-column justify-content-between">
      <div>
        <span className="badge bg-secondary mb-2">{producto.categoria}</span>
        <h5 className="card-title fw-bold text-dark">{producto.nombre}</h5>
      </div>
      <div className="mt-3">
        <p className="fs-4 fw-bold text-success mb-2">
          {formatearPrecio(producto.precio)}
        </p>
        <button
          className="btn btn-outline-success btn-sm w-100 fw-semibold"
          onClick={() => agregarAlCarrito(producto)}
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  </div>
);

const Catalogo = ({ productos }) => (
  <div className="row g-4">
    {productos.map((item) => (
      <div className="col-md-3 col-sm-6" key={item.id}>
        <TarjetaProducto producto={item} />
      </div>
    ))}
  </div>
);

export default function App() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [contador, setContador] = useState(3);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setContador((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    const cargarDatos = async () => {
      const datos = await obtenerProductosAPI();
      setProductos(datos);
      setCargando(false);
      clearInterval(intervalo);
    };
    cargarDatos();
    return () => clearInterval(intervalo);
  }, []);

  if (cargando) {
    return (
      <div className="container text-center my-5 py-5">
        <div
          className="spinner-border text-success mb-3"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        ></div>
        <h3 className="text-secondary fw-bold">Cargando catálogo en...</h3>
        <h4 className="display-1 text-success fw-bold">{contador}</h4>
      </div>
    );
  }

  return (
    <div className="container pb-4">
      <Encabezado titulo="Abarrotes Dreamboy" subtitulo="Productos Frescos y Calidad"/>
      <p className="text-center text-muted fs-5 mb-4">
        {generarMensajeBienvenida("Dreamboy")}</p>
      <Catalogo productos={productos} />
    </div>
  );
}