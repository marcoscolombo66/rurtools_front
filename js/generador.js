const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

// Función para crear el HTML de una categoría
function crearHTMLCategoria(categoria) {
    return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8"/>
    <meta content="width=device-width, initial-scale=1" name="viewport"/>
    <title>${categoria.nombreCategoria} - RUR Tools</title>
    <!-- favicon -->
    <link href="/2023/pics/favicon/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180"/>
    <link href="/2023/pics/favicon/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png"/>
    <link href="/2023/pics/favicon/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png"/>
    <link href="/2023/pics/favicon/site.webmanifest" rel="manifest"/>
    <link color="#5bbad5" href="/2023/pics/favicon/safari-pinned-tab.svg" rel="mask-icon"/>
    <meta content="#da532c" name="msapplication-TileColor"/>
    <meta content="#ffffff" name="theme-color"/>
    <!-- fonts -->
    <link href="https://fonts.googleapis.com" rel="preconnect"/>
    <link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
    <link href="/css/css2" rel="stylesheet"/>
    <!-- font-awesome -->
    <link href="/css/fontawesome.min.css" rel="stylesheet"/>
    <link href="/css/brands.min.css" rel="stylesheet"/>
    <link href="/css/solid.min.css" rel="stylesheet"/>
    <!-- css -->
    <link href="/css/bootstrap.min.css" rel="stylesheet"/>
    <link href="/css/fancybox.css" rel="stylesheet"/>
    <link href="/css/flickity.css" rel="stylesheet"/>
    <link href="/css/swiper-bundle.min.css" rel="stylesheet"/>
    <link href="/css/common.min.css" rel="stylesheet"/>
    <!-- js -->
    <script src="/js/api.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', async () => {
            try {
                const productos = await api.getProductosPorCategoria(${categoria.idCategoria});
                const contenedor = document.querySelector('.row.justify-content-center');
                
                if (productos && productos.length > 0) {
                    contenedor.innerHTML = productos.map(producto => \`
                        <div class="col-6 col-lg-4 col-xl-3">
                            <a class="prod-link" href="/pages/ver-productos/producto/\${producto.sku}/index.html">
                                <div class="image" style="background-image:url('\${producto.imagen || '/images2/images/logo_rur.png'}');">
                                </div>
                                <div class="name" data-mh="product">
                                    \${producto.nombre}
                                </div>
                                <div class="sku">
                                    \${producto.sku}
                                </div>
                                <div class="dots">
                                </div>
                                <div class="overlay">
                                    <div class="specs">
                                    </div>
                                    <div class="btn btn-sm btn-outline-light">
                                        Ver producto
                                    </div>
                                </div>
                            </a>
                        </div>
                    \`).join('');
                } else {
                    contenedor.innerHTML = '<div class="col-12 text-center"><p>No hay productos disponibles en esta categoría.</p></div>';
                }
            } catch (error) {
                console.error('Error al cargar los productos:', error);
            }
        });
    </script>
</head>
<body>
    <!-- header -->
    <header>
        <a class="brand" href="/home">
            <img alt="RUR Tools" class="img-fluid" src="/images2/images/logo_rur.png"/>
        </a>
        <!-- nav -->
        <nav>
            <a href="/pages/ver-productos/index.html">Productos</a>
            <a href="/pages/donde-comprar/index.html">Dónde comprar</a>
            <a href="/pages/servicios-tecnicos/index.html">Servicios técnicos</a>
            <button class="btn-nav" type="button">
                <i class="fa-solid fa-bars"></i>
            </button>
            <button class="btn-search" type="button">
                <i class="fa-solid fa-magnifying-glass"></i>
            </button>
        </nav>
    </header>

    <!-- section-hero -->
    <section class="section-hero bg-orange">
        <img alt="" class="img-fluid d-none d-md-block" src="/images2/images/banner-productos.jpg"/>
        <img alt="" class="img-fluid d-md-none" src="/images2/images/banner-productos-mobile.jpg"/>
    </section>

    <!-- products -->
    <section class="section bg-orange bg-dots">
        <div class="container">
            <div class="section-header mb-4">
                <h1 class="categoria-titulo color-white mb-0">${categoria.nombreCategoria}</h1>
                <form action="/buscar" class="search" method="get">
                    <div class="input-group section-search">
                        <input class="form-control" id="s" name="s" placeholder="Buscar producto..." type="text" value=""/>
                        <button class="btn btn-dark" type="submit">
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>
                </form>
            </div>
            <div class="row justify-content-center">
                <!-- Los productos se cargarán aquí dinámicamente -->
            </div>
        </div>
    </section>

    <!-- footer -->
    <footer>
        <div class="container">
            <div class="row">
                <div class="col-md-4 col-lg-3">
                    <h5>Contacto</h5>
                    <p><a href="mailto:info@rurtools.com">info@rurtools.com</a></p>
                </div>
            </div>
        </div>
    </footer>

    <!-- js -->
    <script src="/js/bootstrap.bundle.min.js"></script>
    <script src="/js/jquery.min.js"></script>
    <script src="/js/fancybox.umd.js"></script>
    <script src="/js/flickity.pkgd.min.js"></script>
    <script src="/js/swiper-bundle.min.js"></script>
    <script src="/js/matchHeight-min.js"></script>
    <script src="/js/common.js"></script>
</body>
</html>`;
}

async function generarEstructura() {
    try {
        // Obtener categorías de la API
        const response = await fetch('http://sd-1464111-h00028.ferozo.net/admin/api/Categorias', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const categorias = await response.json();

        // Crear carpeta base si no existe
        const basePath = path.join(__dirname, '..', 'pages', 'ver-productos');
        if (!fs.existsSync(basePath)) {
            fs.mkdirSync(basePath, { recursive: true });
        }

        // Crear carpetas y archivos para cada categoría
        for (const categoria of categorias) {
            const nombreCarpeta = `${categoria.idCategoria}-${categoria.nombreCategoria.toLowerCase().replace(/\s+/g, '-')}`;
            const rutaCategoria = path.join(basePath, nombreCarpeta);

            // Crear carpeta de categoría
            if (!fs.existsSync(rutaCategoria)) {
                fs.mkdirSync(rutaCategoria, { recursive: true });
            }

            // Crear archivo index.html
            const contenidoHTML = crearHTMLCategoria(categoria);
            fs.writeFileSync(path.join(rutaCategoria, 'index.html'), contenidoHTML);
            console.log(`Creada categoría: ${categoria.nombreCategoria}`);
        }

        console.log('Estructura generada correctamente');
    } catch (error) {
        console.error('Error al generar la estructura:', error);
    }
}

// Ejecutar el generador
generarEstructura(); 