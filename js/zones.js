/**
* This file contains most of the logic
* of the game.
*
* Think of a "zone" as an invisible container
* for a specific number of obstacles.
*/

AFRAME.registerComponent('zones', {
    schema: {
        tagName: { default: 'a-entity' },
        currentZone: { type: 'selector'},
        currentZoneEndZPosition: { type: 'int'},
        initializedZones: {default: false},
        obstaclesDistance: {default: 10},        
        allowedGeneralPositions: {default: { x:[-2, 0, 2], y:[1, 3] } },
        previousObstaclePosition: {default: {x:0, y:0, z:-4} },
        zoneEnding: {default:0},
        zones: {default: []},
        zoneZPositions: {default: []}
    },
    init: function () {
        /**
        *  This generates a "zone" every 2.8 seconds.
        *  The number of seconds depends on the graphics
        *  card in use. It's definitely not "elegant" but
        *  it must remain so until a better approach is
        *  implemented.
        */
        this.tick = AFRAME.utils.throttleTick(this.tick, 2800, this);
    },
    tick: function () {
        this.createZones.bind(this);
        this.createZones();
    },
    createZones: function () {
        let data = this.data;
        let obstaclesPerZone = 5;

        if (data.zoneEnding < 0) {
            let vehiclePosition = document.querySelector('#vehicle').getAttribute('position');
            for (let i = 0; i < 2; i++) {
                /**
                 * Deletes current zone if the vehicle is
                 * considerably far from it
                 */
                if (vehiclePosition.z + 45 < data.zoneZPositions[i]) {
                    this.deleteElement(data.zones[i]);
                    data.zones.splice(i, 1);
                    data.zoneZPositions.splice(i, 1);
                }
            }
        }

        let zone = document.createElement('a-entity');
        let zonePosition = data.previousObstaclePosition;
        zone.setAttribute('position', zonePosition);
        this.el.appendChild(zone);
        this.generateObstacles('a-sphere', zone, obstaclesPerZone);
        data.zones.push(zone);
        data.zoneZPositions.push(zonePosition.z);
        data.zoneEnding = data.previousObstaclePosition.z - 1;
    },

    deleteElement: function(element) {
        element.parentNode.removeChild(element);
    },

    generateObstacles: function(mesh, parentZone, numOfObstacles) {
        for (let i = 0; i < numOfObstacles; i++) {
            let meshElement = document.createElement(mesh);            
            this.generateMultiSidedObstacle(meshElement, parentZone);
        }
    },

    generateMultiSidedObstacle: function(meshElement, parentZone) {
        let data = this.data;
        let fullRow = this.randomBoolean();
        let numberOfObjects = (fullRow) ? 3 : 2;
        let zPos = parseInt(data.previousObstaclePosition.z) - data.obstaclesDistance;
        let position;        
        let meshElementClone;
        let chosenXPositions = [];        
        let updatedAllowedGeneralPositions = data.allowedGeneralPositions;
        meshElement.setAttribute('dynamic-body', '');
        meshElement.setAttribute('repeat', 2);
        meshElement.setAttribute('src', '#alien-face');
        if (data.allowedGeneralPositions.x.length === 0) data.allowedGeneralPositions.x = [-2, 0, 2];

        for (let i = 0; i < numberOfObjects; i++) {
          meshElementClone = meshElement.cloneNode();
          position = this.generateRandomPosition(updatedAllowedGeneralPositions, zPos);
          chosenXPositions.push(position.x);
          meshElementClone.setAttribute('position', position);

          updatedAllowedGeneralPositions.x = [-2, 0, 2].filter(x => !chosenXPositions.includes(x)
        );
            parentZone.appendChild(meshElementClone);
        }
        data.previousObstaclePosition = position;
        data.currentZone = parentZone;
        data.currentZoneEndZPosition = position.z;
    },

    generateRandomPosition: function(allowedPositions, zPos) {
        let xPos = allowedPositions.x[Math.floor(Math.random() * allowedPositions.x.length)];
        let yPos = allowedPositions.y[Math.floor(Math.random() * allowedPositions.y.length)];
        return {x: xPos, y: yPos, z: zPos};
    },

    randomBoolean: function() { return Math.random() >= 0.5 }
});
