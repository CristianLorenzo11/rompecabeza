document.addEventListener('DOMContentLoaded', () => {
    const pieces = document.querySelectorAll('.puzzle-piece, .puzzle-piece1 , .puzzle-piece2 , .puzzle-piece3, .puzzle-piece4, .puzzle-piece5,.puzzle-piece6');

    const nextButton = document.getElementById('next-button'); // Aquí defines el botón "Ir al siguiente rompecabezas"
    let selectedPiece = null;
    let gameStarted = false; // Variable para indicar si el juego ha comenzado
    let gameWon = false; // Variable para indicar si el juego ha sido ganado

    // Función para verificar si el rompecabezas está desordenado
    function estaDesordenado() {
        const posicionesOriginales = [
            '0% 0%', '-100% 0%', '-200% 0%',
            '0% -100%', '-100% -100%', '-200% -100%',
            '0% -200%', '-100% -200%', '-200% -200%'
        ];

        const posicionesActuales = Array.from(pieces).map(piece => piece.style.backgroundPosition);

        return !posicionesActuales.every((posicion, index) => posicion === posicionesOriginales[index]);
    }
// Función para ordenar las piezas del rompecabezas
function ordenarPiezas() {
    const posicionesOriginales = [
        '0% 0%', '-100% 0%', '-200% 0%',
        '0% -100%', '-100% -100%', '-200% -100%',
        '0% -200%', '-100% -200%', '-200% -200%'
    ];

    pieces.forEach((piece, index) => {
        piece.style.backgroundPosition = posicionesOriginales[index];
        startButton.style.display= 'none'
        
    });
}

// Evento de clic en el botón de ordenar
const botonOrdenar = document.getElementById('boton-ordenar');
botonOrdenar.addEventListener('click', () => {
    ordenarSiDesordenado();
    // Deshabilitar la capacidad de seleccionar piezas después de ordenar
    pieces.forEach(piece => {
        console.log("Intentando deshabilitar clics...");
        piece.removeEventListener('click', selectPiece);
        console.log("Clics deshabilitados para esta pieza.");
        const messageContainer = document.getElementById('message-container');
        messageContainer.textContent = '¡CLIC EN VOLVER A COMENZAR!';
    });
});

// Función para ordenar las piezas del rompecabezas si está desordenado
function ordenarSiDesordenado() {
    console.log("Intentando ordenar...");
    if (estaDesordenado()) {
        console.log("Rompecabezas desordenado. Ordenando...");
        ordenarPiezas();
        console.log("Rompecabezas ordenado.");
    } else {
        console.log("El rompecabezas ya está ordenado.");
    }
}



    // Asignar posiciones de fondo a cada pieza
    pieces.forEach((piece, index) => {
        piece.style.backgroundPosition = `-${index % 3 * 100}% -${Math.floor(index / 3) * 100}%`;
        piece.style.backgroundSize = '300% 300%'; // Ajustar el tamaño para mostrar solo una parte de la imagen
    });

    // Función para seleccionar una pieza al hacer clic en ella
    function selectPiece(event) {
        if (gameStarted && !gameWon) { // Permitir movimientos solo si el juego ha comenzado y aún no ha sido ganado
            if (!selectedPiece) {
                selectedPiece = this;
                this.classList.add('selected'); // Agregar clase 'selected' para resaltar la pieza
            } else {
                swapPieces(selectedPiece, this);
                selectedPiece.classList.remove('selected'); // Quitar la clase 'selected' de la pieza previamente seleccionada
                selectedPiece = null;
                checkWin(); // Verificar si se ha ganado el juego después de cada movimiento
            }
        }
    }

    // Función para intercambiar las posiciones de dos piezas
    function swapPieces(piece1, piece2) {
        if (!gameWon) { // Verificar si el juego aún no ha sido ganado
            const tempBackgroundPosition = piece1.style.backgroundPosition;
            piece1.style.backgroundPosition = piece2.style.backgroundPosition;
            piece2.style.backgroundPosition = tempBackgroundPosition;
        }
    }

    // Función para verificar si todas las piezas están en las posiciones correctas
    function checkWin() {
        const correctPositions = ['0% 0%', '-100% 0%', '-200% 0%', '0% -100%', 
        '-100% -100%', '-200% -100%', '0% -200%', '-100% -200%', '-200% -200%']
        const currentPositions = Array.from(pieces).map(piece => piece.style.backgroundPosition);
        const win = JSON.stringify(currentPositions) === JSON.stringify(correctPositions);
        if (win) {
            const messageContainer = document.getElementById('message-container');
            messageContainer.textContent = '¡Felicidades!  Eres asombroso';
            gameWon = true; // Marcar el juego como ganado
            startButton.style.display= 'none'
                   // Desactiva el selector de dificultad
        const difficultySelect = document.getElementById('difficulty');
        difficultySelect.disabled = true;
        
        }
        return win;
    }

    // Asignar el manejador de eventos de clic a las piezas solo después de que se haya presionado el botón "Comenzar"
    function enablePieceClicks() {
        pieces.forEach(piece => {
            piece.addEventListener('click', selectPiece);
        });
    }

    // Asignar el manejador de eventos de clic al botón "Comenzar"
    const startButton = document.getElementById('start-button');
    startButton.addEventListener('click', () => {
        if (!gameStarted) { // Permitir mezclar solo si el juego aún no ha comenzado
            gameStarted = true; // Marcar el juego como comenzado
            startButton.disabled = true; // Deshabilitar el botón después de hacer clic en él
            startButton.style.display= 'none'
            enablePieceClicks(); // Habilitar los clics en las piezas
            const positions = [
                '0% 0%', '-100% 0%', '-200% 0%', 
                '0% -100%', '-100% -100%', '-200% -100%', 
                '0% -200%', '-100% -200%', '-200% -200%'
            ];

            // Función para mezclar un array de manera aleatoria
            function shuffleArray(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]]; // Intercambio de elementos
                }
            }

            shuffleArray(positions); // Mezclar el orden de las posiciones de manera aleatoria

            // Asignar posiciones mezcladas a las piezas del rompecabezas
            pieces.forEach((piece, index) => {
                piece.style.backgroundPosition = positions[index];
                piece.style.backgroundSize = '300% 300%'; // Ajustar el tamaño para mostrar solo una parte de la imagen
            });
        }
    });

    
    // Evento al hacer clic en el botón "Volver a Jugar"
