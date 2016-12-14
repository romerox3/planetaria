       /* var renderer, scene, camera, stats;

        var object = [], object2 = [], uniforms;

        var loader = new THREE.FontLoader();
        loader.load( '../font/interplanetary/interplanetary_Regular.json', function ( font ) {

        init( font);
        animate();

    } );

        function crearLetra(font, letra){

            var OBJ;

            uniforms = {

                amplitude: { value: 5.0 },
                opacity:   { value: 0.3 },
                color:     { value: new THREE.Color( 0x00FF00 ) }

            };

            var shaderMaterial = new THREE.ShaderMaterial( {

                uniforms:       uniforms,
                vertexShader:   document.getElementById( 'vertexshader' ).textContent,
                fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
                blending:       THREE.AdditiveBlending,
                depthTest:      false,
                transparent:    true

            });


            var geometry = new THREE.TextGeometry( letra, {

                font: font,

                size: 30,
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
            return OBJ;

        }

        function init( font ) {

        camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 10000 );
        camera.position.z = 1500;
            camera.position.x = 850;
            camera.position.y = -400;

        scene = new THREE.Scene();

            for(var i = 0; i<153;i++) {
                var aleatorio = Math.round(Math.random()*(122-97)+parseInt(97));
                var letra = String.fromCharCode(aleatorio);
                object[i] = crearLetra(font, letra);


            }
            for (var p = 0,j=0,k=0; p < object.length; p++,j++) {
                if(j==17){
                    j=0;
                    k+=1;
                }
                scene.add(object[p]);
                object[p].position.x += j * 100;
                object[p].position.y -= k * 100;

            }

        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setClearColor( 0x050505 );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );

        var container = document.getElementById( 'container' );
        container.appendChild( renderer.domElement );

        stats = new Stats();
        container.appendChild( stats.dom );

        //

        window.addEventListener( 'resize', onWindowResize, false );

    }

        function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

    }

        function animate() {

        requestAnimationFrame( animate );

            for (var p = 0,k=0; p < object.length; p++,k++) {
                if(k>17){
                    k=0;
                }
                if(k<8)
                object[p].rotation.z += 0.1;
                else
                    object[p].rotation.z -= 0.1;

            }

        render();
        stats.update();

    }

        function render() {

        renderer.render( scene, camera );

    }*/

       THREE.VolumetericLightShader = {
           uniforms: {
               tDiffuse: {value:null},
               lightPosition: {value: new THREE.Vector2(0.5, 0.5)},
               exposure: {value: 0.18},
               decay: {value: 0.95},
               density: {value: 0.8},
               weight: {value: 0.4},
               samples: {value: 50}
           },

           vertexShader: [
               "varying vec2 vUv;",
               "void main() {",
               "vUv = uv;",
               "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
               "}"
           ].join("\n"),

           fragmentShader: [
               "varying vec2 vUv;",
               "uniform sampler2D tDiffuse;",
               "uniform vec2 lightPosition;",
               "uniform float exposure;",
               "uniform float decay;",
               "uniform float density;",
               "uniform float weight;",
               "uniform int samples;",
               "const int MAX_SAMPLES = 100;",
               "void main()",
               "{",
               "vec2 texCoord = vUv;",
               "vec2 deltaTextCoord = texCoord - lightPosition;",
               "deltaTextCoord *= 1.0 / float(samples) * density;",
               "vec4 color = texture2D(tDiffuse, texCoord);",
               "float illuminationDecay = 1.0;",
               "for(int i=0; i < MAX_SAMPLES; i++)",
               "{",
               "if(i == samples){",
               "break;",
               "}",
               "texCoord -= deltaTextCoord;",
               "vec4 sample = texture2D(tDiffuse, texCoord);",
               "sample *= illuminationDecay * weight;",
               "color += sample;",
               "illuminationDecay *= decay;",
               "}",
               "gl_FragColor = color * exposure;",
               "}"
           ].join("\n")
       };

       THREE.AdditiveBlendingShader = {
           uniforms: {
               tDiffuse: { value:null },
               tAdd: { value:null }
           },

           vertexShader: [
               "varying vec2 vUv;",
               "void main() {",
               "vUv = uv;",
               "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
               "}"
           ].join("\n"),

           fragmentShader: [
               "uniform sampler2D tDiffuse;",
               "uniform sampler2D tAdd;",
               "varying vec2 vUv;",
               "void main() {",
               "vec4 color = texture2D( tDiffuse, vUv );",
               "vec4 add = texture2D( tAdd, vUv );",
               "gl_FragColor = color + add;",
               "}"
           ].join("\n")
       };

       THREE.PassThroughShader = {
           uniforms: {
               tDiffuse: { value: null }
           },

           vertexShader: [
               "varying vec2 vUv;",
               "void main() {",
               "vUv = uv;",
               "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
               "}"
           ].join( "\n" ),

           fragmentShader: [
               "uniform sampler2D tDiffuse;",
               "varying vec2 vUv;",
               "void main() {",
               "gl_FragColor = texture2D( tDiffuse, vec2( vUv.x, vUv.y ) );",
               "}"
           ].join( "\n" )
       };

       (function(){
           var scene, camera, renderer, composer, box, pointLight,
               occlusionComposer, occlusionRenderTarget, occlusionBox, lightSphere,
               volumetericLightShaderUniforms,
               DEFAULT_LAYER = 0,
               OCCLUSION_LAYER = 1,
               renderScale = 0.5,
               angle = 0,
               gui = new dat.GUI();

           scene = new THREE.Scene();
           camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
           renderer = new THREE.WebGLRenderer();
           renderer.setPixelRatio( window.devicePixelRatio );
           renderer.setSize( window.innerWidth, window.innerHeight );
           document.body.appendChild( renderer.domElement );

           function setupScene(){
               var ambientLight,
                   geometry,
                   material;

               ambientLight = new THREE.AmbientLight(0x2c3e50);
               scene.add(ambientLight);

               pointLight = new THREE.PointLight(0xffffff);
               scene.add(pointLight);

               geometry = new THREE.SphereBufferGeometry( 1, 16, 16 );
               material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
               lightSphere = new THREE.Mesh( geometry, material );
               lightSphere.layers.set( OCCLUSION_LAYER );
               scene.add( lightSphere );

               geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
               material = new THREE.MeshPhongMaterial( { color: 0xe74c3c } );
               box = new THREE.Mesh( geometry, material );
               box.position.z = 2;
               scene.add( box );

               material = new THREE.MeshBasicMaterial( { color:0x000000 } );
               occlusionBox = new THREE.Mesh( geometry, material);
               occlusionBox.position.z = 2;
               occlusionBox.layers.set( OCCLUSION_LAYER );
               scene.add( occlusionBox );

               camera.position.z = 6;
           }

           function setupPostprocessing(){
               var pass;

               occlusionRenderTarget = new THREE.WebGLRenderTarget( window.innerWidth * renderScale, window.innerHeight * renderScale );
               occlusionComposer = new THREE.EffectComposer( renderer, occlusionRenderTarget);
               occlusionComposer.addPass( new THREE.RenderPass( scene, camera ) );
               pass = new THREE.ShaderPass( THREE.VolumetericLightShader );
               pass.needsSwap = false;
               occlusionComposer.addPass( pass );

               volumetericLightShaderUniforms = pass.uniforms;

               composer = new THREE.EffectComposer( renderer );
               composer.addPass( new THREE.RenderPass( scene, camera ) );
               pass = new THREE.ShaderPass( THREE.AdditiveBlendingShader );
               pass.uniforms.tAdd.value = occlusionRenderTarget.texture;
               composer.addPass( pass );
               pass.renderToScreen = true;
           }

           function onFrame(){
               requestAnimationFrame( onFrame );
               update();
               render();
           }

           function update(){
               var radius = 2.5,
                   xpos = Math.sin(angle) * radius,
                   zpos = Math.cos(angle) * radius;

               box.position.set( xpos, 0, zpos);
               box.rotation.x += 0.01;
               box.rotation.y += 0.01;

               occlusionBox.position.copy(box.position);
               occlusionBox.rotation.copy(box.rotation);

               angle += 0.02;
           }

           function render(){
               camera.layers.set(OCCLUSION_LAYER);
               renderer.setClearColor(0x000000);
               occlusionComposer.render();

               camera.layers.set(DEFAULT_LAYER);
               renderer.setClearColor(0x090611);
               composer.render();
           }

           function setupGUI(){
               var folder,
                   min,
                   max,
                   step,
                   updateShaderLight = function(){
                       var p = lightSphere.position.clone(),
                           vector = p.project(camera),
                           x = ( vector.x + 1 ) / 2,
                           y = ( vector.y + 1 ) / 2;
                       volumetericLightShaderUniforms.lightPosition.value.set(x, y);
                       pointLight.position.copy(lightSphere.position);
                   };

               folder = gui.addFolder('Light Position');
               folder.add(lightSphere.position, 'x').min(-10).max(10).step(0.1).onChange(updateShaderLight);
               folder.add(lightSphere.position, 'y').min(-10).max(10).step(0.1).onChange(updateShaderLight);
               folder.add(lightSphere.position, 'z').min(-10).max(10).step(0.1).onChange(updateShaderLight);
               folder.open();

               folder = gui.addFolder('Volumeteric Light Shader');
               Object.keys(volumetericLightShaderUniforms).forEach(function(key) {
                   if(key !==  'tDiffuse' && key != 'lightPosition' ){
                       prop = volumetericLightShaderUniforms[key];

                       switch ( key ) {
                           case 'exposure':
                               min = 0;
                               max = 1;
                               step = 0.01;
                               break;
                           case 'decay':
                               min = 0.8;
                               max = 1;
                               step = 0.001;
                               break;
                           case 'density':
                               min = 0;
                               max = 1;
                               step = 0.01;
                               break;
                           case 'weight':
                               min = 0;
                               max = 1;
                               step = 0.01;
                               break;
                           case 'samples':
                               min = 1;
                               max = 100;
                               step = 1.0;
                               break;
                       }

                       folder.add(prop, 'value').min(min).max(max).step(step).name(key);
                   }
               });
               folder.open();

           }

           function addRenderTargetImage(){
               var material,
                   mesh,
                   folder;

               material = new THREE.ShaderMaterial( THREE.PassThroughShader );
               material.uniforms.tDiffuse.value = occlusionRenderTarget.texture;

               mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2, 2 ), material );
               composer.passes[1].scene.add( mesh );
               mesh.visible = false;

               folder = gui.addFolder('Light Pass Render Image');
               folder.add(mesh, 'visible');
               folder.add({scale:0.5}, 'scale', { Full: 1, Half: 0.5, Quarter: 0.25 })
                   .onChange(function(value) {
                       renderScale = value;
                       window.dispatchEvent(new Event('resize'));
                   });
               folder.open();

           }

           window.addEventListener( 'resize', function(){

               camera.aspect = window.innerWidth / window.innerHeight;
               camera.updateProjectionMatrix();

               renderer.setSize( window.innerWidth, window.innerHeight );

               var pixelRatio = renderer.getPixelRatio(),
                   newWidth  = Math.floor( window.innerWidth / pixelRatio ) || 1,
                   newHeight = Math.floor( window.innerHeight / pixelRatio ) || 1;

               composer.setSize( newWidth, newHeight );
               occlusionComposer.setSize( newWidth * renderScale, newHeight * renderScale );

           }, false );

           setupScene();
           setupPostprocessing();
           setupGUI();
           addRenderTargetImage();
           onFrame();
       }())
