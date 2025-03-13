document.addEventListener('DOMContentLoaded', function() {
  // Crear el elemento del botón de WhatsApp
  const whatsappButton = document.createElement('a');
  whatsappButton.href = 'https://api.whatsapp.com/send?phone=5491112345678&text=Hola%20Lusqtoff,%20me%20gustaría%20recibir%20más%20información%20sobre%20sus%20productos';
  whatsappButton.className = 'whatsapp-button';
  whatsappButton.setAttribute('target', '_blank');
  whatsappButton.setAttribute('aria-label', 'Contáctanos vía WhatsApp');
  
  // Crear el icono principal de WhatsApp usando SVG
  const icon = document.createElement('div');
  icon.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="30" height="30" fill="#FFF">
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32 101.5 32 2 131.6 2 254.1c0 39.1 10.2 77.3 29.6 110.9L6 480l117.5-25.6c32.7 17.8 69.4 27.1 107.3 27.1 122.4 0 222-99.6 222-222.1 0-59.3-23.1-115.1-65.9-157.3zM223.9 403.6c-33 0-65.5-8.9-93.9-25.7l-6.7-4-69.8 18.3 18.3-69.8-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.6 184.6-184.6 49.3 0 95.1 19.2 129.7 54.1 34.6 34.8 53.7 80.6 53.7 129.9 0 101.7-82.8 184.6-184.6 184.6zm101.7-138.5c-5.5-2.8-32.6-16.1-37.7-17.9-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.5-14.3 17.9-17.6 21.6-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.3-8.6-44.4-27.5-16.4-14.6-27.5-32.7-30.8-38.2-3.2-5.5-.3-8.5 2.5-11.3 2.6-2.6 5.5-6.5 8.3-9.7 2.8-3.2 3.7-5.5 5.5-9.2 1.9-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.2-17.1-41.3-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.7 6.9-5.1 5.5-19.3 18.9-19.3 46s19.8 53.5 22.6 57.2c2.8 3.7 38.9 59.4 94.1 83.4 13.1 5.7 23.3 9.1 31.3 11.6 13.1 4.2 25.1 3.6 34.6 2.2 10.5-1.6 32.6-13.3 37.2-26.2 4.6-12.8 4.6-23.7 3.2-26.2-1.3-2.5-5-3.9-10.5-6.6z"/>
    </svg>
  `;
  
  // Crear tooltip
  const tooltip = document.createElement('span');
  tooltip.className = 'whatsapp-tooltip';
  
  // Añadir un ícono dentro del tooltip usando SVG
  const tooltipIcon = document.createElement('div');
  tooltipIcon.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="18" height="18" fill="#25d366">
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32 101.5 32 2 131.6 2 254.1c0 39.1 10.2 77.3 29.6 110.9L6 480l117.5-25.6c32.7 17.8 69.4 27.1 107.3 27.1 122.4 0 222-99.6 222-222.1 0-59.3-23.1-115.1-65.9-157.3zM223.9 403.6c-33 0-65.5-8.9-93.9-25.7l-6.7-4-69.8 18.3 18.3-69.8-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.6 184.6-184.6 49.3 0 95.1 19.2 129.7 54.1 34.6 34.8 53.7 80.6 53.7 129.9 0 101.7-82.8 184.6-184.6 184.6zm101.7-138.5c-5.5-2.8-32.6-16.1-37.7-17.9-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.5-14.3 17.9-17.6 21.6-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.3-8.6-44.4-27.5-16.4-14.6-27.5-32.7-30.8-38.2-3.2-5.5-.3-8.5 2.5-11.3 2.6-2.6 5.5-6.5 8.3-9.7 2.8-3.2 3.7-5.5 5.5-9.2 1.9-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.2-17.1-41.3-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.7 6.9-5.1 5.5-19.3 18.9-19.3 46s19.8 53.5 22.6 57.2c2.8 3.7 38.9 59.4 94.1 83.4 13.1 5.7 23.3 9.1 31.3 11.6 13.1 4.2 25.1 3.6 34.6 2.2 10.5-1.6 32.6-13.3 37.2-26.2 4.6-12.8 4.6-23.7 3.2-26.2-1.3-2.5-5-3.9-10.5-6.6z"/>
    </svg>
  `;
  
  // Crear un contenedor para el texto del tooltip
  const tooltipText = document.createElement('span');
  tooltipText.innerHTML = 'Contáctanos<br>vía WhatsApp'; // Dividir el texto en dos líneas
  
  // Agregar el ícono y el texto al tooltip
  tooltip.appendChild(tooltipIcon);
  tooltip.appendChild(tooltipText);
  
  // Agregar icono y tooltip al botón
  whatsappButton.appendChild(icon);
  whatsappButton.appendChild(tooltip);
  
  // Agregar el botón al body
  document.body.appendChild(whatsappButton);
});
