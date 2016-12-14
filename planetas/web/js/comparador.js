/**
 * Created by romero on 29/06/16.
 */

var scene, camera, render, container, controls;
var W,H;
var luz;
var info = false;
var Tam=0, Tam2=0;
var loader = new THREE.TextureLoader();




W=window.innerWidth;
H=window.innerHeight;


container = document.getElementById("contenedor");


camera = new THREE.PerspectiveCamera(45,W/H,1,20000000);
camera.position.z = 10000;
camera.position.y = 0;

controls = new THREE.TrackballControls( camera );

scene = new THREE.Scene();
var groupVenus = new THREE.Group();
var groupTierra = new THREE.Group();
var groupMarte = new THREE.Group();
var groupJupiter = new THREE.Group();
var groupSaturno = new THREE.Group();
var groupVenus2 = new THREE.Group();
var groupTierra2 = new THREE.Group();
var groupMarte2 = new THREE.Group();
var groupJupiter2 = new THREE.Group();
var groupSaturno2 = new THREE.Group();


//LUZ solar
luz = new THREE.PointLight(0xffffff,1.4,2000000);
luz.position.set(-10000,0,10000);
luz.castShadow = true;
luz.shadowMapWidth = 2048;
luz.shadowMapHeight = 2048;
scene.add(luz);

var ambient = new THREE.AmbientLight(0x111111);
scene.add(ambient);

// lens flares
var textureLoader = new THREE.TextureLoader();

var a=0.2, b=0.2, c=0.5;

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

//LADO DERECHO ---------------------------------------------------------------------------------

var mercurio = new CrearPlanet('../img/mercurioMap.jpg',80,'../img/mercurioNormal.jpg','../img/mercurioBump.jpg').init();
var mercurio2 = new CrearPlanet('../img/mercurioMap.jpg',80,'../img/mercurioNormal.jpg','../img/mercurioBump.jpg').init();
scene.add(mercurio);
scene.add(mercurio2);

//Venus

var venus = new CrearPlanet('../img/venusMap.jpg',199,'../img/venusNormal.jpg','../img/venusBump.jpg').init();
var venus2 = new CrearPlanet('../img/venusMap.jpg',199,'../img/venusNormal.jpg','../img/venusBump.jpg').init();
groupVenus.add(venus);
groupVenus2.add(venus2);

var venusNubes = new CrearNubes('../img/venusNubes.png',200,0.6).init();
var venusNubes2 = new CrearNubes('../img/venusNubes.png',200,0.6).init();
groupVenus.add(venusNubes);
groupVenus2.add(venusNubes2);
scene.add(groupVenus);
scene.add(groupVenus2);

//Earth
var earth = new CrearPlanet('../img/tierraMap.jpg',210,'../img/tierraNormal.png','../img/tierraBump.jpg').init();
var earth2 = new CrearPlanet('../img/tierraMap.jpg',210,'../img/tierraNormal.png','../img/tierraBump.jpg').init();
groupTierra.add( earth );
groupTierra2.add( earth2 );

var nubes;
var nubes_geom = new THREE.SphereGeometry(211,64,32);
var nubtexture = loader.load(('../img/tierraNubes.png'));
var nubes_mat = new THREE.MeshPhongMaterial({map:nubtexture, transparent:true, opacity:1});
nubes = new THREE.Mesh(nubes_geom,nubes_mat);
groupTierra.add(nubes);
var nubes2;
var nubes_geom2 = new THREE.SphereGeometry(211,64,32);
var nubtexture2 = loader.load(('../img/tierraNubes.png'));
var nubes_mat2 = new THREE.MeshPhongMaterial({map:nubtexture2, transparent:true, opacity:1});
nubes2 = new THREE.Mesh(nubes_geom2,nubes_mat2);
groupTierra2.add(nubes2);


//Luna
var luna = new CrearPlanet('../img/lunaMap.jpg',80,'../img/lunaNormal.jpg','../img/lunaBump.jpg').init();
var luna2 = new CrearPlanet('../img/lunaMap.jpg',80,'../img/lunaNormal.jpg','../img/lunaBump.jpg').init();
groupTierra.add(luna);
groupTierra2.add(luna2);


scene.add(groupTierra);
scene.add(groupTierra2);


//Marte
var marte = new CrearPlanet('../img/marteMap.jpg', 112,'../img/marteNormal.jpg','../img/marteBump.jpg').init();
var marte2 = new CrearPlanet('../img/marteMap.jpg', 112,'../img/marteNormal.jpg','../img/marteBump.jpg').init();
groupMarte.add(marte);
groupMarte2.add(marte2);
var marteNubes = new CrearNubes('../img/marteNubes.png',114,0.5).init();
var marteNubes2 = new CrearNubes('../img/marteNubes.png',114,0.5).init();
groupMarte.add(marteNubes);
groupMarte2.add(marteNubes2);
scene.add(groupMarte);
scene.add(groupMarte2);

