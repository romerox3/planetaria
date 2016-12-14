/**
 * Created by Romerox3.
 */
var scene, camera, render, container, OBJ, controls, audio=[];
var sol, mercurio, venus, venusNubes, tierra, tierraNubes, luna, marte, marteNubes, jupiter, jupiterNubes, saturno, urano, neptuno;
var ani1, ani2, ani3;
var loader;
var loadingScreen;
var textureFlare0, textureFlare2, textureFlare3;
var luz;
var infoPlaneta, infoPlaneta2;
var Tam;
var opcionRotarCamara=false, opcionRotarPlaneta=true;
var viajar=false;
var distanciax=0, distanciaz=0, distanciay=0, mouseX=0, mouseY=0, t= 0, t2=0, y=0, g=1, tope=0, tope2;
var paso1=false, paso2=false, paso3=true, info=false, mov=false, mov1=false, RESOURCE_LOAD=false;
var nombre;
var clock = new THREE.Clock(true); tick =0;

scene = new THREE.Scene();
groupCinturon = new THREE.Scene();
groupSol = new THREE.Group();
groupMercurio = new THREE.Group();
groupVenus = new THREE.Group();
groupTierra = new THREE.Group();
groupMarte = new THREE.Group();
groupJupiter = new THREE.Group();
groupSaturno = new THREE.Group();
groupUrano = new THREE.Group();
groupNeptuno = new THREE.Group();

init();
animate();


function init() {
    console.log("eyeyeyey")
    container = document.getElementById("contenedor");


//Camara
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 20000000);
    camera.position.z = 1000100;
    camera.position.y = 200;

//Sonidos
    audio[0] = new Audio("../sound/StellardroneGalaxies.mp3");
    audio[1] = new Audio("../sound/travel3.mp3");
    audio[0].play();

//Control de la Camara
    controls = new THREE.OrbitControls(camera);
// to disable zoom
    controls.enableZoom = false;
// to disable rotation
    controls.enableRotate = false;
// to disable pan
    controls.enablePan = false;

//Luz Solar
    luz = new THREE.PointLight(0xffffff, 1.4, 2000000);
    luz.position.set(0, 0, 0);
    luz.castShadow = true;
    luz.shadowMapWidth = 2048;
    luz.shadowMapHeight = 2048;
    scene.add(luz);

    var ambient = new THREE.AmbientLight(0x111111);
    scene.add(ambient);


//initialize the manager to handle all loaded events (currently just works for OBJ and image files)
    manager = new THREE.LoadingManager();

    manager.onProgress = function (item, loaded, total) {
        console.log(item, loaded, total);
    };
    manager.onLoad = function () {
        console.log('all items loaded');
        RESOURCE_LOAD = true;
    };
    manager.onError = function () {
        console.log('there has been an error');
    };

    loader = new THREE.TextureLoader(manager);

//Pantalla de carga
    var loaderL = new THREE.FontLoader(manager);
    loaderL.load('../font/interplanetary/interplanetary_Regular.json', function (font) {

        tituloIntro(font);

    });

    loadingScreen = {
        scene: new THREE.Scene(),
        camera: new THREE.PerspectiveCamera(90, 1280 / 780, 0.1, 100),
        box: new THREE.Mesh(
            new THREE.SphereGeometry(1, 32, 16),
            new THREE.MeshBasicMaterial({color: 0x0040FF})
        ),
        light: new THREE.PointLight(0xffffff, 1.4, 2000000)
    };

    loadingScreen.box.position.set(0, 0, 10);
    loadingScreen.light.position.set(0, 0, 7);
    loadingScreen.camera.lookAt(loadingScreen.box.position);
    loadingScreen.scene.add(loadingScreen.box);
    loadingScreen.scene.add(loadingScreen.light);

//Reflejos del sol
    var textureLoader = new THREE.TextureLoader(manager);


    textureFlare0 = textureLoader.load('../img/lensflare0.png');
    textureFlare2 = textureLoader.load('../img/lensflare2.png');
    textureFlare3 = textureLoader.load('../img/lensflare3.png');

    var a = 0.2, b = 0.2, c = 0.5;

    addLight(a, b, c, 0, 0, 23500);
    addLight(a, b, c, 23500, 0, 0);
    addLight(a, b, c, 0, 0, -23500);
    addLight(a, b, c, -23500, 0, 0);

//cometa

    particleSystem = new THREE.GPUParticleSystem({
        maxParticles: 150000
    });

//scene.add( particleSystem);

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

    spawnerOptions = {
        spawnRate: 15000,
        horizontalSpeed: 0.2,
        verticalSpeed: 0.5,
        timeScale: 0.15
    }

//Conjunto de Estrellas
    function CrearEstrellas(o, s, x, y, z, n, r) {
        this.o = o;
        this.s = s;
        this.x = x;
        this.y = y;
        this.z = z;
        this.n = n;
        this.r = r;
        this.init = function () {
            var estrellasGeometry = new THREE.Geometry();
            var estrellasMaterial = new THREE.ParticleBasicMaterial({
                color: this.r,
                transparent: true,
                opacity: this.o,
                size: this.s,
                sizeAttenuation: false
            });
            var estrellas;
            var va1 = 50, va2 = 25;

            for (var i = 0; i < this.n; i++) {
                var vertex = new THREE.Vector3();
                vertex.x = Math.random() * va1 - va2;
                vertex.y = Math.random() * va1 - va2;
                vertex.z = Math.random() * va1 - va2;
                vertex.multiplyScalar(5000);
                estrellasGeometry.vertices.push(vertex);
            }

            estrellas = new THREE.ParticleSystem(estrellasGeometry, estrellasMaterial);
            estrellas.scale.set(this.x, this.y, this.z);
            return estrellas;
        }
    }

    var estrellas = new CrearEstrellas(0.6, 1, 50, 50, 50, 20000, 0xbbbbbb).init();
    var estrellas2 = new CrearEstrellas(0.8, 1.6, 70, 150, 100, 2000, 0x8CCBF0).init();
    var estrellas3 = new CrearEstrellas(0.8, 1.6, 70, 150, 100, 2000, 0xA86258).init();
    var estrellas4 = new CrearEstrellas(0.8, 2, 70, 150, 100, 1000, 0x8CCBF0).init();
    var estrellas5 = new CrearEstrellas(0.8, 2, 70, 150, 100, 1000, 0xA86258).init();
    scene.add(estrellas);
    scene.add(estrellas2);
    scene.add(estrellas3);
    scene.add(estrellas4);
    scene.add(estrellas5);


