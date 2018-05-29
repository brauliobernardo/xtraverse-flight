/**
 * A component that calculates and
 * displays the score
 */
AFRAME.registerComponent('score', {
    schema: {
        value:   { type: 'int', default: 0, min: 0 },
        scored:   { type: 'boolean', default: false },
    },
    tick: function () {
        this.calculateScore();
    },
    calculateScore: function () {
        this.data.value += 1;
        if ((this.data.value > highScore) && !this.data.scored) {
            this.el.emit('scored');
            this.data.scored = true;
        }
        let textValue = `${scoreTextValue}Score: ${this.data.value}`;
        this.el.setAttribute('text', 'value', textValue);
    },
    getScore: function() {
        return this.data.value;
    }
});

/**
 * A component that moves the vehicle
 * and the main camera forward
 */
AFRAME.registerComponent('forward', {
    tick: function () {
        this.goForward();
    },
    goForward: function () {
        let vehiclePos = this.el.getAttribute('position');
        let cameraPos = document.querySelector('a-camera').getAttribute('position');
        vehiclePos.z -= 0.3;
        cameraPos.z -= 0.3;
        vehicle.setAttribute('position', vehiclePos);
        camera.setAttribute('position', cameraPos);
    }
});