//Jupiter
var jupiter = new CrearPlanet('../img/jupiterMap.jpg',2361,'../img/jupiterNormal.jpg','../img/jupiterBump.jpg').init();
var jupiter2 = new CrearPlanet('../img/jupiterMap.jpg',2361,'../img/jupiterNormal.jpg','../img/jupiterBump.jpg').init();
groupJupiter.add(jupiter);
groupJupiter2.add(jupiter2);
var jupiterNubes = new CrearNubes('../img/jupiterNubes.png',2370,0.5).init();
var jupiterNubes2 = new CrearNubes('../img/jupiterNubes.png',2370,0.5).init();

var customMaterial = new THREE.ShaderMaterial(
    {
        uniforms: {  },
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true
    }   );

var ballGeometry = new THREE.SphereGeometry( 2410, 64, 32 );
var ball = new THREE.Mesh( ballGeometry, customMaterial );
groupJupiter.add( ball );

groupJupiter.add(jupiterNubes);
scene.add(groupJupiter);
groupJupiter2.add(jupiterNubes2);
scene.add(groupJupiter2);


//Saturno
var saturno = new CrearPlanet('../img/saturnoMap.jpg',1990,'../img/saturnoNormal.jpg','../img/saturnoBump.jpg').init();
var saturno2 = new CrearPlanet('../img/saturnoMap.jpg',1990,'../img/saturnoNormal.jpg','../img/saturnoBump.jpg').init();
groupSaturno.add(saturno);
groupSaturno2.add(saturno2);

var nubesSaturno = new CrearNubes('../img/nubesSaturno.png',1999,0.5).init();
var nubesSaturno2 = new CrearNubes('../img/nubesSaturno.png',1999,0.5).init();
groupSaturno.add(nubesSaturno);
groupSaturno2.add(nubesSaturno2);

var ani1 = CrearAnillo(80,0xB9AB8E,1);
var ani2 = CrearAnillo(150,0xB9AB8E,1.5);
var ani3 = CrearAnillo(350,0xB9AB8E,2);
var ani11 = CrearAnillo(80,0xB9AB8E,1);
var ani22 = CrearAnillo(150,0xB9AB8E,1.5);
var ani33 = CrearAnillo(350,0xB9AB8E,2);

groupSaturno.add(ani1);
groupSaturno.add(ani2);
groupSaturno.add(ani3);
groupSaturno2.add(ani11);
groupSaturno2.add(ani22);
groupSaturno2.add(ani33);
scene.add(groupSaturno);
scene.add(groupSaturno2);

//Urano
var urano = new CrearPlanet('../img/uranoMap.jpg',844,'../img/uranoNormal.jpg','../img/uranoBump.jpg').init();
var urano2 = new CrearPlanet('../img/uranoMap.jpg',844,'../img/uranoNormal.jpg','../img/uranoBump.jpg').init();
scene.add(urano);
scene.add(urano2);


//Neptuno
var neptuno = new CrearPlanet('../img/neptunoMap.jpg',818,'../img/neptunoNormal.jpg','../img/neptunoBump.jpg').init();
var neptuno2 = new CrearPlanet('../img/neptunoMap.jpg',818,'../img/neptunoNormal.jpg','../img/neptunoBump.jpg').init();
scene.add(neptuno);
scene.add(neptuno2);

render = new THREE.WebGLRenderer({ alpha: true });
render.setSize(W,H);
container.appendChild(render.domElement);
var t= 0,t2=0;
var y=0;

clearPosition();
clearPosition2();
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

    rotar();
    rotar2();

    if(Tam!=0 || Tam2!=0) {
        if (Tam != Tam2) {
            if(camera.position.x<((-Tam*2)+(Tam2*2))/2){
                camera.position.x += 3;
            }
            if(camera.position.x>((-Tam*2)+(Tam2*2))/2){
                camera.position.x -= 3;
            }
            if (Tam > Tam2) {
                if(camera.position.z != Tam * 4){
                   if(camera.position.z<Tam * 4){
                    camera.position.z+=10;
                   }
                    if(camera.position.z>Tam * 4){
                        camera.position.z-=10;
                    }
                }
            }
            else {
                if(camera.position.z != Tam2 * 4) {
                    if (camera.position.z < Tam2 * 4) {
                        camera.position.z += 10;
                    }
                    if (camera.position.z > Tam2 * 4) {
                        camera.position.z -= 10;
                    }
                }
            }
        } else {
            if (camera.position.z < Tam * 5) {
                camera.position.z += 10;
                camera.position.x = 0;
            }
            if (camera.position.z > Tam * 5) {
                camera.position.z -= 10;
                camera.position.x = 0;
            }
        }
    }
    else{
        camera.position.z = 3000 ;
    }



    render.render(scene,camera);
    //controls.update(0.05);

}

