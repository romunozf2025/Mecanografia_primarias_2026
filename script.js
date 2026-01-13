// script.js - Lógica para la aplicación de mecanografía

// Datos de palabras por nivel
const wordLevels = {
    1: ["casa", "mesa", "silla", "perro", "gato", "flor", "sol", "luz", "pan", "agua"],
    2: ["árbol", "puerta", "ventana", "libro", "pluma", "lapiz", "hoja", "nube", "cielo", "campo"],
    3: ["escuela", "maestro", "alumno", "amigo", "familia", "jardín", "animal", "caballo", "pájaro", "mariposa"],
    4: ["computadora", "teclado", "monitor", "programa", "internet", "juego", "música", "película", "teléfono", "televisor"],
    5: ["matemáticas", "geografía", "historia", "ciencia", "educación", "ejercicio", "importante", "interesante", "diferente", "próximo"],
    6: ["árbol", "fácil", "médico", "lápiz", "azúcar", "canción", "jardín", "teléfono", "difícil", "rápido"]
};

// Variables del juego
let currentLevel = 1;
let currentWordIndex = 0;
let score = 0;
let errors = 0;
let maxErrors = 4;
let wordsPerLevel = 10;
let gameActive = true;
let wordCompleted = false;

// Elementos DOM
const currentWordElement = document.getElementById('current-word');
const wordHintElement = document.getElementById('word-hint');
const wordInputElement = document.getElementById('word-input');
const feedbackElement = document.getElementById('feedback');
const levelDisplayElement = document.getElementById('level-display');
const wordCountElement = document.getElementById('word-count');
const scoreDisplayElement = document.getElementById('score-display');
const errorsDisplayElement = document.getElementById('errors-display');
const errorDisplayElement = document.getElementById('error-display');
const progressBarElement = document.getElementById('progress-bar');
const levelButtonsElement = document.getElementById('level-buttons');
const restartButton = document.getElementById('restart-btn');
const nextButton = document.getElementById('next-btn');
const gameOverElement = document.getElementById('game-over');
const gameOverMessageElement = document.getElementById('game-over-message');
const restartGameButton = document.getElementById('restart-game-btn');

// Inicializar botones de nivel
function initializeLevelButtons() {
    for (let i = 1; i <= 6; i++) {
        const button = document.createElement('button');
        button.className = `level-btn ${i === 1 ? 'active' : ''}`;
        button.textContent = i;
        button.dataset.level = i;
        button.addEventListener('click', () => changeLevel(i));
        levelButtonsElement.appendChild(button);
    }
}

// Cambiar de nivel
function changeLevel(level) {
    if (level < 1 || level > 6) return;
    
    currentLevel = level;
    currentWordIndex = 0;
    errors = 0;
    gameActive = true;
    wordCompleted = false;
    gameOverElement.style.display = 'none';
    
    // Actualizar botones activos
    document.querySelectorAll('.level-btn').forEach(btn => {
        btn.classList.remove('active');
        if (parseInt(btn.dataset.level) === level) {
            btn.classList.add('active');
        }
    });
    
    // Actualizar interfaz
    updateDisplay();
    loadCurrentWord();
    
    // Reiniciar entrada
    wordInputElement.value = '';
    wordInputElement.disabled = false;
    wordInputElement.focus();
    feedbackElement.textContent = `Nivel ${level}: Escribe la palabra que ves arriba`;
    feedbackElement.className = 'feedback hint';
    
    // Deshabilitar botón siguiente
    nextButton.disabled = true;
}

// Cargar palabra actual
function loadCurrentWord() {
    const words = wordLevels[currentLevel];
    currentWordElement.textContent = words[currentWordIndex];
    
    // Actualizar pista según nivel
    let hint = "";
    if (currentLevel <= 2) {
        hint = "Palabra simple - sin acentos";
    } else if (currentLevel <= 4) {
        hint = "Palabras más largas - presta atención";
    } else {
        hint = "Palabras con acentos - ¡cuidado con las tildes!";
    }
    
    wordHintElement.textContent = hint;
    
    // Actualizar contador de palabras
    wordCountElement.textContent = `${currentWordIndex + 1}/${wordsPerLevel}`;
    
    // Actualizar barra de progreso
    const progress = ((currentWordIndex + 1) / wordsPerLevel) * 100;
    progressBarElement.style.width = `${progress}%`;
}

