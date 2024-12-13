import { Check } from './check.js';
const Cliente = {
    send: (data)=>{
        fetch('http://localhost:3000/api/items', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
            .then(response => {
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.json();
            })
            .then(data => {
              console.log('Ítem creado:', data);
            })
            .catch(error => {
              console.error('Error al crear el ítem:', error);
            });
          
    }
}
// Función para cargar la configuración y crear los controles
async function iniciarControlRiego() {
  try {
      // Obtener grupos del servidor
      const grupos = await fetch('http://localhost:3000/api/config')
          .then(res => res.json());
      
      // Contenedor principal
      const container = document.getElementById('container');
      
      // Crear controles para cada grupo
      grupos.forEach(grupo => {
          // Crear contenedor para el grupo
          const grupoDiv = document.createElement('div');
          grupoDiv.id = grupo.id;
          container.appendChild(grupoDiv);
          
          // Añadir controles de riego
          const control = new Check(grupoDiv, Cliente);
          grupo.valvulas.forEach(riego => {
              control.addCheck(`${grupo.id}_${riego}`);
          });
      });

  } catch (error) {
      console.error('Error de configuración:', error);
  }
}

// Iniciar cuando cargue la página
iniciarControlRiego();