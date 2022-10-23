"use strict";

const main = function () {
//engine variables
    let time = 0;
    let marsRotate = true;
    let marsRotation = 0;
    let maxAnisotropy;
    let anisotropicFilter;
    let textureLoader;
    let manager;
    let textManager;

//trinity of holy objects
    let scene;
    let camera;
    let renderer;

//camera controls
    let controls;

//geometry
    let oldVM = 0;
    let textGeometry;
    let loadingGroup;
    let geomSegBar = new THREE.BoxGeometry(0.98, 0.2, 0.1);
    let geomBar = new THREE.BoxGeometry(5, 0.05, 0.1);

//mesh objects
    let mars;
    let skybox;

//materials
    let matMars;
    let matWhite = new THREE.MeshBasicMaterial({color: 0xffffff});
    let matMetal = new THREE.MeshStandardMaterial({color: 0xaaaaaa});

    init();
    loadingScene();
    initGUI();
    //animate is called through the loading manager

    function init() {
        //depicting of the genesis
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.001, 200);
        camera.position.z = 4.5;

        renderer = new THREE.WebGLRenderer();
        maxAnisotropy = renderer.capabilities.getMaxAnisotropy(); //Anisotropic filtering, setting to the max possible
        anisotropicFilter = maxAnisotropy;
        if (anisotropicFilter > 8) anisotropicFilter = 8;
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        controls = new THREE.OrbitControls( camera );

        //manager
        manager = new THREE.LoadingManager();
        textManager = new THREE.LoadingManager();

        //images and textures
        textureLoader = new THREE.TextureLoader(manager);

        //loadingscreen items
        loadingGroup = new THREE.Group();
        scene.add(loadingGroup);

        loadingScreen( 0 );
    }

    function loadingScreen( stage ) {
        switch (stage) {
            case 0:{
                const loadingBar = new THREE.Mesh(geomBar, matMetal);
                loadingBar.position.x = 0;
                loadingBar.position.y = -0.15;
                loadingBar.position.z = 1.2;
                loadingGroup.add( loadingBar );
                renderer.render(scene, camera);
                const loader = new THREE.FontLoader(textManager);
                loader.load( "CyberspaceRacewayBack.json", function ( font ) {
                    textGeometry = new THREE.TextGeometry( "LOADING...", {
                        font: font,
                        size: 0.4,
                        height: 0.15,
                        curveSegments: 12
                    } );
                } );
                textManager.onLoad = function ( ) {
                    const loadingText = new THREE.Mesh(textGeometry, matMetal);
                    loadingText.position.x = -2;
                    loadingText.position.y = 0.3;
                    loadingText.position.z = 1;
                    const loadingBlock1 = new THREE.Mesh(geomSegBar, matMetal);
                    loadingBlock1.position.x = -2;
                    loadingBlock1.position.z = 1.2;
                    loadingGroup.add( loadingText );
                    loadingGroup.add( loadingBlock1 );
                    renderer.render(scene, camera);
                };
            } break;
            case 1:{
                const loadingBlock2 = new THREE.Mesh(geomSegBar, matMetal);
                loadingBlock2.position.x = -1;
                loadingBlock2.position.z = 1.2;
                loadingGroup.add( loadingBlock2 );
            } break;
            case 2:{
                const loadingBlock3 = new THREE.Mesh(geomSegBar, matMetal);
                loadingBlock3.position.x = 0;
                loadingBlock3.position.z = 1.2;
                loadingGroup.add( loadingBlock3 );
            } break;
            case 3:{
                const loadingBlock4 = new THREE.Mesh(geomSegBar, matMetal);
                loadingBlock4.position.x = 1;
                loadingBlock4.position.z = 1.2;
                loadingGroup.add( loadingBlock4 );
            } break;
            case 4:{
                scene.remove(loadingGroup);
                loadingGroup = null;
                textGeometry.dispose();
                textGeometry = null;
                geomBar.dispose();
                geomBar = null;
                geomSegBar.dispose();
                geomSegBar = null;
                matMetal.dispose();
                matMetal = null;
                matWhite.dispose();
                matWhite = null;
            } break;
            default: {
                console.log("Loading Switch Case hit an exception!");
            }
        }
        renderer.render(scene, camera);
    }

    function loadingScene() {
        const colorMapMars = textureLoader.load("maps/mars/mars.jpg");
        colorMapMars.anisotropy = anisotropicFilter;
        const normalMapMars = textureLoader.load("maps/mars/Blended_NRM.png");
        // TODO load small first then large, for each textures.
        // var normalMapMars = textureLoader.load("maps/mars/Blended_small_NRM.png");
        normalMapMars.anisotropy = anisotropicFilter;
        const displacementMapMars = textureLoader.load("maps/mars/Blended_DISP.jpg");
        displacementMapMars.anisotropy = anisotropicFilter;
        const colorMapSkybox = textureLoader.load("maps/milkyway.jpg");
        colorMapSkybox.anisotropy = anisotropicFilter;

        matMars = new THREE.MeshPhongMaterial({  //Standard work also
            color: 0xaaaaaa,
            specular: 0x000000,
            shininess: 0,
            map: colorMapMars,
            normalMap: normalMapMars,
            displacementMap: displacementMapMars
        });

    //Skybox
        const geomSkybox = new THREE.SphereGeometry (10,24,16)
        const matSkybox = new THREE.MeshBasicMaterial({
            map: colorMapSkybox,
            side: THREE.BackSide
        });
        skybox = new THREE.Mesh(geomSkybox, matSkybox);
        skybox.material.depthWrite = false;
        skybox.renderOrder = -999;
        scene.add(skybox);

    //light
        renderer.toneMappingExposure = 2; //affect exposure
        const sunlight = new THREE.PointLight( 0xffffff, 5, 200, 2 );
        sunlight.position.x=75;
        sunlight.position.z=50;
        scene.add( sunlight );

    //Event called on window resizing
        window.addEventListener( "resize", onWindowResize, false );

        manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
            console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
            loadingScreen( itemsLoaded );
       };

        manager.onLoad = function ( ) {
           console.log("Finished");
           animate();
        };
    }

    function animate() {
        controls.update();
        time += 1;

        if (marsRotate) {
            marsRotation += 0.003;
            mars.rotation.y = marsRotation;
        }

        skybox.position.copy(camera.position);

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }

//Dat GUI initialisation
    function initGUI() {
        const gui = new dat.GUI( { width: 350 } );
        const effectController = {
            "NormalMapScale": 0.55,
            "DisplacementMapScale": 0.05,
            "VertexMultiplier": 5, //Mars sphere vertex multiplier (Default value is 100, vertex number is then 100x2x100x3 = 60 000)
            "AnisotropicFiltering": anisotropicFilter,
            "Reset":function(){ resetOptions() },
            "RotationMars":function(){ marsRotate = !marsRotate; }
        };

        function resetOptions() {
            effectController.NormalMapScale = 0.55;
            effectController.DisplacementMapScale = 0.05;
            effectController.VertexMultiplier = 6;
            createMars();
            normalMapScaleChanged();
            displacementMapScaleChanged();
        }

        function normalMapScaleChanged() { matMars.normalScale.set ( effectController.NormalMapScale, effectController.NormalMapScale ); }
        gui.add( effectController, "NormalMapScale", 0.0, 1.0, 0.01 ).onChange( normalMapScaleChanged ).name("Normal Map Scale").listen();
        function displacementMapScaleChanged() { matMars.displacementScale = effectController.DisplacementMapScale; }
        gui.add( effectController, "DisplacementMapScale", 0.0, 0.15, 0.005 ).onChange( displacementMapScaleChanged ).name("Displacement Map Scale").listen();
        function createMars () {
            if (oldVM !== effectController.VertexMultiplier) {
                oldVM = effectController.VertexMultiplier;
                if (mars != null) {
                    scene.remove(mars);
                    mars.material = null;
                    mars.dispose();
                }
                mars = new THREE.Mesh(new THREE.IcosahedronGeometry( 1,  effectController.VertexMultiplier ), matMars);
                mars.rotation.y = marsRotation;
                scene.add(mars);
            }
        }
        gui.add( effectController, "VertexMultiplier", 0, 8, 1 ).onChange( createMars ).name("Polygon Count Multiplier").listen();
        gui.add( effectController, "Reset" ).name("RESET");
        gui.add( effectController, "RotationMars" ).name("Rotation ON/OFF");
        function changeAnisotropy() {
            skybox.material.map.anisotropy = effectController.AnisotropicFiltering;
            mars.material.normalMap.anisotropy = effectController.AnisotropicFiltering;
            mars.material.map.anisotropy = effectController.AnisotropicFiltering;
        }
        gui.add( effectController, "AnisotropicFiltering", 1, maxAnisotropy, 1 ).onChange( changeAnisotropy ).listen();
        //initialize all parameters
        resetOptions();
    }

    //when window is resized, event listenner call this function
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }
};