function clearPosition(){
    mercurio.position.x=100000;
    groupVenus.position.x=100000;
    groupTierra.position.x=100000;
    groupMarte.position.x=100000;
    groupJupiter.position.x=100000;
    groupSaturno.position.x=100000;
    urano.position.x=100000;
    neptuno.position.x=100000;
}

function clearPosition2(){
    mercurio2.position.x=100000;
    groupVenus2.position.x=100000;
    groupTierra2.position.x=100000;
    groupMarte2.position.x=100000;
    groupJupiter2.position.x=100000;
    groupSaturno2.position.x=100000;
    urano2.position.x=100000;
    neptuno2.position.x=100000;
}

function rotar(){
    mercurio.rotation.y+=0.01;

    venus.rotation.y+=0.001;
    venusNubes.rotation.y+=0.0012;

    earth.rotation.y+=0.001;
    nubes.rotation.y+=0.0012;

    marte.rotation.y+=0.001;
    marteNubes.rotation.y+=0.0012;

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

function rotar2(){
    mercurio2.rotation.y+=0.01;

    venus2.rotation.y+=0.001;
    venusNubes2.rotation.y+=0.0012;

    earth2.rotation.y+=0.001;
    nubes2.rotation.y+=0.0012;

    marte2.rotation.y+=0.001;
    marteNubes2.rotation.y+=0.0012;

    jupiter2.rotation.y+=0.01;
    jupiterNubes2.rotation.y+=0.015;

    groupSaturno2.rotation.z=25;
    saturno2.rotation.y+=0.001;
    nubesSaturno2.rotation.y+=0.015;

    ani11.rotation.y+=0.009;
    ani22.rotation.y+=0.007;
    ani33.rotation.y+=0.005;

    urano2.rotation.y+=0.01;

    neptuno2.rotation.y+=0.01;
}

function seleccion1(num){
    switch (num){
        case 1:
            clearPosition();
            Tam=80;
            mercurio.position.z=0;
            mercurio.position.x=-Tam*2;
            break;
        case 2:
            clearPosition();
            Tam=200;
            groupVenus.position.z=0;
            groupVenus.position.x=-Tam*2;
            break;
        case 3:
            clearPosition();
            Tam=211;
            groupTierra.position.z=0;
            groupTierra.position.x=-Tam*2;
            break;
        case 4:
            clearPosition();
            Tam=114;
            groupMarte.position.z=0;
            groupMarte.position.x=-Tam*2;
            break;
        case 5:
            clearPosition();
            Tam=2370;
            groupJupiter.position.z=0;
            groupJupiter.position.x=-Tam*2;
            break;
        case 6:
            clearPosition();
            Tam=3000;
            groupSaturno.position.z=0;
            groupSaturno.position.x=-Tam*2;
            break;
        case 7:
            clearPosition();
            Tam=844;
            urano.position.z=0;
            urano.position.x=-Tam*2;
            break;
        case 8:
            clearPosition();
            Tam=818;
            neptuno.position.z=0;
            neptuno.position.x=-Tam*2;
            break;

    }
}

function seleccion2(num){
    switch (num){
        case 1:
            clearPosition2();
            Tam2=80;
            mercurio2.position.z=0;
            mercurio2.position.x=Tam2*2;
            break;
        case 2:
            clearPosition2();
            Tam2=200;
            groupVenus2.position.z=0;
            groupVenus2.position.x=Tam2*2;
            break;
        case 3:
            clearPosition2();
            Tam2=211;
            groupTierra2.position.z=0;
            groupTierra2.position.x=Tam2*2;
            break;
        case 4:
            clearPosition2();
            Tam2=114;
            groupMarte2.position.z=0;
            groupMarte2.position.x=Tam2*2;
            break;
        case 5:
            clearPosition2();
            Tam2=2370;
            groupJupiter2.position.z=0;
            groupJupiter2.position.x=Tam2*2;
            break;
        case 6:
            clearPosition2();
            Tam2=3000;
            groupSaturno2.position.z=0;
            groupSaturno2.position.x=Tam2*2;
            break;
        case 7:
            clearPosition2();
            Tam2=844;
            urano2.position.z=0;
            urano2.position.x=Tam2*2;
            break;
        case 8:
            clearPosition2();
            Tam2=818;
            neptuno2.position.z=0;
            neptuno2.position.x=Tam2*2;
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
        vertex.y = Math.random()*50;
        vertex.z = Math.cos(180/Math.PI*i)*(4758-i/k);
        anillo_saturno_geom.vertices.push(vertex);
    }

    var anillo = new THREE.ParticleSystem(anillo_saturno_geom,anillo_saturno_mat);
    anillo.castShadow = true;

    return anillo;
}

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