//Sun

    loader.load('../img/sol.jpg', function (texture) {
        var sol_geom = new THREE.SphereGeometry(23000, 64, 32);
        texture.anisotropy = 8;
        var sol_mat = new THREE.MeshBasicMaterial({map: texture});
        sol = new THREE.Mesh(sol_geom, sol_mat);
        groupSol.add(sol);
    });

    var kuiper_geom = new THREE.Geometry();
    var kuiper_geom2 = new THREE.Geometry();
    var kuiper_geom3 = new THREE.Geometry();
    var kuiper_geom4 = new THREE.Geometry();
    var kuiper_mat = new THREE.ParticleBasicMaterial({
        color: 0xB9AB8E,
        transparent: true,
        opacity: 0.5,
        size: 1.2,
        sizeAttenuation: false
    });

    for (var i = 0; i < 5000; i++) {
        var vertex = new THREE.Vector3();
        vertex.x = Math.sin(180 / Math.PI * i) * (3000000 - i / 500000);
        vertex.y = Math.random() * 400000;
        vertex.z = Math.cos(180 / Math.PI * i) * (3000000 - i / 500000);
        kuiper_geom.vertices.push(vertex);
    }
    for (var i = 0; i < 10000; i++) {
        var vertex = new THREE.Vector3();
        vertex.x = Math.sin(180 / Math.PI * i) * (3000000 - i / 500000);
        vertex.y = Math.random() * 200000;
        vertex.z = Math.cos(180 / Math.PI * i) * (3000000 - i / 500000);
        kuiper_geom2.vertices.push(vertex);
    }
    for (var i = 0; i < 5000; i++) {
        var vertex = new THREE.Vector3();
        vertex.x = Math.sin(180 / Math.PI * i) * (3000000 - i / 500000);
        vertex.y = Math.random() * -200000;
        vertex.z = Math.cos(180 / Math.PI * i) * (3000000 - i / 500000);
        kuiper_geom4.vertices.push(vertex);
    }

    var cinturon = new THREE.ParticleSystem(kuiper_geom, kuiper_mat);
    var cinturon2 = new THREE.ParticleSystem(kuiper_geom2, kuiper_mat);
    var cinturon3 = new THREE.ParticleSystem(kuiper_geom3, kuiper_mat);
    var cinturon4 = new THREE.ParticleSystem(kuiper_geom4, kuiper_mat);
    cinturon.castShadow = true;

    var cinturonKuiper = cinturon;


    groupCinturon.add(cinturon2);

    groupCinturon.add(cinturon4);
    groupCinturon.add(cinturonKuiper);
    groupSol.add(groupCinturon);
    scene.add(groupSol);

//Mercurio

    mercurio = new CrearPlanet('../img/mercurioMap.jpg', 80, '../img/mercurioNormal.jpg', '../img/mercurioBump.jpg').init();

    var merGeometry = new THREE.SphereGeometry(80, 64, 32);
    var merGlowMaterial = createAtmosphereMaterial();
    merGlowMaterial.uniforms.glowColor.value.set(0xFFFFFF);
    merGlowMaterial.uniforms.coeficient.value = 0.8;
    merGlowMaterial.uniforms.power.value = 3.0;
    var merGlow = new THREE.Mesh(merGeometry, merGlowMaterial);
    merGlow.scale.multiplyScalar(1.02);

    groupMercurio.add(merGlow);

    groupMercurio.add(mercurio);

    scene.add(groupMercurio);
//Venus

    venus = new CrearPlanet('../img/venusMap.jpg', 199, '../img/venusNormal.jpg', '../img/venusBump.jpg').init();
    groupVenus.add(venus);

    venusNubes = new CrearNubes('../img/venusNubes.png', 200, 0.6).init();
    groupVenus.add(venusNubes);

    var glowVenus = new CrearAtmosfera(199, 0xEFE964, 0.8, 2.4).init();
    groupVenus.add(glowVenus);

    scene.add(groupVenus);

//Earth
    earth = new CrearPlanet('../img/tierraMap.jpg', 210, '../img/tierraNormal.png', '../img/tierraBump.jpg').init();

    var earthGlow = new CrearAtmosfera(210, 0x1200FF, 0.8, 2.6).init();

    groupTierra.add(earthGlow);

    groupTierra.add(earth);

    tierraNubes;
    var nubes_geom = new THREE.SphereGeometry(211, 64, 32);
    var nubtexture = loader.load(('../img/tierraNubes.png'));
    var nubes_mat = new THREE.MeshPhongMaterial({map: nubtexture, transparent: true, opacity: 1});
    tierraNubes = new THREE.Mesh(nubes_geom, nubes_mat);
    groupTierra.add(tierraNubes);

