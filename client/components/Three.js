import React from 'react'
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as model from './threeHelpers'

class Three extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    //>>>set up parameters for the scene
    //>>>scene object is the container for all other objects - params include FoV, aspect ratio, near and far clipping planes
    var scene = new THREE.Scene();


    //>>>"eyes" we will be viewing our scene from
    //>>>camera position needs to be moved away from origin
    var camera = new THREE.PerspectiveCamera( 50, window.innerWidth/window.innerHeight, 0.1, 2000 );
    camera.position.x = 12;
    camera.position.y = 10;
    camera.position.z = 16;

    //>>>camera is looking at origin
    camera.lookAt(new THREE.Vector3(0,0,0))

    //>>>WebGL renderer that will render our scene
    var renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor( 0x000000, 0);
    const canvas = renderer.domElement;
    console.log(canvas)

    //>>>cast shadows
    renderer.shadowMap.enabled = true;
    //>>>set size of the render output

    renderer.setSize( window.innerWidth, window.innerHeight );

    // Scene Geometry
    var floor = model.getPlane(12, 12, 0x7000FF)
    var wall1 = model.getBox(12, 8, 1, 0x7000FF)
    var wall2 = model.getBox(1, 8, 13,  0x7000FF)
    var windowHole = model.getShinyBox(1.1, 3.5, 5, 0x1a0949)
    windowHole.position.set(0, 0, 1)

    var dressingTable = model.getBox(1.5, 2, 1.5, 0xFF00B8)
    var bed = model.getBox(4, 1.5, 8, 0xFF00B8)
    var sheets = model.getBox(4.25, 1, 8.25, 0xFFC700)
    var yogaMat = model.getCylinder(0xFF00B8, .25, .25, 2.5, 10)
    var pillow = model.getBox(3.5, .5, 2, 0x7000FF)
    var book = model.getBox(1, .5, .75, 0x00FFE0)

    var lampBase = model.getCylinder(0x00FFE0, .125, .125, 1, 6)
    var lampShade = model.getCylinderNoShadow(0xFFC700, .25, .5, .75, 10)

    // Scene Lighting
    var pointLight = model.getPointLight(0xFFFFFF, 1, 2, 2)
    var sphere = model.getSphere(0xFFFFFF, .2, 24)

    var shadowIntensity = 0.4

    var pointLight2 = pointLight.clone();
    pointLight.castShadow = true;
    pointLight2.castShadow = false;
    pointLight.intesity = shadowIntensity;
    pointLight2.intesity = 1 - shadowIntensity;
    
    // Object Position in Scene
    floor.rotation.x = Math.PI/2;
    wall1.position.set(0, wall1.geometry.parameters.height/2, -6.5)
    wall2.position.set(-6.5, wall2.geometry.parameters.height/2, -0.5)
    
    dressingTable.position.set(0, dressingTable.geometry.parameters.height/2, -5)
    bed.position.set(-4, bed.geometry.parameters.height/2, -2)
    yogaMat.position.set(-5.5, yogaMat.geometry.parameters.height/2, 4.5)
    sheets.position.set(0.15, sheets.geometry.parameters.height/2, 0.2)
    pillow.position.set(0, 1.25, -3)
    book.position.set(0, 1, 2)
    book.rotation.y = -45;

    lampShade.position.set(0, .75, 0)
    lampBase.position.set(0, 2.5, -5)
    pointLight.position.set(0, 3.5, -4.5)
    pointLight2.position.set(0, 3.5, -4.5)

    //Appending Objects to Scene
    scene.add( floor );
    scene.add( wall1 );
    wall2.add(windowHole)
    scene.add( wall2 );

    scene.add( dressingTable );
    bed.add( book )
    bed.add( sheets )
    bed.add( pillow );
    scene.add( bed );
    scene.add( yogaMat );
    lampBase.add( lampShade )
    scene.add( lampBase );
    
    //Appending Lighting to Scene
    pointLight.add(pointLight2)
    // pointLight.add(sphere)
    scene.add( pointLight )

    //>>>to display scene, the DOM Element for the renderer needs to be appended to our HTML content
    //>>>the renderer gets mounted to this component
    this.mount.appendChild( renderer.domElement );
    
    var controls = new OrbitControls(camera, renderer.domElement);

    const animate = () => {
      requestAnimationFrame( animate )
      renderer.render(scene, camera, controls)
    }
    animate()
  }

  render () {
    return (
      <div>
        <div ref={ref => (this.mount = ref)} />
      </div>
    )
  }
}

export default Three;