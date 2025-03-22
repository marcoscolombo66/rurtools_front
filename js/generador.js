const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

// URL base de la API
const API_BASE_URL = 'http://sd-1464111-h00028.ferozo.net/admin/api';

// Función para crear el HTML de una categoría
function crearHTMLCategoria(categoria) {
    return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8"/>
    <meta content="width=device-width, initial-scale=1" name="viewport"/>
    <title>${categoria.nombreCategoria} - RUR Tools</title>
    <!-- favicon -->
    <link href="../../2023/pics/favicon/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180"/>
    <link href="../../2023/pics/favicon/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png"/>
    <link href="../../2023/pics/favicon/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png"/>
    <link href="../../2023/pics/favicon/site.webmanifest" rel="manifest"/>
    <link color="#5bbad5" href="../../2023/pics/favicon/safari-pinned-tab.svg" rel="mask-icon"/>
    <meta content="#da532c" name="msapplication-TileColor"/>
    <meta content="#ffffff" name="theme-color"/>
    <!-- fonts -->
    <link href="https://fonts.googleapis.com" rel="preconnect"/>
    <link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
    <link href="../../css/css2" rel="stylesheet"/>
    <!-- font-awesome -->
    <link href="../../css/fontawesome.min.css" rel="stylesheet"/>
    <link href="../../css/brands.min.css" rel="stylesheet"/>
    <link href="../../css/solid.min.css" rel="stylesheet"/>
    <!-- css -->
    <link href="../../css/bootstrap.min.css" rel="stylesheet"/>
    <link href="../../css/fancybox.css" rel="stylesheet"/>
    <link href="../../css/flickity.css" rel="stylesheet"/>
    <link href="../../css/swiper-bundle.min.css" rel="stylesheet"/>
    <link href="../../css/common.min.css" rel="stylesheet"/>
    <!-- js -->
    <script src="../../js/api.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', async () => {
            try {
                const productos = await api.getProductosPorCategoria(${categoria.idCategoria});
                const contenedor = document.querySelector('.row.justify-content-center');
                
                if (productos && productos.length > 0) {
                    contenedor.innerHTML = productos.map(producto => \`
                        <div class="col-6 col-lg-4 col-xl-3">
                            <a class="prod-link" href="../producto/\${producto.sku}/index.html">
                                <div class="image" style="background-image:url('\${producto.imagen || '../../../images2/images/logo_rur.png'}');">
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
    <header class="border-bottom">
        <div class="container-fluid container-lg">
            <div class="row">
                <div class="col d-flex align-items-center justify-content-between">
                    <div class="header-brand">
                        <a href="../../index.html">
                            <img alt="RUR Tools" class="img-fluid" src="../../images2/images/logo_rur.png"/>
                        </a>
                    </div>
                    <div class="header-actions">
                        <a class="btn-search" href="#">
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </a>
                        <a class="btn-nav d-flex d-lg-none" href="#">
                            <i class="fa-solid fa-bars"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <!-- ./header -->

    <!-- main -->
    <main>
        <section class="py-5">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <h1 class="color-white">${categoria.nombreCategoria}</h1>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-12 text-center">
                        <p>Cargando productos...</p>
                    </div>
                </div>
            </div>
        </section>
    </main>
    <!-- ./main -->

    <!-- footer -->
    <footer>
        <div class="container">
            <div class="row">
                <div class="col">
                    <h5>RUR Tools</h5>
                    <p>
                        <a href="mailto:info@rurtools.com.ar">
                            info@rurtools.com.ar
                        </a>
                    </p>
                </div>
            </div>
        </div>
    </footer>
    <!-- ./footer -->

    <!-- js -->
    <script src="../../js/bootstrap.bundle.min.js" type="text/javascript"></script>
    <script src="../../js/jquery.min.js" type="text/javascript"></script>
    <script src="../../js/fancybox.umd.js" type="text/javascript"></script>
    <script src="../../js/sweetalert2@11" type="text/javascript"></script>
    <script src="../../js/flickity.pkgd.min.js" type="text/javascript"></script>
    <script src="../../js/swiper-bundle.min.js" type="text/javascript"></script>
    <script src="../../js/matchHeight-min.js" type="text/javascript"></script>
    <script src="../../js/common.js" type="text/javascript"></script>
</body>
</html>`;
}

async function generarEstructura() {
    try {
        // Obtener categorías de la API
        const response = await fetch(`${API_BASE_URL}/Categorias`, {
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
            
            // Crear carpeta para productos de esta categoría
            const rutaProductos = path.join(basePath, 'producto');
            if (!fs.existsSync(rutaProductos)) {
                fs.mkdirSync(rutaProductos, { recursive: true });
            }
        }

        console.log('Estructura generada correctamente');
    } catch (error) {
        console.error('Error al generar la estructura:', error);
    }
}

// Ejecutar el generador
generarEstructura(); 