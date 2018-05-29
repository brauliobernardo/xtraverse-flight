/**
 * The maximum amount (in seconds) before
 * reloading the game
 *
 * @type {int}
 */
let counter = 3;

vehicle.addEventListener('collide', () => {
	saveScore();
	endGame();
});

function saveScore() {
	scoreText.pause();
	let currentScore = parseInt(scoreText.components.score.getScore());
    if (currentScore > highScore) localStorage.setItem('xtraverseFlightScore', currentScore);
}

function endGame() {
	showStatusBar("Oops! Let's try again");
	vehicle.removeAttribute('forward');
	setInterval(showReloadCounter, 1000);
	setTimeout(reloadGame, 4500);
}

function showReloadCounter() {
	if (counter === 0) return;
	showStatusBar('Retrying in ' + counter);
	counter--;
}

function reloadGame() {
	location.reload();
}