const restartButton = document.getElementById('volver-jugar');
restartButton.addEventListener('click', restartGame);

// Función para reiniciar el juego
// Función para reiniciar el juego
function restartGame() {
    // Reinicia las variables de estado del juego
    gameStarted = false;
    gameWon = false;
    selectedPiece = null;

    // Restaura el mensaje del contenedor
    const messageContainer = document.getElementById('message-container');
    messageContainer.textContent = '';

    // Restaura el botón de inicio
    startButton.disabled = false;
    startButton.style.display = 'block';
           // Desactiva el selector de dificultad
           const difficultySelect = document.getElementById('difficulty');
           difficultySelect.disabled = false;
           

    // Oculta el botón de siguiente
    nextButton.style.display = 'none';

    // Habilita los clics en las piezas del rompecabezas
    enablePieceClicks();

    // Reinicia las posiciones de las piezas del rompecabezas
    pieces.forEach((piece, index) => {
        piece.style.backgroundPosition = `-${index % 3 * 100}% -${Math.floor(index / 3) * 100}%`;

        piece.classList.remove('selected'); // Elimina cualquier selección anterior
    });
}

    
});



// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Selecciona todas las piezas del rompecabezas y el botón de siguiente
    const pieces = document.querySelectorAll('.puzzle-pieceF, .puzzle-piece1, .puzzle-piece2, .puzzle-piece3, .puzzle-piece4, .puzzle-piece5, .puzzle-piece6');
    const nextButton = document.getElementById('next-button');
    
    // Variables de estado del juego
    let selectedPieceF = null;
    let gameStartedF = false;
    let gameWonF = false;
    
    // Función para verificar si el rompecabezas está desordenado
    function estaDesordenado() {
        const posicionesOriginales = ['0% 0%', '-100% 0%', '0% -100%', '-100% -100%'];


        const posicionesActuales = Array.from(pieces).map(piece => piece.style.backgroundPosition);

        return !posicionesActuales.every((posicion, index) => posicion === posicionesOriginales[index]);
    }
// Función para ordenar las piezas del rompecabezas
function ordenarPiezas() {
    const posicionesOriginales = ['0% 0%', '-100% 0%', '0% -100%', '-100% -100%'];


    pieces.forEach((piece, index) => {
        piece.style.backgroundPosition = posicionesOriginales[index];
        startButtonF.style.display= 'none'
    });
}