// Actualizar la pantalla
function updateDisplay() {
    levelDisplayElement.textContent = currentLevel;
    wordCountElement.textContent = `${currentWordIndex + 1}/${wordsPerLevel}`;
    scoreDisplayElement.textContent = score;
    errorsDisplayElement.textContent = `${errors}/${maxErrors}`;
    
    // Actualizar puntos de error
    const errorDots = errorDisplayElement.querySelectorAll('.error-dot');
    errorDots.forEach((dot, index) => {
        if (index < errors) {
            dot.classList.add('error');
        } else {
            dot.classList.remove('error');
        }
    });
}

// Verificar la palabra ingresada
function checkWord() {
    if (!gameActive || wordCompleted) return;
    
    const userInput = wordInputElement.value.trim().toLowerCase();
    const correctWord = currentWordElement.textContent.toLowerCase();
    
    // Si el usuario no ha escrito nada
    if (userInput === '') {
        feedbackElement.textContent = '¡Escribe algo!';
        feedbackElement.className = 'feedback hint';
        return;
    }
    
    // Si es correcto
    if (userInput === correctWord) {
        wordCompleted = true;
        feedbackElement.textContent = '¡Correcto! ¡Muy bien!';
        feedbackElement.className = 'feedback correct';
        score += 10;
        
        // Habilitar botón siguiente
        nextButton.disabled = false;
        wordInputElement.disabled = true;
        
        // Si completó todas las palabras del nivel
        if (currentWordIndex === wordsPerLevel - 1) {
            feedbackElement.textContent = `¡Felicidades! Completaste el nivel ${currentLevel}`;
            if (currentLevel < 6) {
                feedbackElement.textContent += `. Puedes pasar al nivel ${currentLevel + 1}`;
            } else {
                feedbackElement.textContent += `. ¡Has completado todos los niveles!`;
            }
        }
    } 
    // Si hay error
    else {
        errors++;
        feedbackElement.textContent = 'Incorrecto. Intenta de nuevo.';
        feedbackElement.className = 'feedback incorrect';
        
        // Dar pista sobre el error
        if (userInput.length < correctWord.length) {
            feedbackElement.textContent += ' La palabra es más larga.';
        } else if (userInput.length > correctWord.length) {
            feedbackElement.textContent += ' La palabra es más corta.';
        } else if (hasAccentError(userInput, correctWord)) {
            feedbackElement.textContent += ' Revisa los acentos.';
        }
        
        // Limpiar entrada para nuevo intento
        wordInputElement.value = '';
        wordInputElement.focus();
        
        // Si alcanza el máximo de errores
        if (errors >= maxErrors) {
            gameOver();
        }
    }
    
    updateDisplay();
}

// Detectar errores de acentuación
function hasAccentError(userInput, correctWord) {
    // Lista de vocales con y sin acento
    const accentedVowels = {
        'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
        'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U'
    };
    
    // Si las longitudes son diferentes, no es error de acento
    if (userInput.length !== correctWord.length) return false;
    
    // Comparar caracter por caracter
    for (let i = 0; i < correctWord.length; i++) {
        const correctChar = correctWord[i];
        const userChar = userInput[i];
        
        // Si el caracter correcto tiene acento
        if (accentedVowels[correctChar]) {
            // Comprobar si el usuario puso la vocal sin acento
            if (accentedVowels[correctChar] === userChar) {
                return true;
            }
        }
    }
    
    return false;
}

