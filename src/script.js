import './style.css'
import * as THREE from 'three'
import * as dat from 'dat.gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const gltfLoader1 = new GLTFLoader()
const gltfLoader2 = new GLTFLoader()
const gltfloader3 = new GLTFLoader()

const gui = new dat.GUI()
const gui2 = new dat.GUI()

const canvas = document.querySelector('canvas.webgl')

const scene = new THREE.Scene()

//The Rocket Model
gltfLoader1.load('scene2.gltf', (gltf2) => {

    gltf2.scene.scale.set(0.002, 0.002, 0.002)
    gltf2.scene.rotation.set(0, 4.7, 0)

    gltf2.scene.position.x = 0.4
    gltf2.scene.position.y = 0
    gltf2.scene.position.z = 0.9
    scene.add(gltf2.scene)
})

//The Moon Model (new)
gltfLoader2.load('scene.gltf', (gltf) => {

   gltf.scene.scale.set(0.005, 0.005, 0.005)
   gltf.scene.rotation.set(0, 4.7, 0)
    scene.add(gltf.scene)

    tl.to(gltf.scene.rotation, {y: 4.7, duration: 1})
    tl.to(gltf.scene.scale, {x: 0.2, y: 0.2, z: 0.2, duration: 1}, "-=1")
    tl.to(gltf.scene.position, { x: .5})
    tl.to(gltf.scene.rotation, { y: 5.4, duration: 1})
})

//the BeeModel
gltfloader3.load('Bee.glb', (gltf3) => {

    gltf3.scene.scale.set(0.025, 0.025, 0.025)
    gltf3.scene.rotation.set(0, 4.7, 0)
    gltf3.scene.position.x = 0
    gltf3.scene.position.y = 0.5
    gltf3.scene.position.z = 0.25

    scene.add(gltf3.scene)
})


// Lights

const light1 = new THREE.PointLight(0xffffff, 2)
light1.position.set(0,0,0)

scene.add(light1)

    gui.add(light1.position, 'x').min(-9).max(9)
    gui.add(light1.position, 'y').min(-9).max(9)
    gui.add(light1.position, 'z').min(-9).max(9)


const light2 = new THREE.PointLight(0xffffff, 1)
light2.position.set(0,0,0)

scene.add(light2)

    gui2.add(light2.position, 'x').min(-9).max(9).step(0.01)
    gui2.add(light2.position, 'y').min(-9).max(9).step(0.01)
    gui2.add(light2.position, 'z').min(-9).max(9).step(0.01)


const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// const controls = new OrbitControls(camera, canvas)

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animateda//
 */

document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowX)
    mouseY = (event.clientY - windowY)
}

const tick = () =>
{
    targetX = mouseX * .001
    targetY = mouseY * .001

    // Update objects
    
    //gltf.rotation.y = .5 * elapsedTime
    renderer.render(scene, camera)

        window.requestAnimationFrame(tick)
}

tick()