// Evento de clic en el botón de ordenar
const botonOrdenar = document.getElementById('boton-ordenar');
botonOrdenar.addEventListener('click', () => {
    ordenarSiDesordenado();
    // Deshabilitar la capacidad de seleccionar piezas después de ordenar
    pieces.forEach(piece => {
        console.log("Intentando deshabilitar clics...");
        piece.removeEventListener('click', selectPieceF);
        console.log("Clics deshabilitados para esta pieza.");
        const messageContainer = document.getElementById('message-container');
        messageContainer.textContent = '¡CLIC EN VOLVER A COMENZAR!';
    });
});

// Función para ordenar las piezas del rompecabezas si está desordenado
function ordenarSiDesordenado() {
    console.log("Intentando ordenar...");
    if (estaDesordenado()) {
        console.log("Rompecabezas desordenado. Ordenando...");
        ordenarPiezas();
        console.log("Rompecabezas ordenado.");
    } else {
        console.log("El rompecabezas ya está ordenado.");
    }
}


    

    // Establece los estilos de fondo para cada pieza
    pieces.forEach((piece, index) => {
        piece.style.backgroundPosition = `-${index % 2 * 100}% -${Math.floor(index / 2) * 100}%`;
        piece.style.backgroundSize = '200% 200%';
    });

    // Maneja la selección de una pieza del rompecabezas
    function selectPieceF(event) {
        if (gameStartedF && !gameWonF) {
            if (!selectedPieceF) {
                selectedPieceF = this;
                this.classList.add('selected');
            } else {
                swapPiecesF(selectedPieceF, this);
                selectedPieceF.classList.remove('selected');
                selectedPieceF = null;
                checkWinF();
            }
        }
    }

    // Intercambia las posiciones de dos piezas del rompecabezas
    function swapPiecesF(piece1, piece2) {
        if (!gameWonF) {
            const tempBackgroundPosition = piece1.style.backgroundPosition;
            piece1.style.backgroundPosition = piece2.style.backgroundPosition;
            piece2.style.backgroundPosition = tempBackgroundPosition;
        }
    }

    // Comprueba si se ha ganado el juego
    function checkWinF() {
        const correctPositionsFacil = ['0% 0%', '-100% 0%', '0% -100%', '-100% -100%'];
        const currentPositions = Array.from(pieces).map(piece => piece.style.backgroundPosition);
        const win = JSON.stringify(currentPositions) === JSON.stringify(correctPositionsFacil);
        if (win) {
            const messageContainer = document.getElementById('message-container');
            messageContainer.textContent = '¡Felicidades! Eres asombroso';
            gameWonF = true;
            startButtonF.style.display = 'none';
               // Desactiva el selector de dificultad
        const difficultySelect = document.getElementById('difficulty');
        difficultySelect.disabled = true;
        
        }
        return win;
    }

    // Habilita los clics en las piezas del rompecabezas
    function enablePieceClicksF() {
        pieces.forEach(piece => {
            piece.addEventListener('click', selectPieceF);
        });
    }

    // Evento al hacer clic en el botón de inicio
    const startButtonF = document.getElementById('start-buttonF');
    startButtonF.addEventListener('click', () => {
        if (!gameStartedF) {
            gameStartedF = true;
            startButtonF.disabled = true;
            startButtonF.style.display= 'none'
            enablePieceClicksF();
            const positions = ['0% 0%', '-100% 0%', '0% -100%', '-100% -100%'];
            
            // Baraja aleatoriamente las posiciones de las piezas
            function shuffleArray(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
            }
            shuffleArray(positions);
            pieces.forEach((piece, index) => {
                piece.style.backgroundPosition = positions[index];
                piece.style.backgroundSize = '200% 200%';
            });
        }
    });
    // Evento al hacer clic en el botón "Volver a Jugar"
const restartButton = document.getElementById('volver-jugar');
restartButton.addEventListener('click', restartGame);

