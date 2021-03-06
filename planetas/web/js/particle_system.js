var camera, tick = 0,tick2 = 0,
    scene, renderer, clock = new THREE.Clock(true),
    controls, container,
    options, options2, spawnerOptions, particleSystem, particleSystem2;

init();
animate();

function init() {



    container = document.getElementById("contenedor");

    camera = new THREE.PerspectiveCamera(28, window.innerWidth / window.innerHeight, 1, 10000);
    //camera.position.z = 100;

    camera.position.y = 70;
    camera.rotation.x =-1.55;


    scene = new THREE.Scene();

    // The GPU Particle system extends THREE.Object3D, and so you can use it
    // as you would any other scene graph component.	Particle positions will be
    // relative to the position of the particle system, but you will probably only need one
    // system for your whole scene
    particleSystem = new THREE.GPUParticleSystem({
        maxParticles: 150000
    });
    scene.add( particleSystem);

   particleSystem2 = new THREE.GPUParticleSystem({
        maxParticles: 150000
    });
    scene.add( particleSystem2);

    // options passed during each spawned
    options = {
        position: new THREE.Vector3(),
        positionRandomness: .3,
        velocity: new THREE.Vector3(),
        velocityRandomness: .5,
        color: 0x428BAA,
        colorRandomness: .2,
        turbulence: .2,
        lifetime: 2,
        size: 5,
        sizeRandomness: 1
    };

    options2 = {
        position: new THREE.Vector3(),
        positionRandomness: .3,
        velocity: new THREE.Vector3(),
        velocityRandomness: .5,
        color: 0x008000,
        colorRandomness: .2,
        turbulence: .2,
        lifetime: 2,
        size: 5,
        sizeRandomness: 1
    };

    spawnerOptions = {
        spawnRate: 15000,
        horizontalSpeed: 1.5,
        verticalSpeed: 1.33,
        timeScale: 0.15
    }




    renderer = new THREE.WebGLRenderer({ alpha: true } );
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // setup controls


    window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {

    requestAnimationFrame(animate);

    var delta = clock.getDelta() * spawnerOptions.timeScale;
    tick += delta;
    tick2 += delta;

    if (tick < 0) tick = 0;

    if (delta > 0) {
        options.position.x = Math.sin(tick * -spawnerOptions.horizontalSpeed) * 30;
        /*options.position.y = Math.sin(tick * spawnerOptions.verticalSpeed) * 15;*/
        options.position.z = Math.sin(tick * spawnerOptions.horizontalSpeed + spawnerOptions.verticalSpeed) * 10;
        options2.position.x = Math.sin(tick2 * spawnerOptions.horizontalSpeed) * 30;
        /*options2.position.y = Math.sin(tick2 * spawnerOptions.verticalSpeed) * 15;*/
        options2.position.z = Math.sin(tick2 * spawnerOptions.horizontalSpeed + spawnerOptions.verticalSpeed) * 10;
        for (var x = 0; x < spawnerOptions.spawnRate * delta; x++) {
            // Yep, that's really it.	Spawning particles is super cheap, and once you spawn them, the rest of
            // their lifecycle is handled entirely on the GPU, driven by a time uniform updated below
            particleSystem.spawnParticle(options);
            particleSystem2.spawnParticle(options2);
           /* particleSystem2.spawnParticle(options);*/
        }
    }

    particleSystem.update(tick);
    particleSystem2.update(tick2);

    render();

}

function render() {

    renderer.render(scene, camera);

}