//Luna
    luna = new CrearPlanet('../img/lunaMap.jpg', 80, '../img/lunaNormal.jpg', '../img/lunaBump.jpg').init();
    groupTierra.add(luna);


    scene.add(groupTierra);

//Marte
    marte = new CrearPlanet('../img/marteMap.jpg', 112, '../img/marteNormal.jpg', '../img/marteBump.jpg').init();
    groupMarte.add(marte);
    marteNubes = new CrearNubes('../img/marteNubes.png', 114, 0.5).init();
    groupMarte.add(marteNubes);
    var glowMarte = new CrearAtmosfera(112, 0x9D5141, 0.8, 2).init();
    groupMarte.add(glowMarte);
    scene.add(groupMarte);

//Jupiter
    jupiter = new CrearPlanet('../img/jupiterMap.jpg', 2361, '../img/jupiterNormal.jpg', '../img/jupiterBump.jpg').init();
    groupJupiter.add(jupiter);
    jupiterNubes = new CrearNubes('../img/jupiterNubes.png', 2370, 0.5).init();
    groupJupiter.add(jupiterNubes);
    scene.add(groupJupiter);


//Saturno
    saturno = new CrearPlanet('../img/saturnoMap.jpg', 1990, '../img/saturnoNormal.jpg', '../img/saturnoBump.jpg').init();
    groupSaturno.add(saturno);

    nubesSaturno = new CrearNubes('../img/nubesSaturno.png', 1999, 0.5).init();
    groupSaturno.add(nubesSaturno);

    ani1 = CrearAnillo(80, 0xB9AB8E, 1);
    ani2 = CrearAnillo(150, 0xB9AB8E, 1.5);
    ani3 = CrearAnillo(350, 0xB9AB8E, 2);

    groupSaturno.add(ani1);
    groupSaturno.add(ani2);
    groupSaturno.add(ani3);
    scene.add(groupSaturno);

//Urano
    urano = new CrearPlanet('../img/uranoMap.jpg', 844, '../img/uranoNormal.jpg', '../img/uranoBump.jpg').init();
    groupUrano.add(urano);

    var glowUrano = new CrearAtmosfera(844, 0x52717D, 0.8, 2.6).init();
    groupUrano.add(glowUrano);

    scene.add(groupUrano);


//Neptuno
    neptuno = new CrearPlanet('../img/neptunoMap.jpg', 818, '../img/neptunoNormal.jpg', '../img/neptunoBump.jpg').init();
    groupNeptuno.add(neptuno);

    var glowNeptuno = new CrearAtmosfera(818, 0x0B1224, 0.8, 2.6).init();
    groupNeptuno.add(glowNeptuno);

    scene.add(groupNeptuno);


    render = new THREE.WebGLRenderer({alpha: true});
    render.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(render.domElement);

    /*document.addEventListener('click', function(){
     document.addEventListener('mousemove',function(event){
     y = parseInt(event.offsetY);

     });
     });*/


    document.addEventListener('mousemove', function (event) {
        mouseX = parseInt(event.offsetX);
        mouseY = parseInt(event.offsetY);
    });
}