// Función para reiniciar el juego
// Función para reiniciar el juego
function restartGame() {
    // Reinicia las variables de estado del juego
    gameStartedF = false;
    gameWonF = false;
    selectedPieceF = null;

    // Restaura el mensaje del contenedor
    const messageContainer = document.getElementById('message-container');
    messageContainer.textContent = '';

    // Restaura el botón de inicio
    startButtonF.disabled = false;
    startButtonF.style.display = 'block';
    const difficultySelect = document.getElementById('difficulty');
    difficultySelect.disabled = false;

    // Oculta el botón de siguiente
    nextButton.style.display = 'none';

    // Habilita los clics en las piezas del rompecabezas
    enablePieceClicksF();

    // Reinicia las posiciones de las piezas del rompecabezas
    pieces.forEach((piece, index) => {
        piece.style.backgroundPosition = `-${index % 2 * 100}% -${Math.floor(index / 2) * 100}%`;
        piece.classList.remove('selected'); // Elimina cualquier selección anterior
    });
}


});


document.addEventListener('DOMContentLoaded', () => {
    const pieces = document.querySelectorAll('.puzzle-pieceD , .puzzle-piece1 , .puzzle-piece2 , .puzzle-piece3, .puzzle-piece4, .puzzle-piece5, .puzzle-piece6, .puzzle-piece7, .puzzle-piece8, .puzzle-piece9, .puzzle-piece10, .puzzle-piece11, .puzzle-piece12, .puzzle-piece13, .puzzle-piece14, .puzzle-piece15, .puzzle-piece16, .puzzle-piece17, .puzzle-piece18, .puzzle-piece19, .puzzle-piece20, .puzzle-piece21, .puzzle-piece22, .puzzle-piece23, .puzzle-piece24, .puzzle-piece25');

    const nextButton = document.getElementById('next-button');
    let selectedPieceD = null; // Cambio de variable
    let gameStartedD = false; // Cambio de variable
    let gameWonD = false; // Cambio de variable
     
    // Función para verificar si el rompecabezas está desordenado
    function estaDesordenado() {
        const posicionesOriginales = [ // Cambio de nombre de variable
        '0% 0%', '-100% 0%', '-200% 0%', '-300% 0%', '-400% 0%',
        '0% -100%', '-100% -100%', '-200% -100%', '-300% -100%', '-400% -100%',
        '0% -200%', '-100% -200%', '-200% -200%', '-300% -200%', '-400% -200%',
        '0% -300%', '-100% -300%', '-200% -300%', '-300% -300%', '-400% -300%',
        '0% -400%', '-100% -400%', '-200% -400%', '-300% -400%', '-400% -400%'
    ];


        const posicionesActuales = Array.from(pieces).map(piece => piece.style.backgroundPosition);

        return !posicionesActuales.every((posicion, index) => posicion === posicionesOriginales[index]);
    }
// Función para ordenar las piezas del rompecabezas
function ordenarPiezas() {
    const posicionesOriginales = [ // Cambio de nombre de variable
    '0% 0%', '-100% 0%', '-200% 0%', '-300% 0%', '-400% 0%',
    '0% -100%', '-100% -100%', '-200% -100%', '-300% -100%', '-400% -100%',
    '0% -200%', '-100% -200%', '-200% -200%', '-300% -200%', '-400% -200%',
    '0% -300%', '-100% -300%', '-200% -300%', '-300% -300%', '-400% -300%',
    '0% -400%', '-100% -400%', '-200% -400%', '-300% -400%', '-400% -400%'
];


    pieces.forEach((piece, index) => {
        piece.style.backgroundPosition = posicionesOriginales[index];
        startButtonD.style.display= 'none'
    });
}

// Evento de clic en el botón de ordenar
const botonOrdenar = document.getElementById('boton-ordenar');
botonOrdenar.addEventListener('click', () => {
    ordenarSiDesordenado();
    // Deshabilitar la capacidad de seleccionar piezas después de ordenar
    pieces.forEach(piece => {
        console.log("Intentando deshabilitar clics...");
        piece.removeEventListener('click', selectPieceD);
        console.log("Clics deshabilitados para esta pieza.");
        const messageContainer = document.getElementById('message-container');
        messageContainer.textContent = '¡CLIC EN VOLVER A COMENZAR!';

    });
});

// Función para ordenar las piezas del rompecabezas si está desordenado
function ordenarSiDesordenado() {
    console.log("Intentando ordenar...");
    if (estaDesordenado()) {
        console.log("Rompecabezas desordenado. Ordenando...");
        ordenarPiezas();
        console.log("Rompecabezas ordenado.");
    } else {
        console.log("El rompecabezas ya está ordenado.");
    }
}


    pieces.forEach((piece, index) => {
        piece.style.backgroundPosition = `-${index % 5 * 100}% -${Math.floor(index / 5) * 100}%`;
        piece.style.backgroundSize = '500% 500%';
    });

    function selectPieceD(event) {
        if (gameStartedD && !gameWonD) {
            if (!selectedPieceD) {
                selectedPieceD = this;
                this.classList.add('selected');
            } else {
                swapPiecesD(selectedPieceD, this);
                selectedPieceD.classList.remove('selected');
                selectedPieceD = null;
                checkWinD();
            }
        }
    }

    function swapPiecesD(piece1, piece2) {
        if (!gameWonD) {
            const tempBackgroundPosition = piece1.style.backgroundPosition;
            piece1.style.backgroundPosition = piece2.style.backgroundPosition;
            piece2.style.backgroundPosition = tempBackgroundPosition;
        }
    }

    function checkWinD() {
        const correctPositionsDificil = [ // Cambio de nombre de variable
            '0% 0%', '-100% 0%', '-200% 0%', '-300% 0%', '-400% 0%',
            '0% -100%', '-100% -100%', '-200% -100%', '-300% -100%', '-400% -100%',
            '0% -200%', '-100% -200%', '-200% -200%', '-300% -200%', '-400% -200%',
            '0% -300%', '-100% -300%', '-200% -300%', '-300% -300%', '-400% -300%',
            '0% -400%', '-100% -400%', '-200% -400%', '-300% -400%', '-400% -400%'
        ];
        const currentPositions = Array.from(pieces).map(piece => piece.style.backgroundPosition);
        const win = JSON.stringify(currentPositions) === JSON.stringify(correctPositionsDificil);
        if (win) {
            const messageContainer = document.getElementById('message-container');
            messageContainer.textContent = '¡Felicidades! Eres asombroso';
            gameWonD = true;
            startButtonD.style.display = 'none';
                   // Desactiva el selector de dificultad
        const difficultySelect = document.getElementById('difficulty');
        difficultySelect.disabled = true;
        
        }
        return win;
    }

    function enablePieceClicksD() {
        pieces.forEach(piece => {
            piece.addEventListener('click', selectPieceD);
        });
    }

    const startButtonD = document.getElementById('start-buttonD'); // Cambio de variable
    startButtonD.addEventListener('click', () => { // Cambio de variable
        if (!gameStartedD) { // Cambio de variable
            gameStartedD = true; // Cambio de variable
            startButtonD.disabled = true; // Cambio de variable
                    startButtonD.style.display= 'none'
            
            enablePieceClicksD(); // Cambio de función
            const positions = [
                '0% 0%', '-100% 0%', '-200% 0%', '-300% 0%', '-400% 0%',
                '0% -100%', '-100% -100%', '-200% -100%', '-300% -100%', '-400% -100%',
                '0% -200%', '-100% -200%', '-200% -200%', '-300% -200%', '-400% -200%',
                '0% -300%', '-100% -300%', '-200% -300%', '-300% -300%', '-400% -300%',
                '0% -400%', '-100% -400%', '-200% -400%', '-300% -400%', '-400% -400%'
            ];
            function shuffleArray(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
            }
            shuffleArray(positions);
            pieces.forEach((piece, index) => {
                piece.style.backgroundPosition = positions[index];
                piece.style.backgroundSize = '500% 500%';
            });
        }
    });


    

    // Evento al hacer clic en el botón "Volver a Jugar"
const restartButton = document.getElementById('volver-jugar');
restartButton.addEventListener('click', restartGame);

// Función para reiniciar el juego
function restartGame() {
    // Reinicia las variables de estado del juego
    gameStartedD = false;
    gameWonD = false;
    selectedPieceD = null;

    // Restaura el mensaje del contenedor
    const messageContainer = document.getElementById('message-container');
    messageContainer.textContent = '';

    // Restaura el botón de inicio
    startButtonD.disabled = false;
    startButtonD.style.display = 'block';
    const difficultySelect = document.getElementById('difficulty');
    difficultySelect.disabled = false;
    
    // Oculta el botón de siguiente
    nextButton.style.display = 'none';

    // Habilita los clics en las piezas del rompecabezas
    enablePieceClicksD();

    // Reinicia las posiciones de las piezas del rompecabezas
pieces.forEach((piece, index) => {
    piece.style.backgroundPosition = `-${index % 5 * 100}% -${Math.floor(index / 5) * 100}%`;
    piece.classList.remove('selected'); // Elimina cualquier selección anterior
});

}

});























