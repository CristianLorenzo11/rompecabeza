document.addEventListener('DOMContentLoaded', () => {
    const pieces = document.querySelectorAll('.puzzle-piece, .puzzle-piece1 , .puzzle-piece2 , .puzzle-piece3');

    const nextButton = document.getElementById('next-button'); // Aquí defines el botón "Ir al siguiente rompecabezas"
    let selectedPiece = null;
    let gameStarted = false; // Variable para indicar si el juego ha comenzado
    let gameWon = false; // Variable para indicar si el juego ha sido ganado

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
            messageContainer.textContent = '¡Felicidades! Ganaste el juego.';
            gameWon = true; // Marcar el juego como ganado
            startButton.style.display= 'none'
            nextButton.style.display = 'block'; // Mostrar el botón "Ir al siguiente rompecabezas"
        }
        return win;
    }

    // Asignar el manejador de eventos de clic a las piezas solo después de que se haya presionado el botón "Comenzar"
    function enablePieceClicks() {
        pieces.forEach(piece => {
            piece.addEventListener('click', selectPiece);
        });
    }

    // Deshabilitar el manejador de eventos de clic en las piezas
    function disablePieceClicks() {
        pieces.forEach(piece => {
            piece.removeEventListener('click', selectPiece);
        });
    }

    // Asignar el manejador de eventos de clic al botón "Comenzar"
    const startButton = document.getElementById('start-button');
    startButton.addEventListener('click', () => {
        if (!gameStarted) { // Permitir mezclar solo si el juego aún no ha comenzado
            gameStarted = true; // Marcar el juego como comenzado
            startButton.disabled = true; // Deshabilitar el botón después de hacer clic en él
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
});