function animate(){

    if(RESOURCE_LOAD==false){

        requestAnimationFrame(animate);
        t+=Math.PI/180*2*0.1;
        loadingScreen.box.position.x = Math.sin(t * 0.8) * 20*2;
        loadingScreen.box.position.z = Math.cos(t * 0.8) * 20*2;

        render.render(loadingScreen.scene, loadingScreen.camera);

        return;

    }

    if(mov==false){
        movInicial();
    }

    requestAnimationFrame(animate);

    //controls.update(0.05);

    luna.position.x = Math.sin(t * 0.8) * 2000;
    luna.position.y = Math.sin(t * 0.8) * 2000;
    luna.position.z = Math.cos(t * 0.8) * 2000;

    if(!info){
        t+=Math.PI/180*2*0.1;
        //Movimiento y Posicion Planetas (0.1=velocidad 1000=posicion)

        groupMercurio.position.x = Math.sin(t * 0.3) * 40000*2;
        groupMercurio.position.z = Math.cos(t * 0.3) * 40000*2;

        groupTierra.position.x = Math.sin(t * 0.1) * 150000*2;
        groupTierra.position.z = Math.cos(t * 0.1) * 150000*2;

        groupVenus.position.x = Math.sin(t * 0.2) * 85000*2;
        groupVenus.position.z = Math.cos(t * 0.2) * 85000*2;

        groupMarte.position.x = Math.sin(t * 0.08) * 250000*2;
        groupMarte.position.z = Math.cos(t * 0.08) * 250000*2;

        groupJupiter.position.x = Math.sin(t * 0.06) * (-370000)*2;
        groupJupiter.position.z = Math.cos(t * 0.06) * (-370000)*2;

        groupSaturno.position.x = Math.sin(t * 0.04) * 450000*2;
        groupSaturno.position.z = Math.cos(t * 0.04) * 450000*2;

        groupUrano.position.x = Math.sin(t * 0.02) * 600000*2;
        groupUrano.position.z = Math.cos(t * 0.02) * 600000*2;

        groupNeptuno.position.x = Math.sin(t * 0.01) * 900000*2;
        groupNeptuno.position.z = Math.cos(t * 0.01) * 900000*2;
    }

    /*var delta = clock.getDelta() * spawnerOptions.timeScale;
    tick += delta;

    if (tick < 0) tick = 0;

    if (delta > 0) {
        options.position.x = Math.sin(tick * -spawnerOptions.horizontalSpeed) * 86000*2;
        options.position.z = Math.sin(tick * spawnerOptions.horizontalSpeed + spawnerOptions.verticalSpeed) * 180000*2;

        for (var x = 0; x < spawnerOptions.spawnRate * delta; x++) {
            // Yep, that's really it.	Spawning particles is super cheap, and once you spawn them, the rest of
            // their lifecycle is handled entirely on the GPU, driven by a time uniform updated below
            particleSystem.spawnParticle(options);

        }
    }

    particleSystem.update(tick);*/

    if(viajar) {
         
        camera.lookAt(infoPlaneta.position);
        camera.position.y = infoPlaneta.position.y;



        if (camera.position.z != infoPlaneta.position.z) {

                if (!(camera.position.z > infoPlaneta.position.z - (Tam+Tam*2) && camera.position.z < infoPlaneta.position.z + (Tam+Tam*2))) {
                    distanciaz = camera.position.z - infoPlaneta.position.z;
                    camera.position.z -= distanciaz / 100;
                }
                else {
                    paso1 = true;
                }


        }

        if (camera.position.x != infoPlaneta.position.x) {

                if (!(camera.position.x > infoPlaneta.position.x - (Tam + Tam * 2) && camera.position.x < infoPlaneta.position.x + (Tam + Tam * 2))) {
                    distanciax = camera.position.x - infoPlaneta.position.x;
                    camera.position.x -= distanciax / 100;
                }
                else {
                    paso2 = true;
                }
            }


        infoPlaneta2=infoPlaneta;
    }

    if(paso1 && paso2){
        $("#divNombrePlaneta").fadeIn(1000);
    }
    else{
        $("#divNombrePlaneta").fadeOut(1);
        $("#ePlanetas").fadeOut(0);
        $("#dPlanetas").fadeOut(0);
        g=1;
    }

    if(opcionRotarCamara){

        controls.enableZoom = true;

        // activar Rotacion
        controls.enableRotate = true;

        // activar Pan
        controls.enablePan = true;

        controls.target = infoPlaneta.position;
        controls.update(0.01);
        camera.lookAt(infoPlaneta.position);
        viajar=false;
    }
    else{

        controls.enableZoom = false;

     // Desactivar Rotacion
        controls.enableRotate = false;

        // Desactivar Pan
        controls.enablePan = false;
    }




    if(opcionRotarPlaneta){
        //Rotacion Planetas
        groupCinturon.rotation.y+=0.0001;

        sol.rotation.y+=0.005;

        mercurio.rotation.y+=0.01;

        venus.rotation.y+=0.001;
        venusNubes.rotation.y+=0.0015;

        earth.rotation.y+=0.001;
        tierraNubes.rotation.y+=0.0015;

        marte.rotation.y+=0.001;
        marteNubes.rotation.y+=0.0015;

        jupiter.rotation.y+=0.01;
        jupiterNubes.rotation.y+=0.015;

        groupSaturno.rotation.z=25;
        saturno.rotation.y+=0.001;
        nubesSaturno.rotation.y+=0.015;
        ani1.rotation.y+=0.009;
        ani2.rotation.y+=0.007;
        ani3.rotation.y+=0.005;

        urano.rotation.y+=0.01;

        neptuno.rotation.y+=0.01;
    }

    /*camera.position.x += ( mouseX) * 0.01;
     camera.position.y += ( - mouseY) * 0.01;*/

    /*camera.position.x=groupTierra.position.x+200;
     camera.position.y=groupTierra.position.y;
     camera.position.z=groupTierra.position.z+400;
     camera.lookAt(groupTierra.position);*/

    if(mov==false) {

        var time = Date.now() * 0.001;

        uniforms.amplitude.value = Math.sin(0.5 * time);
        uniforms.color.value.offsetHSL(0.0005, 0, 0);

        var attributes = OBJ.geometry.attributes;
        var array = attributes.displacement.array;

        for (var i = 0, l = array.length; i < l; i += 3) {

            array[i] += 0.3 * ( 0.5 - Math.random() );
            array[i + 1] += 0.3 * ( 0.5 - Math.random() );
            array[i + 2] += 0.3 * ( 0.5 - Math.random() );

        }

        attributes.displacement.needsUpdate = true;

    }

    renderer();
}

function renderer(){

    render.render(scene,camera);

}

function iplanetas(){

    if(g==0) {
        $("#ePlanetas").fadeOut(1000);
        $("#dPlanetas").fadeOut(1000);
        g = 1;
    }
    else{
        $("#ePlanetas").fadeIn(1000);
        $("#dPlanetas").fadeIn(1000);
        g = 0;
    }

}

