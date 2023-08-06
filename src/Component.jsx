import React, { useState } from 'react';
import './App.css';

const Component = () => {

  const [sesionIniciada, setSesionIniciada] = useState(false);

  // Función para cargar las publicaciones 
  const cargarPublicaciones = () => {
    const users = []; 
    const posts = [
    ]; 

    return users.map((user, index) => (
      <div key={index} className="publication">
        <span className="user-info">{user}</span>: {posts[index]}
      </div>
    ));
  };

  // Función para mostrar el formulario de inicio de sesión
  const mostrarFormulario = () => {
    const formularioInicioSesion = document.getElementById("login-form");
    formularioInicioSesion.style.display = "block";
  };

  // Función para cerrar el formulario de inicio de sesión
  const cerrarFormulario = () => {
    const formularioInicioSesion = document.getElementById("login-form");
    formularioInicioSesion.style.display = "none";
  };

  // Función para mostrar el formulario de registro
  const mostrarFormularioRegistro = () => {
    const formularioRegistro = document.getElementById("register-form");
    formularioRegistro.style.display = "block";
  };

  // Función para cerrar el formulario de registro
  const cerrarFormularioRegistro = () => {
    const formularioRegistro = document.getElementById("register-form");
    formularioRegistro.style.display = "none";
  };

  // Función para el inicio de sesión
  const iniciarSesion = (event) => {
    event.preventDefault(); // Evitar el envío del formulario para este ejemplo

    // Obtener los valores ingresados por el usuario
    const usuario = document.getElementById("usuario").value;
    const clave = document.getElementById("clave").value;

    
    if (usuario === nombreUsuarioCorrecto && clave === contraseniaCorrecta) {
      // Cambiar el estado de inicio de sesión
      setSesionIniciada(true);
      // Cargar el cuadro de texto para escribir publicaciones
      cargarCuadroTexto();
      // Cerrar el formulario de inicio de sesión
      cerrarFormulario();
    } else {
      alert("Datos Erróneos");
    }
  };

  // Función para cargar el cuadro de texto para escribir publicaciones
  const cargarCuadroTexto = () => {
    const publicationsContainer = document.getElementById("publications");

    // Crear un cuadro de texto para escribir las publicaciones
    const postForm = document.createElement("div");
    postForm.id = "post-form";
    postForm.innerHTML = `
      <textarea id="post-text" placeholder="Escribe tu publicación..." rows="5"></textarea>
      <button id="post-button">Publicar</button>
    `;

    const postText = postForm.querySelector("#post-text");
    postText.style.width = "100%"; 
    postText.style.maxWidth = "600px"; 

    publicationsContainer.appendChild(postForm);

    const postButton = postForm.querySelector("#post-button");
    postButton.onclick = () => {
      publicar();
    };
  };

  // Función para publicar una nueva publicación
  const publicar = () => {
    const postText = document.getElementById("post-text").value;
    if (postText.trim() !== "") {
      const miUsuario = nombreUsuarioCorrecto;
      agregarPublicacion(`${miUsuario}: ${postText}`);
      document.getElementById("post-text").value = "";
    }
  };

  // Función para agregar una nueva publicación al contenedor
  const agregarPublicacion = (publicacion) => {
    const publicationsContainer = document.getElementById("publications");
    const publicationDiv = document.createElement("div");
    publicationDiv.className = "publication";
    publicationDiv.textContent = publicacion;
    publicationsContainer.appendChild(publicationDiv);

    const postForm = document.getElementById("post-form");
    publicationsContainer.appendChild(postForm);
  };

  // Función para cerrar sesión
  const cerrarSesion = () => {
    // Cambiar el estado de inicio de sesión
    setSesionIniciada(false);
    // Mostrar el formulario de inicio de sesión
    mostrarFormulario();
    // Limpiar el cuadro de texto para escribir publicaciones
    const postForm = document.getElementById("post-form");
    if (postForm) {
      postForm.remove();
    }
    // Cambiar el botón de "Cerrar Sesión" a "Iniciar Sesión"
    const loginButton = document.getElementById("login-button");
    loginButton.textContent = "Iniciar Sesión";
  };

  // Función para mostrar u ocultar el formulario de inicio de sesión
  const toggleFormulario = () => {
    const loginButton = document.getElementById("login-button");

    if (sesionIniciada) {
      // Si la sesión está iniciada cerrar sesión
      cerrarSesion();
    } else {
      // Si la sesión no está iniciada mostrar u ocultar el formulario de inicio de sesión
      const formularioInicioSesion = document.getElementById("login-form");
      formularioInicioSesion.style.display = formularioInicioSesion.style.display === "block" ? "none" : "block";
    }
  };

  // Función para registrar un nuevo usuario (Implementación básica)
  const agregarUsuarioALaBaseDeDatos = (nombre, email, contrasenia) => {
    return new Promise((resolve, reject) => {
      
      setTimeout(() => {
        resolve();
      }, 1000); 
    });
  };

  // Función para registrar un nuevo usuario
  const registrarUsuario = (event) => {
    event.preventDefault(); 

    // Obtener los valores ingresados por el usuario
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const contrasenia = document.getElementById("contrasenia").value;

    
    agregarUsuarioALaBaseDeDatos(nombre, email, contrasenia)
      .then(() => {
        
        console.log("Usuario registrado:", nombre, email, contrasenia);
        alert("Usuario Creado");
        
        cerrarFormularioRegistro();
      })
      .catch((error) => {
        
        console.log("Error al registrar el usuario:", error);
        alert("Error creando el usuario");
      });
  };

 
  cargarPublicaciones();

  return (
    <>
      <header>
        <h1 className="title">Itla Post</h1>
      </header>

      <div id="button-container">
     
        <button id="login-button" onClick={toggleFormulario}>
          {sesionIniciada ? 'Cerrar Sesión' : 'Iniciar Sesión'}
        </button>

      
        {!sesionIniciada && (
          <button id="register-button" onClick={mostrarFormularioRegistro}>
            Registro
          </button>
        )}
      </div>

      <div className="container">
        <div id="publications">{cargarPublicaciones()}</div>
        <div id="user-section">
          
          <div id="login-form" className="modal" style={{ display: sesionIniciada ? 'none' : 'block' }}>
            <span className="close" onClick={toggleFormulario}>
              &times;
            </span>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={iniciarSesion}>
              <input type="text" id="usuario" placeholder="Nombre de usuario" required />
              <input type="password" id="clave" placeholder="Contraseña" required />
              <button type="submit">Iniciar Sesión</button>
            </form>
          </div>

         
          <div id="register-form" className="modal" style={{ display: 'none' }}>
            <span className="close" onClick={cerrarFormularioRegistro}>
              &times;
            </span>
            <h2>Registro</h2>
            <form onSubmit={registrarUsuario}>
              <input type="text" id="nombre" placeholder="Nombre" required />
              <input type="email" id="email" placeholder="Email" required />
              <input type="password" id="contrasenia" placeholder="Contraseña" required />
              <button type="submit">Registrar</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Component;


