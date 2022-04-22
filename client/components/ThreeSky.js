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
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

    //>>>WebGL renderer that will render our scene
    var renderer = new THREE.WebGLRenderer();

    //>>>cast shadows
    renderer.shadowMap.enabled = true;
    //>>>set size of the render output
    renderer.setSize( window.innerWidth, window.innerHeight );

    
    // Scene Geometry
    


    //>>>to display scene, the DOM Element for the renderer needs to be appended to our HTML content
    //>>>the renderer gets mounted to this component
    this.mount.appendChild( renderer.domElement );
    
    var controls = new OrbitControls(camera, renderer.domElement);
    
    model.update(renderer, scene, camera, controls);

  }

  render () {
    return (
      <div>
        <div>
          <div ref={ref => (this.mount = ref)} />
        </div>
      </div>
    )
  }
}

export default ThreeSky;