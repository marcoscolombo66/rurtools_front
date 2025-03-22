const API_BASE_URL = 'https://sd-1464111-h00028.ferozo.net/admin/api';

// Función para obtener categorías
async function getCategorias() {
    try {
        console.log('Intentando obtener categorías...');
        
        // Intenta realizar la solicitud con un timeout de 10 segundos
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        const response = await fetch(`${API_BASE_URL}/Categorias`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Datos recibidos:', data);
        
        // Verificar que los datos son un array
        if (!Array.isArray(data)) {
            console.error('La respuesta no es un array:', data);
            throw new Error('Formato de respuesta incorrecto');
        }
        
        return data;
    } catch (error) {
        console.error('Error al obtener categorías:', error);
        
        // Devolver datos de ejemplo si la API falla
        console.log('Usando datos de ejemplo para categorías...');
        return [
            { 
                idCategoria: '1', 
                nombreCategoria: 'Herramientas Eléctricas', 
                imagen: '../../images2/images/categoria-herramientas.jpg' 
            },
            { 
                idCategoria: '2', 
                nombreCategoria: 'Jardinería', 
                imagen: '../../images2/images/categoria-jardineria.jpg' 
            },
            { 
                idCategoria: '3', 
                nombreCategoria: 'Maquinaria', 
                imagen: '../../images2/images/categoria-maquinaria.jpg' 
            },
            { 
                idCategoria: '4', 
                nombreCategoria: 'Accesorios', 
                imagen: '../../images2/images/categoria-accesorios.jpg' 
            }
        ];
    }
}

// Función para obtener todos los productos
async function getAllProductos() {
    try {
        console.log('Obteniendo todos los productos...');
        const response = await fetch(`${API_BASE_URL}/Productos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const text = await response.text();
        console.log('Respuesta cruda:', text);
        
        // Intentar limpiar la respuesta
        let cleanText = text
            .replace(/\n/g, '') // Eliminar saltos de línea
            .replace(/\r/g, '') // Eliminar retornos de carro
            .trim(); // Eliminar espacios en blanco al inicio y final
        
        // Asegurarse de que la respuesta es un JSON válido
        if (!cleanText.startsWith('[')) {
            cleanText = cleanText.substring(cleanText.indexOf('['));
        }
        if (!cleanText.endsWith(']')) {
            cleanText = cleanText.substring(0, cleanText.lastIndexOf(']') + 1);
        }

        console.log('JSON limpio:', cleanText);
        
        const data = JSON.parse(cleanText);
        console.log('Productos parseados:', data);
        return data;
    } catch (error) {
        console.error('Error al obtener productos:', error);
        throw error;
    }
}

// Función para obtener productos por categoría
async function getProductosPorCategoria(categoriaId) {
    try {
        console.log('Obteniendo productos para categoría:', categoriaId);
        const productos = await getAllProductos();
        
        if (!Array.isArray(productos)) {
            console.error('La respuesta no es un array:', productos);
            return [];
        }
        
        // Filtrar productos por categoría
        const productosFiltrados = productos.filter(producto => {
            console.log('Comparando producto:', producto);
            return producto && producto.idCategoria && String(producto.idCategoria) === String(categoriaId);
        });
        
        console.log('Productos filtrados para categoría:', productosFiltrados);
        
        if (productosFiltrados.length === 0) {
            // Usar datos de ejemplo si no hay productos
            console.log('No se encontraron productos. Usando datos de ejemplo...');
            return getDatosEjemploProductos(categoriaId);
        }
        
        return productosFiltrados;
    } catch (error) {
        console.error('Error al obtener productos por categoría:', error);
        // Datos de ejemplo como fallback
        return getDatosEjemploProductos(categoriaId);
    }
}

// Función para obtener datos de ejemplo de productos
function getDatosEjemploProductos(categoriaId) {
    const productosEjemplo = {
        '1': [
            { 
                idProducto: '101', 
                idCategoria: '1', 
                nombreProducto: 'Taladro Percutor 13mm',
                SKUCode: 'TP1300',
                fotoProducto: 'taladro.jpg',
                descripcionProducto: 'Taladro percutor profesional de 13mm con potencia de 800W.'
            },
            { 
                idProducto: '102', 
                idCategoria: '1', 
                nombreProducto: 'Amoladora Angular 115mm',
                SKUCode: 'AG115',
                fotoProducto: 'amoladora.jpg',
                descripcionProducto: 'Amoladora angular de 115mm con 750W de potencia.'
            }
        ],
        '2': [
            { 
                idProducto: '201', 
                idCategoria: '2', 
                nombreProducto: 'Cortadora de Césped',
                SKUCode: 'CC2000',
                fotoProducto: 'cortacesped.jpg',
                descripcionProducto: 'Cortadora de césped con motor de 2000W y ancho de corte de 40cm.'
            }
        ],
        '3': [
            { 
                idProducto: '301', 
                idCategoria: '3', 
                nombreProducto: 'Generador Eléctrico',
                SKUCode: 'GE5500',
                fotoProducto: 'generador.jpg',
                descripcionProducto: 'Generador eléctrico de 5500W con arranque eléctrico.'
            }
        ],
        '4': [
            { 
                idProducto: '401', 
                idCategoria: '4', 
                nombreProducto: 'Kit de Puntas para Atornillador',
                SKUCode: 'KP50',
                fotoProducto: 'puntas.jpg',
                descripcionProducto: 'Set de 50 puntas para atornillador con estuche.'
            }
        ]
    };
    
    return productosEjemplo[categoriaId] || [];
}

// Función para obtener un producto específico
async function getProducto(productoId) {
    try {
        console.log('Obteniendo producto:', productoId);
        const productos = await getAllProductos();
        
        if (!Array.isArray(productos)) {
            console.error('La respuesta no es un array:', productos);
            return null;
        }
        
        return productos.find(producto => 
            producto && producto.idProducto && String(producto.idProducto) === String(productoId)
        );
    } catch (error) {
        console.error('Error al obtener producto:', error);
        return null;
    }
}

// Función para generar URL amigable
function generarUrlAmigable(texto) {
    return texto
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

// Función para renderizar categorías en la página principal
async function renderizarCategorias() {
    try {
        console.log('Iniciando renderización de categorías...');
        const categorias = await getCategorias();
        const contenedor = document.querySelector('.row.justify-content-center');
        
        if (!contenedor) {
            console.error('No se encontró el contenedor de categorías');
            return;
        }

        if (!categorias || categorias.length === 0) {
            console.log('No se encontraron categorías');
            contenedor.innerHTML = '<div class="col-12 text-center"><p>No hay categorías disponibles</p></div>';
            return;
        }

        console.log('Renderizando categorías:', categorias);
        contenedor.innerHTML = categorias.map(categoria => `
            <div class="col-6 col-lg-4 col-xl-3">
                <a class="cat-link" href="pages/ver-productos/${categoria.idCategoria}-${categoria.nombreCategoria.toLowerCase().replace(/\s+/g, '-')}/index.html">
                    <div class="image" style="background-image:url('${categoria.imagen || 'images2/images/logo_rur.png'}');">
                    </div>
                    <div class="name">
                        ${categoria.nombreCategoria}
                    </div>
                    <div class="dots">
                    </div>
                </a>
            </div>
        `).join('');
        console.log('Renderización completada');
    } catch (error) {
        console.error('Error en renderizarCategorias:', error);
        const contenedor = document.querySelector('.row.justify-content-center');
        if (contenedor) {
            contenedor.innerHTML = '<div class="col-12 text-center"><p>Error al cargar las categorías</p></div>';
        }
    }
}

// Función para renderizar productos en una categoría
async function renderizarProductosCategoria(categoriaId) {
    const productos = await getProductosPorCategoria(categoriaId);
    const contenedor = document.querySelector('.row.justify-content-center');
    
    if (!contenedor) return;

    contenedor.innerHTML = productos.map(producto => `
        <div class="col-6 col-lg-4 col-xl-3">
            <a class="prod-link" href="pages/ver-producto/${producto.sku}/index.html">
                <div class="image" style="background-image:url('${producto.imagen || 'images2/images/logo_rur.png'}');">
                </div>
                <div class="name" data-mh="product">
                    ${producto.nombre}
                </div>
                <div class="sku">
                    ${producto.sku}
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
    `).join('');
}

// Función para crear el HTML de una categoría
async function crearHTMLCategoria(categoria) {
    const nombreCarpeta = `${categoria.idCategoria}-${categoria.nombreCategoria.toLowerCase().replace(/\s+/g, '-')}`;
    const rutaCategoria = `pages/ver-productos/${nombreCarpeta}`;
    
    // Crear el contenido HTML
    const contenidoHTML = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8"/>
    <meta content="width=device-width, initial-scale=1" name="viewport"/>
    <title>${categoria.nombreCategoria} - RUR Tools</title>
    <!-- Resto de los meta tags y CSS -->
    <script src="../../js/api.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', async () => {
            try {
                const productos = await api.getProductosPorCategoria(${categoria.idCategoria});
                const contenedor = document.querySelector('.row.justify-content-center');
                
                if (productos && productos.length > 0) {
                    contenedor.innerHTML = productos.map(producto => \`
                        <div class="col-6 col-lg-4 col-xl-3">
                            <a class="prod-link" href="../producto/${producto.sku}/index.html">
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
    <!-- Contenido del body -->
</body>
</html>`;

    return contenidoHTML;
}

// Exportar funciones
window.api = {
    getCategorias,
    getProductosPorCategoria,
    getProducto,
    renderizarCategorias,
    renderizarProductosCategoria
}; 