function showInfo(num){
    console.log(num);
    switch (num){
        case 1:
            infoPlaneta = groupMercurio;
            info=true;
            viajar = true;
            opcionRotarCamara=false;
            Tam = 80;
            $("#pNombrePlaneta").text("Mercurio");
            aplicarDesc();
            if(paso1&&paso2!=false)
            sonidoViaje();
            paso1 = false;
            paso2 = false;
            break;
        case 2:
            infoPlaneta = groupVenus;
            info = true;
            viajar = true;
            opcionRotarCamara=false;
            Tam = 199;
            $("#pNombrePlaneta").text("Venus");
            aplicarDesc();
            if(paso1&&paso2!=false)
                sonidoViaje();
            paso1 = false;
            paso2 = false;
            break;
        case 3:
            infoPlaneta = groupTierra;
            info=true;
            viajar = true;
            opcionRotarCamara=false;
            Tam = 210;
            $("#pNombrePlaneta").text("La Tierra");
            aplicarDesc();
            if(paso1&&paso2!=false)
                sonidoViaje();
            paso1 = false;
            paso2 = false;
            break;
        case 4:
            infoPlaneta = groupMarte;
            info=true;
            viajar = true;
            opcionRotarCamara=false;
            Tam = 112;
            $("#pNombrePlaneta").text("Marte");
            aplicarDesc();
            if(paso1&&paso2!=false)
                sonidoViaje();
            paso1 = false;
            paso2 = false;
            break;
        case 5:
            infoPlaneta = groupJupiter;
            info=true;
            viajar = true;
            opcionRotarCamara=false;
            Tam = 2361;
            $("#pNombrePlaneta").text("Jupiter");
            aplicarDesc();
            if(paso1&&paso2!=false)
                sonidoViaje();
            paso1 = false;
            paso2 = false;
            break;
        case 6:
            infoPlaneta = groupSaturno;
            info=true;
            viajar = true;
            opcionRotarCamara=false;
            Tam = 1990;
            $("#pNombrePlaneta").text("Saturno");
            aplicarDesc();
            if(paso1&&paso2!=false)
                sonidoViaje();
            paso1 = false;
            paso2 = false;
            break;
        case 7:
            infoPlaneta = groupUrano;
            info=true;
            viajar = true;
            opcionRotarCamara=false;
            Tam = 844;
            $("#pNombrePlaneta").text("Urano");
            aplicarDesc();
            if(paso1&&paso2!=false)
                sonidoViaje();
            paso1 = false;
            paso2 = false;
            break;

        case 8:
            infoPlaneta = groupNeptuno;
            info=true;
            viajar = true;
            opcionRotarCamara=false;
            Tam = 818;
            $("#pNombrePlaneta").text("Neptuno");
            aplicarDesc();
            if(paso1&&paso2!=false)
                sonidoViaje();
            paso1 = false;
            paso2 = false;
            break;

    }
}

function sonidoViaje(){
    audio[1].load();
    audio[1].play();
}

