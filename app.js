let amigos = [];  // Lista de amigos
let resultado = {};  // Objeto para almacenar el resultado del sorteo

// Función para agregar un amigo a la lista
function agregarAmigo() {
    const inputAmigo = document.getElementById('amigo');
    const nombreAmigo = inputAmigo.value.trim();

    // Validar si el nombre está vacío
    if (nombreAmigo === "") {
        alert("Por favor ingrese un nombre válido.");
        inputAmigo.value = "";  // Limpiar el campo
        return;
    }

    // Validar que el nombre no contenga números
    if (contieneNumeros(nombreAmigo)) {
        alert("por favor ingrese un nombre correctamente");
        inputAmigo.value = "";  // Limpiar el campo
        return;
    }

    // Verificar si el nombre ya está en la lista
    if (amigos.includes(nombreAmigo)) {
        alert("Este amigo ya ha sido agregado.");
        inputAmigo.value = "";  // Limpiar el campo
        return;
    }

    amigos.push(nombreAmigo);
    inputAmigo.value = ""; // Limpiar el campo de texto

    // Mostrar la lista de amigos
    mostrarListaAmigos();

    // Habilitar el botón de sorteo si hay más de 1 amigo
    if (amigos.length > 1) {
        document.querySelector('.button-draw').disabled = false;
    }
}

// Función para verificar si un nombre contiene números
function contieneNumeros(nombre) {
    return /\d/.test(nombre);  // Usamos una expresión regular para buscar números
}

// Función para mostrar la lista de amigos
function mostrarListaAmigos() {
    const listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.innerHTML = ''; // Limpiar la lista

    amigos.forEach(amigo => {
        const li = document.createElement('li');
        li.textContent = amigo;
        listaAmigos.appendChild(li);
    });
}

// Función para realizar el sorteo y asignar un solo amigo secreto
function sortearAmigo() {
    if (amigos.length < 2) {
        alert("Debe haber al menos dos amigos para realizar el sorteo.");
        return;
    }

    // Seleccionar un amigo aleatorio para hacer el sorteo
    const amigoAleatorio = amigos[Math.floor(Math.random() * amigos.length)];

    // Asignar un amigo secreto
    let amigoSecreto = amigos[Math.floor(Math.random() * amigos.length)];

    // Asegurarse de que no se le asigne a alguien a sí mismo
    while (amigoSecreto === amigoAleatorio) {
        amigoSecreto = amigos[Math.floor(Math.random() * amigos.length)];
    }

    resultado[amigoAleatorio] = amigoSecreto;  // Almacenamos el amigo secreto

    // Mostrar el resultado en la interfaz
    mostrarResultado(amigoAleatorio, amigoSecreto);
}

// Función para mostrar el resultado del sorteo de un solo amigo secreto
function mostrarResultado(amigo, amigoSecreto) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '';  // Limpiar resultados previos

    // Mostrar el amigo secreto seleccionado
    const li = document.createElement('li');
    li.textContent = `${amigo} -> Amigo Secreto: ${amigoSecreto}`;
    resultadoDiv.appendChild(li);

    // Deshabilitar el botón de sorteo después de realizar el sorteo
    document.querySelector('.button-draw').disabled = true;
}

