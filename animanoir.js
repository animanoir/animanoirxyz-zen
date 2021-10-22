console.log('animanoir.js loaded.')

import * as THREE from './libraries/three.js-dev/build/three.module.js';

import {
  OrbitControls
} from './libraries/three.js-dev/examples/jsm/controls/OrbitControls.js'

import {
  FontLoader
} from './libraries/three.js-dev/examples/jsm/loaders/FontLoader.js'

import {
  TextGeometry
} from './libraries/three.js-dev/examples/jsm/geometries/TextGeometry.js'

// Post-processing
import {
  EffectComposer
} from './libraries/three.js-dev/examples/jsm/postprocessing/EffectComposer.js'
import {
  RenderPass
} from './libraries/three.js-dev/examples/jsm/postprocessing/RenderPass.js'

import {
  GlitchPass
} from './libraries/three.js-dev/examples/jsm/postprocessing/GlitchPass.js'

/* -------------------------------- three.js -------------------------------- */

const firstWordArray = [
  'Digital',
  'Creative',
  'Cyber',
  'Human',
  'Magic',
  'Analog',
  'Software',
  'Meta'
]

const firstWord = firstWordArray[Math.floor(Math.random() * firstWordArray.length)]

const secondWordArray = [
  'Developer',
  'Punk',
  'Love',
  'Artist',
  'Lover',
  'Crafter',
  'Philosopher'

]

const secondWord = secondWordArray[Math.floor(Math.random() * secondWordArray.length)]

const clock = new THREE.Clock()

const loadingBarElement = document.querySelector('.loading-bar')

//ANCHOR Raycaster + mouse hover detection
const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

// Canvas
const canvas = document.querySelector('canvas#three')

const windowSize = {
  width: window.innerWidth,
  height: window.innerHeight
}

const scene = new THREE.Scene();


//ANCHOR Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(windowSize.width, windowSize.height)
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true

//ANCHOR Camera
const camera = new THREE.PerspectiveCamera(75, windowSize.width / windowSize.height, 0.1, 1000);
camera.position.z = 6;

//ANCHOR Loading Manager
const loadingManager = new THREE.LoadingManager(
  // Loaded
  () => {
    console.log('LOADING MANAGER: assets loaded.')
    window.setTimeout(() => {
      gsap.to(overlayMaterial.uniforms.uAlpha, {
        duration: 3,
        value: 0
      })

      loadingBarElement.classList.add('ended')
      loadingBarElement.style.transform = ''
    }, 500)
  },
  // Loading
  (itemUrl, itemsLoaded, itemsTotal) => {
    const progressRatio = (itemsLoaded / itemsTotal)
    loadingBarElement.style.transform = `scaleX(${progressRatio * .0})`
    console.log('LOADING MANAGER: assets loading...')
  }
)

//ANCHOR Post-processing
const effectComposer = new EffectComposer(renderer)
effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
effectComposer.setSize(windowSize.width, windowSize.height)

const renderPass = new RenderPass(scene, camera)
effectComposer.addPass(renderPass)

const glitchPass = new GlitchPass()
effectComposer.addPass(glitchPass)

//ANCHOR Fonts
const fontLoader = new FontLoader(loadingManager)
const matcapTexture = new THREE.TextureLoader().load('./assets/matcaps/161B1F_C7E0EC_90A5B3_7B8C9B-256px.png')

let mainText

fontLoader.load(
  './assets/fonts/notosansregular.json',
  (font) => {

    const textGeometry = new TextGeometry(
      `${firstWord} · ${secondWord}`, {
        font: font,
        size: 1,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5
      }
    )

    textGeometry.center();
    const textMaterial = new THREE.MeshMatcapMaterial({
      matcap: matcapTexture
    })
    mainText = new THREE.Mesh(textGeometry, textMaterial)
    scene.add(mainText)
  }
)

function onPointerMove(event) {

  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

}

// Axes helper
// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

//Orbit controls
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.update();

// Shader loader
const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
const overlayMaterial = new THREE.ShaderMaterial({
  transparent: true,
  vertexShader: `
      void main()
      {
          gl_Position = vec4(position, 1.0);
      }
  `,
  uniforms: {
    uAlpha: {
      value: 1
    }
  },
  fragmentShader: `
      uniform float uAlpha;
      void main()
      {
          gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
      }
  `
})
const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
scene.add(overlay)

// Video textures
const video = document.getElementById('video');
const vidRed = document.getElementById('vid-red');
const vidg3 = document.querySelector('#vg3');

