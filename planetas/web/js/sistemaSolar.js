/**
 * Created by Romerox3.
 */
var scene, camera, render, container, groupTierra, groupSaturno, controls;
var W,H;
var luz;
var infoPlaneta, infoPlaneta2;
var info = false;
var Tam;
var opcionRotarCamara=false, opcionRotarPlaneta=true;
var viajar = false;
var distanciax= 0, distanciaz=0;
var paso1=false, paso2=false;
var nombre;
var loader = new THREE.TextureLoader();




W=window.innerWidth;
H=window.innerHeight;


container = document.getElementById("contenedor");



camera = new THREE.PerspectiveCamera(45,W/H,1,20000000);
camera.position.z = 1000000;
camera.position.y = 0;

controls = new THREE.TrackballControls( camera );

scene = new THREE.Scene();
groupVenus = new THREE.Group();
groupTierra = new THREE.Group();
groupMarte = new THREE.Group();
groupJupiter = new THREE.Group();
groupSaturno = new THREE.Group();

//LUZ solar
luz = new THREE.PointLight(0xffffff,1.4,2000000);
luz.position.set(0,0,0);
luz.castShadow = true;
luz.shadowMapWidth = 2048;
luz.shadowMapHeight = 2048;
scene.add(luz);

var ambient = new THREE.AmbientLight(0x111111);
scene.add(ambient);

// lens flares
var textureLoader = new THREE.TextureLoader();

var textureFlare0 = textureLoader.load('../img/lensflare0.png' );
var textureFlare2 = textureLoader.load( '../img/lensflare2.png' );
var textureFlare3 = textureLoader.load( '../img/lensflare3.png' );

addLight( 0.55, 0.9, 0.5, 0,0,23500);
addLight( 0.55, 0.9, 0.5, 23500,0,0);
addLight( 0.55, 0.9, 0.5, 0,0,-23500);
addLight( 0.55, 0.9, 0.5, -23500,0,0);