function aplicarDesc(){

    switch(infoPlaneta) {
        case groupMercurio:
            $("#ePlanetas").html("Es el planeta más cercano al Sol y el segundo más pequeño del Sistema Solar. Mercurio es menor que la Tierra, pero más grande que la Luna." +"<br>"+"<br>"+" Si nos situásemos sobre Mercurio, el Sol nos parecería dos veces y media más grande. El cielo, sin embargo, lo veríamos siempre negro, porque no tiene atmósfera que pueda dispersar la luz. " +"<br>"+"<br>"+"Los romanos le pusieron el nombre del mensajero de los dioses porque se movía más rápido que los demás planetas. Da la vuelta al Sol en menos de tres meses. En cambio, Mercurio gira lentamente sobre su eje, una vez cada 58 días y medio. Antes lo hacía más rápido, pero la influencia del Sol le ha ido frenando.");
            $("#dPlanetas").html("<table class='table'><tbody><tr><td>Radio</td><td>2.440 km</td></tr><tr><td>Distancia Media al Sol</td><td>57.910.000 km.</td></tr><tr><td>Duracion del Dia</td><td>1404 horas</td></tr><tr><td>Duracion del Año</td><td>88 dias</td></tr><tr><td>Temperatura Media</td><td>179 º C</td></tr><tr><td>Gravedad</td><td>2,78 m/s2</td></tr></tbody></table>");
        break;

        case groupVenus:
            $("#ePlanetas").html( "Es el segundo planeta del Sistema Solar y el más semejante a La Tierra por su tamaño, masa, densidad y volumen. Los dos se formaron en la misma época, a partir de la misma nebulosa." + "<br>"+"Sin embargo, es diferente de la Tierra. No tiene océanos y su densa atmósfera provoca un efecto invernadero que eleva la temperatura hasta los 480 ºC. Es abrasador." + "<br>" +"<br>"+ "Los primeros astrónomos pensaban que Venus eran dos cuerpos diferentes porque, unas veces se ve un poco antes de salir el Sol y, otras, justo después de la puesta." + "<br>" +"<br>"+ "Venus gira sobre su eje muy lentamente y en sentido contrario al de los otros planetas. El Sol sale por el oeste y se pone por el este, al revés de lo que ocurre en La Tierra. Además, el día en Venus dura más que el año.");
            $("#dPlanetas").html("<table class='table'><tbody><tr><td>Radio</td><td>6.052 km.</td></tr><tr><td>Distancia Media al Sol</td><td>108.200.000 km.</td></tr><tr><td>Duracion del Dia</td><td>-243 días</td></tr><tr><td>Duracion del Año</td><td>224,7 días</td></tr><tr><td>Temperatura Media</td><td>482 º C</td></tr><tr><td>Gravedad</td><td>8,87 m/s2</td></tr></tbody></table>");
            break;

        case groupTierra:
            $("#ePlanetas").html("Es nuestro planeta y el único habitado. Está en la ecosfera, un espacio que rodea al Sol y que tiene las condiciones necesarias para que exista vida." +"<br>"+"<br>"+"La Tierra es el mayor de los planetas rocosos. Eso hace que pueda retener una capa de gases, la atmósfera, que dispersa la luz y absorbe calor. De día evita que la Tierra se caliente demasiado y, de noche, que se enfríe." +"<br>"+"<br>"+"Siete de cada diez partes de la superficie terrestre están cubiertas de agua. Los mares y océanos también ayudan a regular la temperatura. El agua que se evapora forma nubes y cae en forma de lluvia o nieve, formando rios y lagos. En los polos, que reciben poca energía solar, el agua se hiela y forma los casquetes polares. El del sur és más grande y concentra la mayor reserva de agua dulce." + "<br>" + "<br>"+"La Tierra no es una esfera perfecta, sino que tiene forma de pera. Cálculos basados en las perturbaciones de las órbitas de los satélites artificiales revelan que el ecuador se engrosa 21 km; el polo norte está dilatado 10 m y el polo sur está hundido unos 31 metros.");
            $("#dPlanetas").html("<table class='table'><tbody><tr><td>Radio</td><td>6.378 km.</td></tr><tr><td>Distancia Media al Sol</td><td>149.600.000 km.</td></tr><tr><td>Duracion del Dia</td><td>23,93 horas</td></tr><tr><td>Duracion del Año</td><td>365,256 dias</td></tr><tr><td>Temperatura Media</td><td>15 º C</td></tr><tr><td>Gravedad</td><td>9,78 m/s2</td></tr></tbody></table>");
            break;

        case groupMarte:
            $("#ePlanetas").html("Es el cuarto planeta del Sistema Solar. Conocido como el planeta rojo por sus tonos rosados, los romanos lo identificaban con la sangre y le pusieron el nombre de su dios de la guerra." +"<br>"+"<br>"+"El planeta Marte tiene una atmósfera muy fina, formada principalmente por dióxido de carbono, que se congela alternativamente en cada uno de los polos. Contiene sólo un 0,03% de agua, mil veces menos que la Tierra." + "<br>" + "<br>"+"Los estudios demuestran que Marte tuvo una atmósfera más compacta, con nubes y precipitaciones que formaban rios. Sobre la superficie se adivinan surcos, islas y costas. Las grandes diferencias de temperatura provocan vientos fuertes. La erosión del suelo ayuda a formar tempestades de polvo y arena que degradan todavía más la superficie.");
            $("#dPlanetas").html("<table class='table'><tbody><tr><td>Radio</td><td>3.397 km.</td></tr><tr><td>Distancia Media al Sol</td><td>227.940.000 km.</td></tr><tr><td>Duracion del Dia</td><td>24,62 horas</td></tr><tr><td>Duracion del Año</td><td>686,98 días</td></tr><tr><td>Temperatura Media</td><td>-63 º C </td></tr><tr><td>Gravedad</td><td>3,72 m/s2</td></tr></tbody></table>");
            break;

        case groupJupiter:
         $("#ePlanetas").html("Es el planeta más grande del Sistema Solar, tiene más materia que todos los otros planetas juntos y su volumen es mil veces el de la Tierra." +"<br>"+"<br>"+"Júpiter tiene un tenue sistema de anillos, invisible desde la Tierra. También tiene 16 satélites. Cuatro de ellos fueron descubiertos por Galileo en 1610. Era la primera vez que alguien observaba el cielo con un telescopio." +"<br>"+"<br>"+"Júpiter tiene una composición semejante a la del Sol, formada por hidrógeno, helio y pequeñas cantidades de amoníaco, metano, vapor de agua y otros compuestos."+"<br>"+"<br>"+"La rotación de Júpiter es la más rápida entre todos los planetas y tiene una atmósfera compleja, con nubes y tempestades. Por ello muestra franjas de diversos colores y algunas manchas.");
         $("#dPlanetas").html("<table class='table'><tbody><tr><td>Radio</td><td>71.492 km.</td></tr><tr><td>Distancia Media al Sol</td><td>778.330.000 km.</td></tr><tr><td>Duracion del Dia</td><td>9,84 horas</td></tr><tr><td>Duracion del Año</td><td>11,86 años</td></tr><tr><td>Temperatura Media</td><td>-120 º C</td></tr><tr><td>Gravedad</td><td>22,88 m/s2</td></tr></tbody></table>");
        break;

        case groupSaturno:
            $("#ePlanetas").html("Saturno es el segundo planeta más grande del Sistema Solar y el único con anillos visibles desde la Tierra. Se ve claramente achatado por los polos a causa de la rápida rotación" +"<br>"+"<br>"+"La atmósfera es de hidrógeno, con un poco de helio y metano. Es el único planeta que tiene una densidad menor que el agua. Si encontrásemos un océano suficientemente grande, Saturno flotaría." +"<br>"+"<br>"+"El color amarillento de las nubes tiene bandas de otros colores, como Júpiter, pero no tan marcadas. Cerca del ecuador de Saturno el viento sopla a 500 Km/h. Los anillos le dan un aspecto muy bonito. Tiene dos brillantes, A y B, y uno más suave, el C. Entre ellos hay aberturas. La mayor es la División de Cassini.");
            $("#dPlanetas").html("<table class='table'><tbody><tr><td>Radio</td><td>60.268 km.</td></tr><tr><td>Distancia Media al Sol</td><td>1.429.400.000 km.</td></tr><tr><td>Duracion del Dia</td><td>10,23 horas</td></tr><tr><td>Duracion del Año</td><td>29,46 años</td></tr><tr><td>Temperatura Media</td><td>-125 º C</td></tr><tr><td>Gravedad</td><td>9,05 m/s2</td></tr></tbody></table>");
            break;

        case groupUrano:
            $("#ePlanetas").html("Es el septimo planeta desde el Sol y el tercero más grande del Sistema Solar. Urano es también el primero que se descubrió grcias al telescopio." +"<br>"+"<br>"+"La atmósfera de Urano está formada por hidrógeno, metano y otros hidrocarburos. El metano absorbe la luz roja, por eso refleja los tonos azules y verdes." +"<br>"+"<br>"+"Urano está inclinado de manera que el ecuador hace casi ángulo recto, 98 º, con la trayectoria de la órbita. Esto hace que en algunos momentos la parte más caliente, encarada al Sol, sea uno de los polos."+"<br>"+"<br>"+"Su distancia al Sol es el doble que la de Saturno. Está tan lejos que, desde Urano, el Sol parece una estrella más. Aunque, mucho más brillante que las otras.");
            $("#dPlanetas").html("<table class='table'><tbody><tr><td>Radio</td><td>25.559 km.</td></tr><tr><td>Distancia Media al Sol</td><td>2.870.990.000 km.</td></tr><tr><td>Duracion del Dia</td><td>17,9 horas</td></tr><tr><td>Duracion del Año</td><td>84,01 años</td></tr><tr><td>Temperatura Media</td><td>-210 º C</td></tr><tr><td>Gravedad</td><td>7,77 m/s2</td></tr></tbody></table>");

            break;

        case groupNeptuno:
            $("#ePlanetas").html("Es el planeta más exterior de los gigantes gaseosos y el primero que fue descubierto gracias a predicciones matemáticas." +"<br>"+"<br>"+"El interior de Neptuno es roca fundida con agua, metano y amoníaco líquidos. El exterior es hidrógeno, helio, vapor de agua y metano, que le da el color azul." +"<br>"+"<br>"+"Neptuno es un planeta dinámico, con manchas que recuerdan las tempestades de Júpiter. La más grande, la Gran Mancha Oscura, tenía un tamaño similar al de la Tierra, pero en 1994 desapareció y se ha formado otra."+"<br>"+"<br>"+"Los vientos más fuertes de cualquier planeta del Sistema Solar son los de Neptuno. Muchos de ellos soplan en sentido contrario al de rotación. Cerca de la Gran Mancha Oscura se han medido vientos de 2.000 Km/h.");
            $("#dPlanetas").html("<table class='table'><tbody><tr><td>Radio</td><td>24.746 km.</td></tr><tr><td>Distancia Media al Sol</td><td>4.504.300.000 km.</td></tr><tr><td>Duracion del Dia</td><td>16,11 horas</td></tr><tr><td>Duracion del Año</td><td>164,8 años</td></tr><tr><td>Temperatura Media</td><td>-200 º C</td></tr><tr><td>Gravedad</td><td>11 m/s2</td></tr></tbody></table>");

            break;


    }
}

