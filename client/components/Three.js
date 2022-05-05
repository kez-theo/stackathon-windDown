import React from 'react'
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as model from './threeHelpers'
import * as sky from './Sky'
import { room } from './ThreeRoom';

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
    var camera = new THREE.PerspectiveCamera( 50, window.innerWidth/window.innerHeight, 0.1, 1000 );
    camera.position.x = 12;
    camera.position.y = 10;
    camera.position.z = 16;

    //>>>camera is looking at origin
    camera.lookAt(new THREE.Vector3(0,0,0))

    //>>>WebGL renderer that will render our scene
    var renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor( 0x000000, 0);

    //>>>cast shadows
    renderer.shadowMap.enabled = true;
    //>>>set size of the render output
    renderer.setSize( window.innerWidth, window.innerHeight );

    // Raycasting
    var raycaster = new THREE.Raycaster();
    var pointer = new THREE.Vector2();

    function onPointerMove( event ) {
      pointer.x = ( event.clientX / window.innerWidth  ) * 2 - 1;
      pointer.y = - ( (event.clientY -200) / window.innerHeight) * 2 + 1;
    }

    // Bedtime Routine Objects
    var yogaMat = model.getCylinder(0xFF00B8, .25, .25, 2.5, 10)
    yogaMat.position.set(-5.5, yogaMat.geometry.parameters.height/2, 4.5)
    
    var book = model.getBox(1, .25, .75, 0x00FFE0)
    book.position.set(-3.5, 1.85, 0)
    book.rotation.y = -45;

    //Add items to the scene
    scene.add( room )
    scene.add( sky.moon )

    for (let j = 0; j < sky.stars.length; j++) {
      scene.add( sky.stars[j] );
    }

    
    scene.add( yogaMat )
    scene.add( book )

    //Create Array for Interactive Objects
    var objects = [];

    objects.push( yogaMat );
    objects.push( book );

    //>>>to display scene, the DOM Element for the renderer needs to be appended to our HTML content
    //>>>the renderer gets mounted to this component
    

    const resetColor = () => {
      for (let i = 0; i < objects.length; i++) {
        if (objects[i].material) {
          objects[i].material.emissive.set( 0x000000 )
        }
      }
    }

    const hoverPieces = () => {
      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(objects)
      for (let i = 0; i < intersects.length; i++) {
        intersects[ i ].object.material.emissive.set( 0xd411c4 );
      }
    }
    
    var controls = new OrbitControls(camera, renderer.domElement);
    window.addEventListener( 'pointermove', onPointerMove );
    this.mount.appendChild( renderer.domElement );

    const animate = () => {
      requestAnimationFrame( animate )
      renderer.render(scene, camera, controls)
      resetColor()
      hoverPieces();
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