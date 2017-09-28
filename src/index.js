require('cesium/Widgets/widgets.css');
import Cesium from 'cesium/Cesium';

// Example app

var viewer = new Cesium.Viewer('cesiumContainer');

var scene = viewer.scene;
scene.debugShowFramesPerSecond = true;

Cesium.Math.setRandomNumberSeed(315);

var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883));
var emitterInitialLocation = new Cesium.Cartesian3(0.0, 0.0, 100.0);

var particleCanvas;

function getImage() {
    if (!Cesium.defined(particleCanvas)) {
        particleCanvas = document.createElement('canvas');
        particleCanvas.width = 20;
        particleCanvas.height = 20;
        var context2D = particleCanvas.getContext('2d');
        context2D.beginPath();
        context2D.arc(8, 8, 8, 0, Cesium.Math.TWO_PI, true);
        context2D.closePath();
        context2D.fillStyle = 'rgb(255, 255, 255)';
        context2D.fill();
    }
    return particleCanvas;
}

var minimumExplosionSize = 30.0;
var maximumExplosionSize = 100.0;
var particlePixelSize = 7.0;
var burstSize = 400.0;
var lifetime = 10.0;
var numberOfFireworks = 20.0;

var emitterModelMatrixScratch = new Cesium.Matrix4();

function createFirework(offset, color, bursts) {
    var position = Cesium.Cartesian3.add(emitterInitialLocation, offset, new Cesium.Cartesian3());
    var emitterModelMatrix = Cesium.Matrix4.fromTranslation(position, emitterModelMatrixScratch);
    var particleToWorld = Cesium.Matrix4.multiply(modelMatrix, emitterModelMatrix, new Cesium.Matrix4());
    var worldToParticle = Cesium.Matrix4.inverseTransformation(particleToWorld, particleToWorld);

    var size = Cesium.Math.randomBetween(minimumExplosionSize, maximumExplosionSize);
    var particlePositionScratch = new Cesium.Cartesian3();
    var force = function(particle) {
        var position = Cesium.Matrix4.multiplyByPoint(worldToParticle, particle.position, particlePositionScratch);
        if (Cesium.Cartesian3.magnitudeSquared(position) >= size * size) {
            Cesium.Cartesian3.clone(Cesium.Cartesian3.ZERO, particle.velocity);
        }
    };

    var normalSize = (size - minimumExplosionSize) / (maximumExplosionSize - minimumExplosionSize);
    var minLife = 0.3;
    var maxLife = 1.0;
    var life = normalSize * (maxLife - minLife) + minLife;

    scene.primitives.add(new Cesium.ParticleSystem({
        image : getImage(),
        startColor : color,
        endColor : color.withAlpha(0.0),
        life : life,
        speed : 100.0,
        width : particlePixelSize,
        height : particlePixelSize,
        rate : 0,
        emitter : new Cesium.SphereEmitter(0.1),
        bursts : bursts,
        lifeTime : lifetime,
        forces : [force],
        modelMatrix : modelMatrix,
        emitterModelMatrix : emitterModelMatrix
    }));
}

var xMin = -100.0;
var xMax = 100.0;
var yMin = -80.0;
var yMax = 100.0;
var zMin = -50.0;
var zMax = 50.0;

var colorOptions = [{
    minimumRed : 0.75,
    green : 0.0,
    minimumBlue : 0.8,
    alpha : 1.0
}, {
    red : 0.0,
    minimumGreen : 0.75,
    minimumBlue : 0.8,
    alpha : 1.0
}, {
    red : 0.0,
    green : 0.0,
    minimumBlue : 0.8,
    alpha : 1.0
}, {
    minimumRed : 0.75,
    minimumGreen : 0.75,
    blue : 0.0,
    alpha : 1.0
}];

for (var i = 0; i < numberOfFireworks; ++i) {
    var x = Cesium.Math.randomBetween(xMin, xMax);
    var y = Cesium.Math.randomBetween(yMin, yMax);
    var z = Cesium.Math.randomBetween(zMin, zMax);
    var offset = new Cesium.Cartesian3(x, y, z);
    var color = Cesium.Color.fromRandom(colorOptions[i % colorOptions.length]);

    var bursts = [];
    for (var j = 0; j < 3; ++j) {
        bursts.push(new Cesium.ParticleBurst({
            time : Cesium.Math.nextRandomNumber() * lifetime,
            minimum : burstSize,
            maximum : burstSize
        }));
    }

    createFirework(offset, color, bursts);
}

var camera = viewer.scene.camera;
var cameraOffset = new Cesium.Cartesian3(-300.0, 0.0, 0.0);
camera.lookAtTransform(modelMatrix, cameraOffset);
camera.lookAtTransform(Cesium.Matrix4.IDENTITY);

var toFireworks = Cesium.Cartesian3.subtract(emitterInitialLocation, cameraOffset, new Cesium.Cartesian3());
Cesium.Cartesian3.normalize(toFireworks, toFireworks);
var angle = Cesium.Math.PI_OVER_TWO - Math.acos(Cesium.Cartesian3.dot(toFireworks, Cesium.Cartesian3.UNIT_Z));
camera.lookUp(angle);