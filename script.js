const gameArea = document.getElementById('game-area');
const card = document.getElementById('card');
const gameContainer = document.getElementById('game-container');
const progressBar = document.getElementById('progress');
const scoreElement = document.getElementById('score');
const backgroundMusic = document.getElementById('background-music');

let score = 0;
let gameActive = true;

// Manejo de música
function playMusic() {
    backgroundMusic.play().catch(() => {
        document.addEventListener('click', () => {
            backgroundMusic.play();
        }, { once: true });
    });
}

function createDuck() {
    if (!gameActive || score >= 10) return;
    
    const duck = document.createElement('div');
    duck.classList.add('duck');
    duck.textContent = '🦆';
    
    const maxX = window.innerWidth - 80;
    duck.style.left = Math.random() * maxX + 'px';
    
    duck.addEventListener('click', catchDuck);
    gameContainer.appendChild(duck);
    
    // Si el pato llega al final sin ser clickeado, se elimina y sale otro
    duck.addEventListener('animationend', () => {
        duck.remove();
        if (gameActive && score < 10) {
            setTimeout(createDuck, 500);
        }
    });
}

function catchDuck(event) {
    if (!gameActive) return;
    
    const duck = event.target;
    duck.style.pointerEvents = 'none';
    
    // Incrementar puntaje
    score++;
    scoreElement.textContent = score;
    progressBar.style.width = (score / 10) * 100 + '%';
    
    // Efecto visual al atrapar
    duck.style.transition = 'all 0.3s ease';
    duck.style.transform = 'scale(0) rotate(180deg)';
    
    setTimeout(() => {
        duck.remove();
        if (score >= 10) {
            endGame();
        } else {
            createDuck();
        }
    }, 300);
}

function endGame() {
    gameActive = false;
    // Pequeña pausa para que el usuario vea la barra llena
    setTimeout(() => {
        alert('¡Lo has conseguido! Aquí hay algo especial para ti 💛');
        showCard();
    }, 500);
}

function showCard() {
    gameArea.classList.add('hidden'); // Ocultamos el área de juego
    card.classList.remove('hidden');  // Quitamos la clase que lo oculta
    card.style.display = 'flex';      // Forzamos el flex para centrar contenido
}

// Iniciar
window.addEventListener('load', () => {
    playMusic();
    createDuck();
});