console.log('animanoir.js loaded.')

/* ------------------------------ Last.FM Data ------------------------------ */

const lastfmData = fetch('https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=swoephowx&api_key=8d1394415d95c0771ac9f8247cc7ee17&limit=1&nowplaying=true&format=json')
  .then(
    response => response.json()
  )
  .then(data => {
    document.getElementById("track").textContent = JSON.stringify(data.recenttracks.track[0].name);
    document.getElementById("artist").textContent = JSON.stringify(data.recenttracks.track[0].artist['#text']);
  });

/* -------------------------------- three.js -------------------------------- */
/* -------------------------------- three.js -------------------------------- */
import * as THREE from './libraries/threejs/three.module.js';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const windowSize = {
  width: window.innerWidth,
  height: window.innerHeight
}

// Canvas
const canvas = document.querySelector('canvas#three')


// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(windowSize.width, windowSize.height)

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

const animate = function () {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
};

animate();

window.addEventListener('resize', () =>
{
    // Update sizes
    windowSize.width = window.innerWidth
    windowSize.height = window.innerHeight

    // Update camera
    camera.aspect = windowSize.width / windowSize.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(windowSize.width, windowSize.height)
})