document.addEventListener('DOMContentLoaded', () => {
    const selectDifficulty = document.getElementById('difficulty');
    const pageContainer = document.getElementById('page-container');
    const pageContainerf = document.getElementById('page-containerf');
    const pageContainerD = document.getElementById('page-containerD'); // Agregamos el contenedor para el nivel Difícil
    
    selectDifficulty.addEventListener('change', () => {
        const selectedDifficulty = selectDifficulty.value;
        if (selectedDifficulty === 'medio') {
            pageContainerf.style.display = 'none';
            pageContainerD.style.display = 'none'; // Ocultamos el contenedor para el nivel Difícil
            pageContainer.style.display = 'block';
        } else if (selectedDifficulty === 'facil') {
            pageContainer.style.display = 'none';
            pageContainerD.style.display = 'none'; // Ocultamos el contenedor para el nivel Difícil
            pageContainerf.style.display = 'block';
        } else if (selectedDifficulty === 'dificil') { // Agregamos la condición para el nivel Difícil
            pageContainer.style.display = 'none';
            pageContainerf.style.display = 'none';
            pageContainerD.style.display = 'block'; // Mostramos el contenedor para el nivel Difícil
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const selectDifficulty = document.getElementById('difficulty');
    const cambiarBtn = document.getElementById('cambiar');
    
    selectDifficulty.addEventListener('change', () => {
        const selectedDifficulty = selectDifficulty.value;
        if (selectedDifficulty === 'facil') {
            const pieces = document.querySelectorAll('.puzzle-pieceF');
            const classes = ['puzzle-piece1', 'puzzle-piece2', 'puzzle-piece3', 'puzzle-piece4', 'puzzle-piece5', 'puzzle-piece6','puzzle-piece7', 'puzzle-piece8', 'puzzle-piece'];
            let currentIndex = 0;
            
            cambiarBtn.addEventListener('click', () => {
                pieces.forEach(piece => {
                    // Eliminar todas las clases actuales de la pieza
                    piece.classList.remove(...classes);
                    // Agregar la siguiente clase en el array circularmente
                    piece.classList.add(classes[currentIndex]);
                });
                // Incrementar el índice circularmente
                currentIndex = (currentIndex + 1) % classes.length;
            });
        } else if (selectedDifficulty === 'medio') {
            const pieces = document.querySelectorAll('.puzzle-piece');
            const classes = ['puzzle-piece1', 'puzzle-piece2', 'puzzle-piece3', 'puzzle-piece4', 'puzzle-piece5', 'puzzle-piece6', 'puzzle-piece7','puzzle-piece8', 'puzzle-piece'];
            let currentIndex = 0;
            
            cambiarBtn.addEventListener('click', () => {
                pieces.forEach(piece => {
                    // Eliminar todas las clases actuales de la pieza
                    piece.classList.remove(...classes);
                    // Agregar la siguiente clase en el array circularmente
                    piece.classList.add(classes[currentIndex]);
                });
                // Incrementar el índice circularmente
                currentIndex = (currentIndex + 1) % classes.length;
            });
        } else if (selectedDifficulty === 'dificil') { // Agregamos el bloque para el nivel Difícil
            const pieces = document.querySelectorAll('.puzzle-pieceD'); // Seleccionamos las piezas del nivel Difícil
            const classes = ['puzzle-piece1', 'puzzle-piece2', 'puzzle-piece3', 'puzzle-piece4', 'puzzle-piece5', 'puzzle-piece6', 'puzzle-piece7','puzzle-piece8','puzzle-piece']; // Clases para el nivel Difícil
            let currentIndex = 0;
            
            cambiarBtn.addEventListener('click', () => {
                pieces.forEach(piece => {
                    // Eliminar todas las clases actuales de la pieza
                    piece.classList.remove(...classes);
                    // Agregar la siguiente clase en el array circularmente
                    piece.classList.add(classes[currentIndex]);
                });
                // Incrementar el índice circularmente
                currentIndex = (currentIndex + 1) % classes.length;
            });
        }
    });
});