//estrella
function CrearEstrellas(o, s, x, y, z, n, r){
    this.o = o;
    this.s = s;
    this.x = x;
    this.y = y;
    this.z = z;
    this.n = n;
    this.r = r;
    this.init = function(){
        var estrellasGeometry = new THREE.Geometry();
        var estrellasMaterial = new THREE.ParticleBasicMaterial({color: this.r,transparent: true, opacity:this.o, size:this.s, sizeAttenuation: false});
        var estrellas;
        var va1=50,va2=25;

        for(var i=0;i<this.n;i++){
            var vertex = new THREE.Vector3();
            vertex.x = Math.random()*va1-va2;
            vertex.y = Math.random()*va1-va2;
            vertex.z = Math.random()*va1-va2;
            vertex.multiplyScalar(5000);
            estrellasGeometry.vertices.push(vertex);
        }

        estrellas =  new THREE.ParticleSystem(estrellasGeometry,estrellasMaterial);
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
var sol;
loader.load( '../img/sol.jpg', function ( texture ) {
    var sol_geom = new THREE.SphereGeometry( 23000, 64, 32 );
    texture.anisotropy = 8;
    var sol_mat = new THREE.MeshBasicMaterial( { map: texture, emissive: 0xffffff} );
    sol = new THREE.Mesh( sol_geom, sol_mat );
    scene.add( sol );
} );

//Mercurio

var mercurio = new CrearPlanet('../img/mercurioMap.jpg',80,'../img/mercurioNormal.jpg','../img/mercurioBump.jpg').init();
scene.add(mercurio);

//Venus

var venus = new CrearPlanet('../img/venusMap.jpg',199,'../img/venusNormal.jpg','../img/venusBump.jpg').init();
groupVenus.add(venus);

var venusNubes = new CrearNubes('../img/venusNubes.png',200,0.6).init();
groupVenus.add(venusNubes);
scene.add(groupVenus);

//Earth
var earth = new CrearPlanet('../img/tierraMap.jpg',210,'../img/tierraNormal.png','../img/tierraBump.jpg').init();
groupTierra.add( earth );

var nubes;
var nubes_geom = new THREE.SphereGeometry(211,64,32);
var nubtexture = loader.load( '../img/tierraNubes.png');
var nubes_mat = new THREE.MeshPhongMaterial({map:nubtexture, transparent:true, opacity:1});
nubes = new THREE.Mesh(nubes_geom,nubes_mat);
groupTierra.add(nubes);

//Luna
var luna = new CrearPlanet('../img/lunaMap.jpg',80,'../img/lunaNormal.jpg','../img/lunaBump.jpg').init();
groupTierra.add(luna);


scene.add(groupTierra);

//Marte
var marte = new CrearPlanet('../img/marteMap.jpg', 112,'../img/marteNormal.jpg','../img/marteBump.jpg').init();
groupMarte.add(marte);
var marteNubes = new CrearNubes('../img/marteNubes.png',114,0.5).init();
groupMarte.add(marteNubes);
scene.add(groupMarte);

//Jupiter
var jupiter = new CrearPlanet('../img/jupiterMap.jpg',2361,'../img/jupiterNormal.jpg','../img/jupiterBump.jpg').init();
scene.add(jupiter);


//Saturno
var saturno = new CrearPlanet('../img/saturnoMap.jpg',1990,'../img/saturnoNormal.jpg','../img/saturnoBump.jpg').init();
groupSaturno.add(saturno);

var nubesSaturno;
var nubesSaturno_geom = new THREE.SphereGeometry(2000,64,32);
var nubSaturnotexture = loader.load('../img/nubesSaturno.png');
var nubesSaturno_mat = new THREE.MeshPhongMaterial({map:nubSaturnotexture, transparent:true, opacity:0.6});
nubesSaturno = new THREE.Mesh(nubesSaturno_geom,nubesSaturno_mat);
groupSaturno.add(nubesSaturno);

var ani1 = CrearAnillo(80,0xB9AB8E,1);
var ani2 = CrearAnillo(150,0xB9AB8E,1.5);
var ani3 = CrearAnillo(350,0xB9AB8E,2);

groupSaturno.add(ani1);
groupSaturno.add(ani2);
groupSaturno.add(ani3);
scene.add(groupSaturno);

//Urano
var urano = new CrearPlanet('../img/uranoMap.jpg',844,'../img/uranoNormal.jpg','../img/uranoBump.jpg').init();
scene.add(urano);


//Neptuno
var neptuno = new CrearPlanet('../img/neptunoMap.jpg',818,'../img/neptunoNormal.jpg','../img/neptunoBump.jpg').init();
scene.add(neptuno);



render = new THREE.WebGLRenderer({ alpha: true });
render.setSize(W,H);
container.appendChild(render.domElement);
var t= 0,t2=0;
var y=0;
/*document.addEventListener('click', function(){
 document.addEventListener('mousemove',function(event){
 y = parseInt(event.offsetY);

 });
 });*/


var mouseX=0, mouseY=0;

document.addEventListener( 'mousemove', function ( event ) {
    mouseX = parseInt( event.offsetX);
    mouseY = parseInt( event.offsetY);
});
//

animate();

function animate(){
    requestAnimationFrame(animate);

    //controls.update(0.05);

    luna.position.x = Math.sin(t * 0.8) * 1000;
    luna.position.y = Math.sin(t * 0.8) * 1000;
    luna.position.z = Math.cos(t * 0.8) * 1000;

    if(!info){
        t+=Math.PI/180*2*0.1;
        //Movimiento y Posicion Planetas (0.1=velocidad 1000=posicion)
        mercurio.position.x = Math.sin(t * 0.3) * 40000*2;
        mercurio.position.z = Math.cos(t * 0.3) * 40000*2;

        groupTierra.position.x = Math.sin(t * 0.1) * 150000*2;
        groupTierra.position.z = Math.cos(t * 0.1) * 150000*2;

        groupVenus.position.x = Math.sin(t * 0.2) * 85000*2;
        groupVenus.position.z = Math.cos(t * 0.2) * 85000*2;

        groupMarte.position.x = Math.sin(t * 0.08) * 250000*2;
        groupMarte.position.z = Math.cos(t * 0.08) * 250000*2;

        jupiter.position.x = Math.sin(t * 0.06) * (-370000)*2;
        jupiter.position.z = Math.cos(t * 0.06) * (-370000)*2;

        groupSaturno.position.x = Math.sin(t * 0.04) * 450000*2;
        groupSaturno.position.z = Math.cos(t * 0.04) * 450000*2;

        urano.position.x = Math.sin(t * 0.02) * 600000*2;
        urano.position.z = Math.cos(t * 0.02) * 600000*2;

        neptuno.position.x = Math.sin(t * 0.01) * 900000*2;
        neptuno.position.z = Math.cos(t * 0.01) * 900000*2;
    }

    if(viajar) {
        var signo = infoPlaneta.position.z/infoPlaneta.position.z;
        camera.lookAt(infoPlaneta.position);
        if (camera.position.z != infoPlaneta.position.z) {
            if (!((camera.position.z > infoPlaneta.position.z - (Tam+Tam*2)) && (camera.position.z < infoPlaneta.position.z + (Tam+Tam*2)))) {
                camera.position.z -= distanciaz / 100;
                distanciaz = camera.position.z - infoPlaneta.position.z;
                paso1=false;
            }
            else{
                paso1=true;
            }
        }
        if (camera.position.x != infoPlaneta.position.x) {
            if (!(camera.position.x > infoPlaneta.position.x - (Tam+Tam*2) && camera.position.x < infoPlaneta.position.x + (Tam+Tam*2))) {
                camera.position.x -= distanciax / 100;
                distanciax = camera.position.x - infoPlaneta.position.x;
                paso2=false;
            }
            else{
                paso2=true;
            }
        }
        infoPlaneta2=infoPlaneta;
    }

    if(paso1 && paso2){
        $("#pNombrePlaneta").show();
    }
    else{
        $("#pNombrePlaneta").hide();
    }

    if(opcionRotarCamara){
        controls.target = infoPlaneta.position;
        controls.update();
        camera.lookAt(infoPlaneta.position);
        viajar=false;
    }


    if(opcionRotarPlaneta){
        //Rotacion Planetas
        sol.rotation.y+=0.01;

        mercurio.rotation.y+=0.01;

        venus.rotation.y+=0.001;
        venusNubes.rotation.y+=0.0015;

        earth.rotation.y+=0.001;
        nubes.rotation.y+=0.0015;

        marte.rotation.y+=0.001;
        marteNubes.rotation.y+=0.0015;

        jupiter.rotation.y+=0.01;

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




    render.render(scene,camera);


}


function showInfo(num){
    switch (num){
        case 1:
            infoPlaneta = mercurio;
            info=true;
            viajar = true;
            opcionRotarCamara=false;
            Tam = 80;
            $("#pNombrePlaneta").text("Mercurio");
            break;
        case 2:
            infoPlaneta = groupVenus;
            info = true;
            viajar = true;
            opcionRotarCamara=false;
            Tam = 199;
            $("#pNombrePlaneta").text("Venus");
            break;
        case 3:
            infoPlaneta = groupTierra;
            info=true;
            viajar = true;
            opcionRotarCamara=false;
            Tam = 210;
            $("#pNombrePlaneta").text("La Tierra");
            break;
        case 4:
            infoPlaneta = groupMarte;
            info=true;
            viajar = true;
            opcionRotarCamara=false;
            Tam = 112;
            $("#pNombrePlaneta").text("Marte");
            break;
        case 5:
            infoPlaneta = jupiter;
            info=true;
            viajar = true;
            opcionRotarCamara=false;
            Tam = 2361;
            $("#pNombrePlaneta").text("Jupiter");
            break;
        case 6:
            infoPlaneta = groupSaturno;
            info=true;
            viajar = true;
            opcionRotarCamara=false;
            Tam = 1990;
            $("#pNombrePlaneta").text("Saturno");
            break;
        case 7:
            infoPlaneta = urano;
            info=true;
            viajar = true;
            opcionRotarCamara=false;
            Tam = 844;
            $("#pNombrePlaneta").text("Urano");
            break;

        case 8:
            infoPlaneta = neptuno;
            info=true;
            viajar = true;
            opcionRotarCamara=false;
            Tam = 818;
            $("#pNombrePlaneta").text("Neptuno");
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


    for (f = 0; f < fl; f++) {

        flare = object.lensFlares[f];

        flare.x = object.positionScreen.x + vecX * flare.distance;
        flare.y = object.positionScreen.y + vecY * flare.distance;

        flare.rotation = 0;

    }

    object.lensFlares[2].y += 0.025;
    object.lensFlares[3].rotation = object.positionScreen.x * 0.5 + THREE.Math.degToRad(45);
}