"use strict";
const main = function () {
    let gui;
    //engine variables
    let marsRotate = true;
    let marsRotation = 2.5;
    let maxAnisotropy;
    let anisotropicFilter;
    let textureLoader;
    let loadingManager;
    let initialized = false;
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
    let geomSegBar = new THREE.BoxGeometry(0.4, 0.2, 0.02);
    let geomBar = new THREE.BoxGeometry(4.35, 0.05, 0.1);
    //mesh objects
    let mars;
    let skybox;
    //materials
    let matMars;
    let matSkybox;
    let matWhite = new THREE.MeshBasicMaterial({color: 0xffffff});
    let matMetal = new THREE.MeshStandardMaterial({color: 0xaaaaaa});

    function init() {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.001, 200);
        camera.position.z = 3;
        renderer = new THREE.WebGLRenderer();
        maxAnisotropy = renderer.capabilities.getMaxAnisotropy(); //Anisotropic filtering, setting to the max possible
        anisotropicFilter = maxAnisotropy;
        if (anisotropicFilter > 8) anisotropicFilter = 8;
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        controls = new THREE.OrbitControls(camera);
        loadingManager = new THREE.LoadingManager();
        textureLoader = new THREE.TextureLoader(loadingManager);
        loadingGroup = new THREE.Group();
        loadingGroup.position.y = -1.5;
        const scale = 0.42;
        loadingGroup.scale.set(scale, scale, scale);
        scene.add(loadingGroup);

        //Event called on window resizing
        window.addEventListener("resize", onWindowResize, false);

        // Init loading with this texture, once loaded we can display mars and the GUI.
        textureLoader.load("maps/mars/mars_small.jpg", function (tex) {
            tex.anisotropy = anisotropicFilter;
            tex.needsUpdate = true;
            matMars = new THREE.MeshPhongMaterial({
                map: tex,
                color: 0xafaaaa,
                specular: 0x050300,
                shininess: 2,
            });

            //light
            renderer.toneMappingExposure = 1.4;
            const sunlight = new THREE.PointLight(0xffffff, 5, 200, 2);
            sunlight.position.x=75;
            sunlight.position.z=50;
            scene.add(sunlight);
            initGUI();
        });

        loadingManager.onProgress = function (url, stage) {
            loadingScreen(stage);
            renderer.render(scene, camera);
        };
        loadingScreen(0);
    }
    function addLoadingBlock (group, stage) {
        const loadingBlock = new THREE.Mesh(geomSegBar, matMetal);
        loadingBlock.position.x = stage * 3/7 -2;
        group.add(loadingBlock);
    }

    function loadingScreen(stage) {
        addLoadingBlock(loadingGroup, stage);
        switch (stage) {
            case 0:{
                const loadingBar = new THREE.Mesh(geomBar, matMetal);
                loadingBar.position.y = -0.15;
                loadingGroup.add(loadingBar);
                const loader = new THREE.FontLoader();
                loader.load("CyberspaceRacewayBack.json", function (font) {
                    textGeometry = new THREE.TextGeometry("LOADING...", {
                        font: font,
                        size: 0.4,
                        height: 0.15,
                        curveSegments: 12
                    });
                    const loadingText = new THREE.Mesh(textGeometry, matMetal);
                    loadingText.position.set(-2,0.3,0);
                    loadingGroup.add(loadingText);
                });
            } break;
            case 1:{
                mars.visible = true;
                initialized = true;
                animate();
                textureLoader.load("maps/mars/Blended_small_NRM.png", function (tex) {
                    matMars.normalMap = tex;
                    tex.anisotropy = anisotropicFilter;
                    tex.needsUpdate = true;
                });
                textureLoader.load("maps/mars/Blended_DISP_small.png", function (tex) {
                    matMars.displacementMap = tex;
                    tex.anisotropy = anisotropicFilter;
                    tex.needsUpdate = true;
                });
                textureLoader.load("maps/milkyway_small.jpg", function (tex) {
                    tex.anisotroopy = anisotropicFilter;
                    tex.needsUpdate = true;
                    matSkybox = new THREE.MeshBasicMaterial({
                        map: tex,
                        side: THREE.BackSide,
                        depthWrite: false
                    });
                    skybox = new THREE.Mesh(new THREE.SphereGeometry(10,12,8), matSkybox);
                    skybox.renderOrder = -1;
                    scene.add(skybox);
                });
            } break;
            case 4:{
                textureLoader.load("maps/mars/Blended_NRM.png", function (tex) {
                    matMars.normalMap = tex;
                    tex.anisotropy = anisotropicFilter;
                    tex.needsUpdate = true;
                });
                textureLoader.load("maps/mars/mars.jpg", function (tex) {
                    matMars.map = tex;
                    tex.anisotropy = anisotropicFilter;
                    tex.needsUpdate = true;
                });
                textureLoader.load("maps/mars/Blended_DISP.jpg", function (tex) {
                    matMars.displacementMap = tex;
                    tex.anisotropy = anisotropicFilter;
                    tex.needsUpdate = true;
                });
                textureLoader.load("maps/milkyway.jpg", function (tex) {
                    matSkybox.map = tex;
                    tex.anisotropy = anisotropicFilter;
                    tex.needsUpdate = true;
                });
            } break;
            case 8:{
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
                shouldOpenGUI();
            }
        }
    }

    function shouldOpenGUI () { // dont open if on mobile
        let hasTouchScreen = false;
        if ("maxTouchPoints" in navigator) {
            hasTouchScreen = navigator.maxTouchPoints > 0;
        } else if ("msMaxTouchPoints" in navigator) {
            hasTouchScreen = navigator.msMaxTouchPoints > 0;
        } else {
            const mQ = window.matchMedia && matchMedia("(pointer:coarse)");
            if (mQ && mQ.media === "(pointer:coarse)") {
                hasTouchScreen = !!mQ.matches;
            } else if ('orientation' in window) {
                hasTouchScreen = true;
            } else {
                const UA = navigator.userAgent;
                hasTouchScreen = (
                    /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
                    /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
                );
            }
        }
        if (!hasTouchScreen) gui.open();
    }

    function animate() {
        controls.update();
        if (marsRotate) {
            marsRotation += 0.001;
            mars.rotation.y = marsRotation;
        }

        if (skybox != null) skybox.position.copy(camera.position);
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }

    function initGUI() {
        gui = new dat.GUI({width: 350});
        gui.close();
        const effectController = {
            "NormalMapScale": 0.5,
            "DisplacementMapScale": 0.045,
            "VertexMultiplier": 6,
            "AnisotropicFiltering": anisotropicFilter,
            "Reset": resetOptions,
            "RotationMars": function(){marsRotate = !marsRotate;}
        };

        function resetOptions() {
            effectController.NormalMapScale = 0.5;
            effectController.DisplacementMapScale = 0.045;
            effectController.VertexMultiplier = 6;
            createMars();
            normalMapScaleChanged();
            displacementMapScaleChanged();
        }

        function normalMapScaleChanged() {matMars.normalScale.set(effectController.NormalMapScale, effectController.NormalMapScale);}
        gui.add(effectController, "NormalMapScale", 0.0, 1.0, 0.01).onChange(normalMapScaleChanged).name("Normal Map Scale").listen();
        function displacementMapScaleChanged() {matMars.displacementScale = effectController.DisplacementMapScale;}
        gui.add(effectController, "DisplacementMapScale", 0.0, 0.1, 0.005).onChange(displacementMapScaleChanged).name("Displacement Map Scale").listen();
        function createMars () {
            if (oldVM !== effectController.VertexMultiplier) {
                oldVM = effectController.VertexMultiplier;
                if (mars != null) {
                    scene.remove(mars);
                    mars.material = null;
                    mars.geometry.dispose();
                }
                mars = new THREE.Mesh(new THREE.IcosahedronGeometry(1, effectController.VertexMultiplier), matMars);
                mars.visible = initialized;
                mars.rotation.y = marsRotation;
                scene.add(mars);
            }
        }
        gui.add(effectController, "VertexMultiplier", 0, 8, 1).onChange(createMars).name("Polygon Count Multiplier").listen();
        gui.add(effectController, "Reset").name("RESET");
        gui.add(effectController, "RotationMars").name("Rotation ON/OFF");
        function changeAnisotropy(){
            skybox.material.map.anisotropy = effectController.AnisotropicFiltering;
            skybox.material.map.needsUpdate = true;
            mars.material.normalMap.anisotropy = effectController.AnisotropicFiltering;
            mars.material.normalMap.needsUpdate = true;
            mars.material.map.anisotropy = effectController.AnisotropicFiltering;
            mars.material.map.needsUpdate = true;
        }
        gui.add(effectController, "AnisotropicFiltering", 1, maxAnisotropy, 1).onChange(changeAnisotropy).listen();
        //initialize all parameters
        resetOptions();
    }

    //when window is resized, event listenner call this function
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    init();
};