function opciones(num){
    switch(num){
        case 1:
            if(!opcionRotarPlaneta){
                opcionRotarPlaneta=true;
            }
            else{
                opcionRotarPlaneta=false;

            }
            break;
        case 2:
            if(!info){
                info=true;
            }
            else{
                info=false;
            }
            break;
        case 3:
            if(paso1 && paso2){
                if(!opcionRotarCamara){

                    opcionRotarCamara=true;
                }
                else{
                    opcionRotarCamara=false;

                }
            }
            break;
    }
}

function CrearPlanet (r , l, n, o){

    this.r=r;
    this.l=l;
    //this.s=s;
    this.n=n;
    this.o=o;

    this.init= function(){

        var g = new THREE.SphereGeometry(this.l,64,32);

        var m = loader.load(this.r);

        //var sp = loader.load(this.s);

        var np = loader.load(this.n);

        var bp = loader.load(this.o);

        m.anisotropy = 8;

        var j = new THREE.MeshPhongMaterial({map:m, normalMap:np, bumpMap:bp});

        var something = new THREE.Mesh(g,j);

        something.castShadow = true;

        return something;

    }
}

function CrearAtmosfera(l, v, va, p){

    this.l = l;
    this.v = v;
    this.va = va;
    this.p = p;

    this.init = function() {
        var Geometry = new THREE.SphereGeometry(this.l, 64, 32);
        var GlowMaterial = createAtmosphereMaterial();
        GlowMaterial.uniforms.glowColor.value.set(this.v);
        GlowMaterial.uniforms.coeficient.value = this.va;
        GlowMaterial.uniforms.power.value = this.p;
        var Glow = new THREE.Mesh(Geometry, GlowMaterial);
        Glow.castShadow = true;
        Glow.scale.multiplyScalar(1.02);

        return Glow;
    }
}

function CrearNubes (r , l, s){

    this.r=r;
    this.l=l;
    this.s=s;


    this.init= function(){

        var g = new THREE.SphereGeometry(this.l,64,32);

        var m = loader.load(this.r);

        var j = new THREE.MeshPhongMaterial({map:m, transparent: true, opacity:this.s});

        var something = new THREE.Mesh(g,j);

        return something;

    }
}

function CrearAnillo(k,color,size){
    var anillo_saturno_geom = new THREE.Geometry();
    var anillo_saturno_mat = new THREE.ParticleBasicMaterial({color: color, transparent:true, opacity:0.3, size:size, sizeAttenuation: false});

    for(var i=0;i<200000;i++){
        var  vertex = new THREE.Vector3();
        vertex.x = Math.sin(180/Math.PI*i)*(4758-i/k);
        vertex.y = Math.random()*200;
        vertex.z = Math.cos(180/Math.PI*i)*(4758-i/k);
        anillo_saturno_geom.vertices.push(vertex);
    }

    var anillo = new THREE.ParticleSystem(anillo_saturno_geom,anillo_saturno_mat);
    anillo.castShadow = true;

    return anillo;
}

