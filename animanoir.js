console.log('animanoir.js loaded.')

import * as THREE from './libraries/threejs/three.module.js';

import {
  OrbitControls
} from './libraries/threejs/OrbitControls.js'

import {
  FontLoader
} from './libraries/threejs/FontLoader.js'

import {
  TextGeometry
} from './libraries/threejs/TextGeometry.js'


/* ------------------------------ Last.FM Data ------------------------------ */

//TODO Turn on Last.fm fetching before pushing

const lastfmData = fetch('https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=swoephowx&api_key=8d1394415d95c0771ac9f8247cc7ee17&limit=1&nowplaying=true&format=json')
  .then(
    response => response.json()
  )
  .then(data => {
    // Removes quotes from JSON data
    const formattedTrackname = JSON.stringify(data.recenttracks.track[0].name).replace(/["]+/g, '')
    const formattedArtistname = JSON.stringify(data.recenttracks.track[0].artist['#text']).replace(/["]+/g, '')
    document.getElementById("track").textContent = formattedTrackname
    document.getElementById("artist").textContent = formattedArtistname
  });

/* -------------------------------- three.js -------------------------------- */

const clock = new THREE.Clock()
let text
/**
 * Fonts
 */
const fontLoader = new FontLoader()
const matcapTexture = new THREE.TextureLoader().load('./assets/matcaps/161B1F_C7E0EC_90A5B3_7B8C9B-256px.png')

fontLoader.load(
  './assets/fonts/notosansregular.json',
  (font) => {
    console.log('loaded')
  }
)

fontLoader.load(
  './assets/fonts/notosansregular.json',
  (font) => {
    const textGeometry = new TextGeometry(
      'Art · Software', {
        font: font,
        size: 1,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5
      }
    )
    textGeometry.center();
    const textMaterial = new THREE.MeshMatcapMaterial({
      matcap: matcapTexture
    })
    const text = new THREE.Mesh(textGeometry, textMaterial)
    scene.add(text)
  }
)

// Canvas
const canvas = document.querySelector('canvas#three')

const windowSize = {
  width: window.innerWidth,
  height: window.innerHeight
}

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
})
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(windowSize.width, windowSize.height)
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, windowSize.width / windowSize.height, 0.1, 1000);
camera.position.z = 10;

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

const video = document.getElementById('video');
video.play();
video.addEventListener('play', function () {

  this.currentTime = 3;

});

const texture = new THREE.VideoTexture(video);

// Light
let directionalLight = new THREE.DirectionalLight('white', 0.7)
directionalLight.castShadow = true
scene.add(directionalLight)

// Geometries
const geometry = new THREE.BoxGeometry(7, 7, 7);
const material = new THREE.MeshPhongMaterial({
  color: 'white',
  map: texture
});
for (let i = 0; i < 100; i++) {
  var cube = new THREE.Mesh(geometry, material);
  cube.position.x = (Math.random() - 0.5) * 100
  cube.position.y = (Math.random() - 0.5) * 100
  cube.position.z = (Math.random() - 0.5) * 100
  cube.rotation.x = Math.random() * Math.PI
  cube.rotation.y = Math.random() * Math.PI
  // const scale = Math.random()
  // cube.scale.set(scale, scale, scale)
  scene.add(cube);

}



// Animation function
const animate = function () {
  requestAnimationFrame(animate);
  const elapsedTime = clock.getElapsedTime()

  cube.rotation.x = elapsedTime
  controls.update();


  renderer.render(scene, camera);
};

animate();

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

// Mouse events