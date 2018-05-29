var inVRMode = false;

let playOrPause = () => {
    isPaused = !isPaused;
    if (isPaused) play();
    else pause();
};

let enterOrExitVR = () => {
    if (inVRMode) scene.enterVR();
    else scene.exitVR();
    inVRMode = !inVRMode;
};

let play = () => {
    hideStatusBar();
    wipeStatusBarText();
    if (!scoreText.hasAttribute('score')) scoreText.setAttribute('score', '');
    if (!container.hasAttribute('zones')) container.setAttribute('zones', '');
    container.play();
};

let pause = () => {
    showStatusBar('PAUSED');
    container.pause();
};

let goLeft = () => {
    let pos = vehicle.getAttribute('position');
    pos.x = (pos.x === 2) ? 0 : -2;
    vehicle.setAttribute('position', pos);
};

let goUp = () => {
    let pos = vehicle.getAttribute('position');
    if (pos.y === 3) return;
    pos.y = 3;
    vehicle.setAttribute('position', pos);
};

let goDown = () => {
    let pos = vehicle.getAttribute('position');
    if (pos.y === 1) return;
    pos.y = 1;
    vehicle.setAttribute('position', pos);
};

let goRight = () => {
    let pos = vehicle.getAttribute('position');
    pos.x = (pos.x === -2) ? 0 : 2;
    vehicle.setAttribute('position', pos);
};

/**
 * Listens for events from keyboard keys
 */
document.addEventListener('keydown', e => {
    if (e.which === 32) { /* space */
        playOrPause();
    }

    if (e.which === 37) { /* left */
        if (isPaused === false) return;
        goLeft();
    }

    if (e.which === 38) { /* up */
        if (isPaused === false) return;
        goUp();
    }

    if (e.which === 39) { /* right */
        if (isPaused === false) return;
        goRight();
    }

    if (e.which === 40) { /* down */
        if (isPaused === false) return;
        goDown();
    }
});

/**
 * Listens for events from directional gamepad buttons
 */
container.addEventListener('gamepadbuttondown', e => {
    if (e.detail.index === 14) goLeft();
    else if (e.detail.index === 15) goRight();
    else if (e.detail.index === 12) goUp();
    else if (e.detail.index === 13) goDown();
});

/**
 * Listens for events from specific gamepad buttons
 */
emptyContainer.addEventListener('gamepadbuttondown', e => {
    if (e.detail.index === 9) playOrPause();
    else if (e.detail.index === 7) enterOrExitVR();
});

function activateVehicle() {
    vehicle.setAttribute('forward', '');
    if (isPaused === true) {
        scoreText.setAttribute('score', '');
        container.setAttribute('zones', '');
    }
}

/**
 * 7 seconds before the vehicle
 * starts moving
 */
setTimeout(activateVehicle, 7000);