video.play();
vidRed.play();
vidg3.play();

video.addEventListener('play', function () {

  this.currentTime = 3;

});
vidRed.addEventListener('play', function () {

  this.currentTime = 3;

});
vidg3.addEventListener('play', function () {

  this.currentTime = 3;

});

const texture = new THREE.VideoTexture(video);
const textureRed = new THREE.VideoTexture(vidRed);
const textureV3 = new THREE.VideoTexture(vidg3);


const textures = [texture, textureRed, textureV3]

//ANCHOR Video cubes
const videoCubesGroup = new THREE.Group()
const cubesQuantity = 150
const geometry = new THREE.BoxGeometry(7, 7, 7);
for (let i = 0; i < cubesQuantity; i++) {
  let randomIndex = Math.floor(Math.random() * textures.length)
  const material = new THREE.MeshPhongMaterial({
    color: 'white',
    map: textures[randomIndex]
  });
  var cube = new THREE.Mesh(geometry, material);
  cube.position.x = ((Math.random() - 0.5) * 111) + 10
  cube.position.y = ((Math.random() - 0.5) * 111) + 10
  cube.position.z = (-1 * (Math.random() - 0.5) * 100) - 10
  cube.rotation.x = Math.random() * Math.PI
  cube.rotation.y = Math.random() * Math.PI
  const scale = Math.random() * 1.5
  cube.scale.set(scale, scale, scale)
  // scene.add(cube);
  videoCubesGroup.add(cube)
}

scene.add(videoCubesGroup)

// Lighting
// let directionalLight = new THREE.AmbientLight('white', 0.5)
// directionalLight.castShadow = true
// scene.add(directionalLight)

const pointLight = new THREE.DirectionalLight(0xffffff, 1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

// Glowing spheres
// const sphereOneGeometry = new THREE.SphereGeometry(1, 32, 32)
// const sphereOneMaterial = new THREE.MeshStandardMaterial({
//   color: 0xffff00
// })
// const sphereOne = new THREE.Mesh(sphereOneGeometry, sphereOneMaterial)
// sphereOne.position.set(-4.516, 2.961, 0.114)
// scene.add(sphereOne)

// const sphereTwoGeometry = new THREE.SphereGeometry(1, 32, 32)
// const sphereTwoMaterial = new THREE.MeshStandardMaterial({
//   color: 0xffff00
// })
// const sphereTwo = new THREE.Mesh(sphereTwoGeometry, sphereTwoMaterial)
// sphereTwo.position.set(4.446, 3.215, 0)
// sphereTwo.scale.set(2, 2, 2)
// scene.add(sphereTwo)

// ANCHOR Render function
function render() {
  // renderer.render(scene, camera);
  effectComposer.render();
}

//ANCHOR Animation function
const animate = function () {
  requestAnimationFrame(animate);
  const elapsedTime = clock.getElapsedTime()

  videoCubesGroup.rotation.y = elapsedTime * -0.01

  // controls.update();

  // Smooth camera angle movement
  camera.position.x = mouse.x
  // camera.position.z = (Math.cos(mouse.x * Math.PI) * 10)
  camera.position.y = mouse.y
  // camera.lookAt(mainText.position)


  render()
};

animate();

/* --------------------------------- Raw JS --------------------------------- */

// Responsive 3D canvas
window.addEventListener('resize', () => {
  // Update sizes
  windowSize.width = window.innerWidth
  windowSize.height = window.innerHeight

  // Update camera
  camera.aspect = windowSize.width / windowSize.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(windowSize.width, windowSize.height)
})

// Detects mouse coordinates
window.addEventListener('mousemove', (event) => {
  mouse.x = event.clientX / windowSize.width - 0.5
  mouse.y = -(event.clientY / windowSize.height - 0.5)
})


// Detects mouse's middle button click
// window.addEventListener('mousedown', (event) => {
//   if (event.button == 1 || event.buttons == 4) {
//     console.log('middle mouse');

//   }
// });

// Detects key presses
// window.addEventListener('keydown', function (event) {
//   const key = event.key;
//   console.log(key)

//   if (key === 'a' || key === 'A') {
//     camera.rotation.y += 0.03;
//     console.log('awebo')
//   }else if (key === 'd' || key === 'D'){
//     camera.rotation.y -= 0.03;
//   }

// });

/* ---------------------------------- p5.js --------------------------------- */