function addLight( h, s, l, x, y, z ) {

    var light = new THREE.PointLight(0xffffff, 1.5, 2000);
    light.color.setHSL(h, s, l);
    light.position.set(x, y, z);
    scene.add(light);

    var flareColor = new THREE.Color(0xbbbbbb);
    flareColor.setHSL(h, s, l + 0.5);

    var lensFlare = new THREE.LensFlare(textureFlare0, 700, 0.0, THREE.AdditiveBlending, flareColor);

    lensFlare.add(textureFlare2, 512, 0.0, THREE.AdditiveBlending);
    lensFlare.add(textureFlare2, 512, 0.0, THREE.AdditiveBlending);
    lensFlare.add(textureFlare2, 512, 0.0, THREE.AdditiveBlending);

    lensFlare.add(textureFlare3, 60, 0.6, THREE.AdditiveBlending);
    lensFlare.add(textureFlare3, 70, 0.7, THREE.AdditiveBlending);
    lensFlare.add(textureFlare3, 120, 0.9, THREE.AdditiveBlending);
    lensFlare.add(textureFlare3, 70, 1.0, THREE.AdditiveBlending);

    lensFlare.customUpdateCallback = lensFlareUpdateCallback;
    lensFlare.position.copy(light.position);

    scene.add(lensFlare);
}
//

function lensFlareUpdateCallback( object ) {

    var f, fl = object.lensFlares.length;
    var flare;
    var vecX = -object.positionScreen.x * 2;
    var vecY = -object.positionScreen.y * 2;


    for( f = 0; f < fl; f++ ) {

        flare = object.lensFlares[ f ];

        flare.x = object.positionScreen.x + vecX * flare.distance;
        flare.y = object.positionScreen.y + vecY * flare.distance;

        flare.rotation = 0;

    }

    object.lensFlares[ 2 ].y += 0.025;
    object.lensFlares[ 3 ].rotation = object.positionScreen.x * 0.5 + THREE.Math.degToRad( 45 );

}

function createAtmosphereMaterial (){
    var vertexShader  = [
        'varying vec3 vNormal;',
        'void main(){',
        '  // compute intensity',
        '  vNormal    = normalize( normalMatrix * normal );',
        '  // set gl_Position',
        '  gl_Position  = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
        '}',
    ].join('\n');
    var fragmentShader  = [
        'uniform float coeficient;',
        'uniform float power;',
        'uniform vec3  glowColor;',

        'varying vec3  vNormal;',

        'void main(){',
        '  float intensity  = pow( coeficient - dot(vNormal, vec3(0.0, 0.0, 1.0)), power );',
        '  gl_FragColor  = vec4( glowColor * intensity, 1.0 );',
        '}',
    ].join('\n');

    // create custom material from the shader code above
    // that is within specially labeled script tags
    var material  = new THREE.ShaderMaterial({
        uniforms: {
            coeficient: {
                type: 'f',
                value: 1.0
            },
            power: {
                type: 'f',
                value: 2
            },
            glowColor: {
                type: 'c',
                value: new THREE.Color(0xffffff)
            },
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        side: THREE.FrontSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false
    });
    return material;
}

function sonido(){
    if(audio[0].volume > 0){
        document.getElementById("iconosonido").src="../iconos/mute.gif";
        audio[0].volume = 0;
        audio[1].volume = 0;
    }
    else{
        document.getElementById("iconosonido").src="../iconos/unmute.png";
        audio[0].volume = 1;
        audio[1].volume = 1;
    }
}

function tituloIntro(font){

    uniforms = {

        amplitude: { value: 0.0 },
        opacity:   { value: 0.3 },
        color:     { value: new THREE.Color( 0xff0000 ) }

    };

    var shaderMaterial = new THREE.ShaderMaterial( {

        uniforms:       uniforms,
        vertexShader:   document.getElementById( 'vertexshader' ).textContent,
        fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
        blending:       THREE.AdditiveBlending,
        depthTest:      false,
        transparent:    true

    });


    var geometry = new THREE.TextGeometry( 'Planetaria', {

        font: font,

        size: 50,
        height: 15,
        curveSegments: 10,

        bevelThickness: 5,
        bevelSize: 1.5,
        bevelEnabled: true,
        bevelSegments: 10,

        steps: 40

    } );

    geometry.center();

    var vertices = geometry.vertices;

    var buffergeometry = new THREE.BufferGeometry();

    var position = new THREE.Float32Attribute( vertices.length * 3, 3 ).copyVector3sArray( vertices );
    buffergeometry.addAttribute( 'position', position )

    var displacement = new THREE.Float32Attribute( vertices.length * 3, 3 );
    buffergeometry.addAttribute( 'displacement', displacement );

    var customColor = new THREE.Float32Attribute( vertices.length * 3, 3 );
    buffergeometry.addAttribute( 'customColor', customColor );

    var color = new THREE.Color( 0xffffff );

    for( var i = 0, l = customColor.count; i < l; i ++ ) {

        color.setHSL( i / l, 0.5, 0.5 );
        color.toArray( customColor.array, i * customColor.itemSize );

    }

    OBJ = new THREE.Line( buffergeometry, shaderMaterial );
    OBJ.rotation.x = 1.6;

    scene.add( OBJ );
    OBJ.position.z = 1000100;
    OBJ.position.y = 300;
    camera.rotation.x = 90 * Math.PI / 180;

}

function activarMov(){
    mov1 = false;
}

function movInicial() {

    if (camera.position.y != 0) {
        camera.position.y -= 0.5;
    } else {
        scene.remove(OBJ);
    }


    if (tope < 90) {
        if (camera.position.y < 50) {
            camera.rotation.x -= 0.1 * Math.PI / 180;
            tope += 0.1;
        }
    } else {
            mov = true;
            $("#botonMenuPlanet").fadeIn(1000);
            $("#botonSonido").fadeIn(1000);
            $("#botonVolver").fadeIn(1000);
        }

}


