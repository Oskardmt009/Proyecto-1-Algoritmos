// Función para mostrar diferentes pantallas
function showScreen(screenId) {
    // Ocultar todas las pantallas
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Mostrar la pantalla seleccionada
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
    
    // Limpiar resultados cuando se cambia de pantalla
    clearResults();
}

// Función para limpiar todos los resultados
function clearResults() {
    const resultados = document.querySelectorAll('.resultado');
    resultados.forEach(resultado => {
        resultado.innerHTML = '';
        resultado.classList.remove('success', 'error');
    });
}

// Función para mostrar resultado
function mostrarResultado(elementId, mensaje, esExito = true) {
    const elemento = document.getElementById(elementId);
    if (elemento) {
        elemento.innerHTML = mensaje;
        elemento.classList.remove('success', 'error');
        elemento.classList.add(esExito ? 'success' : 'error');
    }
}

// Función para validar que un valor sea un número válido
function esNumeroValido(valor) {
    return !isNaN(valor) && valor !== '' && valor !== null;
}

// EJERCICIO 1: Suma de dos números
function calcularSuma() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    
    if (!esNumeroValido(num1) || !esNumeroValido(num2)) {
        mostrarResultado('resultado-suma', 'Por favor, ingresa números válidos en ambos campos.', false);
        return;
    }
    
    //--------------------Aqui va la solicion del ejercicio 1--------------------

    let suma = num1 + num2; // Calcula la suma de los dos números
    mostrarResultado('resultado-suma',"El resultado es: " + suma);

    //--------------------Aqui termina la solicion del ejercicio 1--------------------
}

// EJERCICIO 2: Promedio de 3 números
function calcularPromedio() {
    const prom1 = parseFloat(document.getElementById('prom1').value);
    const prom2 = parseFloat(document.getElementById('prom2').value);
    const prom3 = parseFloat(document.getElementById('prom3').value);
    
    if (!esNumeroValido(prom1) || !esNumeroValido(prom2) || !esNumeroValido(prom3)) {
        mostrarResultado('resultado-promedio', 'Por favor, ingresa números válidos en todos los campos.', false);
        return;
    }
    

    //--------------------Aqui va la solicion del ejercicio 2--------------------

    const promedio = (prom1 + prom2 + prom3) / 3; // Calcula el promedio de los tres números
    document.getElementById('resultado-promedio').innerHTML = "El promedio es: "+ promedio;

    //--------------------Aqui termina la solicion del ejercicio 2--------------------
}

// EJERCICIO 3: Calcular edad en días
function calcularEdadDias() {
    const anos = parseFloat(document.getElementById('anos').value);
    
    if (!esNumeroValido(anos) || anos < 0) {
        mostrarResultado('resultado-edad', 'Por favor, ingresa una edad válida (número positivo).', false);
        return;
    }
    
        //--------------------Aqui va la solicion del ejercicio 3--------------------

    const dias = anos * 365.25; // Calcula la edad en días (considerando años bisiestos)
    document.getElementById('resultado-edad').innerHTML = "Tu edad en días es: "+ dias;

    //--------------------Aqui termina la solicion del ejercicio 3--------------------
}

// EJERCICIO 4: Calcular minutos en un año
function calcularMinutosAno() {
    const diasEnAno = 365;
    const horasPorDia = 24;
    const minutosPorHora = 60;
    
    let totalMinutos = 0;//usa esta constante para el resultado

        //--------------------Aqui va la solicion del ejercicio 4--------------------

    totalMinutos = diasEnAno * horasPorDia * minutosPorHora;
    document.getElementById('resultado-minutos').innerHTML = "Un año tiene: "+ totalMinutos + " minutos";

    //--------------------Aqui termina la solicion del ejercicio 4--------------------
    
    mostrarResultado('resultado-minutos', 
        `Un año tiene ${totalMinutos.toLocaleString()} minutos.<br>
        <small>Cálculo: ${diasEnAno} días × ${horasPorDia} horas × ${minutosPorHora} minutos = ${totalMinutos.toLocaleString()} minutos</small>`
    );
}

// EJERCICIO 5: Calcular precio con impuesto del 19%
function calcularPrecioConImpuesto() {
    const precio = parseFloat(document.getElementById('precio').value);
    
    if (!esNumeroValido(precio) || precio < 0) {
        mostrarResultado('resultado-impuesto', 'Por favor, ingresa un precio válido (número positivo).', false);
        return;
    }
    
    const impuesto = 0.19; // 19%
    let valorImpuesto = 0;//usa esta constante para el resultado
    let precioFinal = 0;//usa esta constante para el resultado

    //--------------------Aqui va la solicion del ejercicio 5--------------------

    valorImpuesto = precio * impuesto; // Calcula el valor del impuesto
    precioFinal = precio +(precio * impuesto); // Calcula el precio final con impuesto
    document.getElementById('resultado-impuesto').innerHTML = "Impuesto: "+ valorImpuesto + ". El precio final con impuesto es: "+ precioFinal;


    //--------------------Aqui termina la solicion del ejercicio 5--------------------
    
    mostrarResultado('resultado-impuesto', 
        `Precio original: $${precio.toFixed(2)}<br>
        Impuesto (19%): $${valorImpuesto.toFixed(2)}<br>
        <strong>Precio final: $${precioFinal.toFixed(2)}</strong>`
    );
}

// Eventos para mejorar la experiencia del usuario
document.addEventListener('DOMContentLoaded', function() {
    // Agregar eventos Enter para los inputs
    const inputs = document.querySelectorAll('input[type="number"]');
    
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                // Buscar el botón de cálculo en la misma pantalla
                const screen = input.closest('.screen');
                const calcButton = screen.querySelector('button:not(.back-btn)');
                if (calcButton) {
                    calcButton.click();
                }
            }
        });
        
        // Limpiar resultado cuando el usuario empiece a escribir
        input.addEventListener('input', function() {
            const screen = input.closest('.screen');
            const resultado = screen.querySelector('.resultado');
            if (resultado && resultado.innerHTML !== '') {
                resultado.innerHTML = '';
                resultado.classList.remove('success', 'error');
            }
        });
    });
});

// Función de inicialización
function init() {
    // Mostrar el menú principal al cargar la página
    showScreen('menu');
}