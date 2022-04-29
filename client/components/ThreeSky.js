import React from 'react'
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as model from './threeHelpers'

class ThreeSky extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    //>>>set up parameters for the scene
    //>>>scene object is the container for all other objects - params include FoV, aspect ratio, near and far clipping planes
    var scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x1a0949 );

    // scene.fog = new THREE.FogExp2(0xffffff, 0.02)

    //>>>"eyes" we will be viewing our scene from
    //>>>camera position needs to be moved away from origin
    var camera = new THREE.OrthographicCamera( window.innerWidth / - 100, window.innerWidth / 100, window.innerHeight / 100, window.innerHeight / - 100, 1, 1000 );

    //>>>WebGL renderer that will render our scene
    var renderer = new THREE.WebGLRenderer();
    camera.position.z = 10;

    //>>>cast shadows
    renderer.shadowMap.enabled = true;
    //>>>set size of the render output
    renderer.setSize( window.innerWidth, window.innerHeight );

    
    // Scene Geometry
    var moon = model.getMoon(0xdbaed1, 3, 32)
    moon.position.set(-10, 4, 0)
    moon.rotation.x = Math.PI
    var stars = [];

    //>>>create star field
    const starfield = () => {
      var num = Math.floor(Math.random()*15) + 1;
      num *= Math.floor(Math.random()*2) === 1 ? 1 : -1;
      return num
    }

    for (let i = 0; i < 100; i++) {
      let star = model.getSphere(0xFFFFFF, .05, 10)
      star.position.set( starfield(), starfield(), 0 );
      stars.push( star );
    }

    for (let j = 0; j < stars.length; j++) {
      scene.add( stars[j] );
    }

    //Scene Lighting
    var pointLight = model.getPointLight(0xffde01, 1, 2, 2)
    pointLight.position.set(-5, 4, 7)

    //Appending Objects to Scene
    scene.add( moon );
    scene.add( pointLight )

    //Animation
    var lightness = 0;

    function twinkle() {
      for (let k = 0; k < stars.length; k++) {
        let star = stars[k];
        lightness > 100 ? lightness = 0 : lightness++;
        star.material.color = new THREE.Color("hsl(255, 50%, " + lightness + "%)");
      }
    }


    //>>>to display scene, the DOM Element for the renderer needs to be appended to our HTML content
    //>>>the renderer gets mounted to this component
    this.mount.appendChild( renderer.domElement );

    model.update(renderer, scene, camera, null, twinkle);

  }

  render () {
    return (
      <div>
        <div ref={ref => (this.mount = ref)} />
      </div>
    )
  }
}

export default ThreeSky;