// Ir a la siguiente palabra
function nextWord() {
    if (!gameActive) return;
    
    wordCompleted = false;
    currentWordIndex++;
    
    // Si terminó el nivel
    if (currentWordIndex >= wordsPerLevel) {
        if (currentLevel < 6) {
            // Pasar al siguiente nivel
            currentLevel++;
            currentWordIndex = 0;
            changeLevel(currentLevel);
        } else {
            // Completó todos los niveles
            feedbackElement.textContent = '¡Felicidades! Has completado todos los niveles.';
            feedbackElement.className = 'feedback correct';
            gameActive = false;
            wordInputElement.disabled = true;
            nextButton.disabled = true;
        }
        return;
    }
    
    // Cargar nueva palabra
    loadCurrentWord();
    
    // Reiniciar entrada
    wordInputElement.value = '';
    wordInputElement.disabled = false;
    wordInputElement.focus();
    
    // Deshabilitar botón siguiente
    nextButton.disabled = true;
    
    // Actualizar feedback
    feedbackElement.textContent = `Escribe la palabra: ${currentWordElement.textContent}`;
    feedbackElement.className = 'feedback hint';
    
    updateDisplay();
}

// Juego terminado
function gameOver() {
    gameActive = false;
    wordCompleted = true;
    wordInputElement.disabled = true;
    nextButton.disabled = true;
    
    gameOverMessageElement.textContent = `Has cometido ${errors} errores en el nivel ${currentLevel}. ¡Inténtalo de nuevo!`;
    gameOverElement.style.display = 'block';
}

// Reiniciar juego
function restartGame() {
    currentWordIndex = 0;
    errors = 0;
    score = 0;
    gameActive = true;
    wordCompleted = false;
    gameOverElement.style.display = 'none';
    
    wordInputElement.disabled = false;
    wordInputElement.value = '';
    wordInputElement.focus();
    
    nextButton.disabled = true;
    
    loadCurrentWord();
    updateDisplay();
    
    feedbackElement.textContent = `Nivel ${currentLevel}: Escribe la palabra que ves arriba`;
    feedbackElement.className = 'feedback hint';
}

// Event Listeners
wordInputElement.addEventListener('input', function() {
    // Si el juego no está activo o ya completó la palabra, no hacer nada
    if (!gameActive || wordCompleted) return;
    
    // Convertir a minúsculas automáticamente
    this.value = this.value.toLowerCase();
    
    // Si presiona Enter
    if (this.value.includes('\n')) {
        this.value = this.value.replace('\n', '');
        checkWord();
        return;
    }
    
    // Verificar si coincide con la palabra actual
    const currentWord = currentWordElement.textContent.toLowerCase();
    const userInput = this.value.trim();
    
    // Dar feedback mientras escribe
    if (userInput.length > 0) {
        if (userInput === currentWord.substring(0, userInput.length)) {
            // Está en el camino correcto
            feedbackElement.textContent = '¡Vas bien! Continúa...';
            feedbackElement.className = 'feedback hint';
            
            // Si completó la palabra automáticamente
            if (userInput === currentWord) {
                setTimeout(() => checkWord(), 100);
            }
        } else {
            // Hay un error
            feedbackElement.textContent = 'Revisa lo que escribiste';
            feedbackElement.className = 'feedback incorrect';
        }
    } else {
        feedbackElement.textContent = `Escribe la palabra: ${currentWordElement.textContent}`;
        feedbackElement.className = 'feedback hint';
    }
});

wordInputElement.addEventListener('keyup', function(event) {
    if (event.key === 'Enter' && !wordCompleted) {
        checkWord();
    }
});

nextButton.addEventListener('click', nextWord);
restartButton.addEventListener('click', restartGame);
restartGameButton.addEventListener('click', restartGame);

// Inicializar el juego
function initGame() {
    initializeLevelButtons();
    changeLevel(1);
}

// Iniciar el juego cuando se carga la página
document.addEventListener('DOMContentLoaded', initGame);

// También enfocar el input cuando se hace clic en cualquier parte
document.addEventListener('click', function() {
    if (gameActive && !wordInputElement.disabled) {
        wordInputElement.focus();
    }
});