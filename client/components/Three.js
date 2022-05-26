import React from 'react'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import * as model from './threeHelpers'
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

    //>>>renderer that will render 2D Objects
    var labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';

    //>>>cast shadows
    renderer.shadowMap.enabled = true;
    //>>>set size of the render output
    renderer.setSize( window.innerWidth, window.innerHeight );

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    // Raycasting
    var raycaster = new THREE.Raycaster();
    var pointer = new THREE.Vector2();

    const onPointerMove = ( event ) => {
      pointer.x = ( (event.clientX - 60) / window.innerWidth  ) * 2 - 1;
      pointer.y = - ( (event.clientY -160) / window.innerHeight) * 2 + 1;
    }

    // Bedtime Routine Objects
    //yoga mat
    var yogaMat = model.getBox(2.5, .05, 7, 0xFF00B8)
    yogaMat.position.set( 3.5, yogaMat.geometry.parameters.height/2, 1.5)
    yogaMat.name = "stretch"
    
    //book
    var book = model.getBox(1, .25, .75, 0x00FFE0)
    book.position.set(-3.5, 1.85, 0)
    book.rotation.y = -45;
    book.name = "read"

    //meditation cushion
    var cushion = model.getTorus( .3, .45, 30, 30, 10, 0xdb9dfc)
    cushion.rotation.x = Math.PI/2;
    cushion.position.set(0, .35, -2)
    cushion.name = "meditate"

    //plant
    var potBase = model.getCylinder(0x7000FF, .5, .25, .75, 10)
    var leaves = model.getCylinder(0x00FFE0, 0, .75, 2, 15)
    potBase.position.set(2.5, potBase.geometry.parameters.height/2, -5)
    leaves.position.set(2.5, 1.85, -5)
    leaves.name = "tend to plants"

    var plant = new THREE.Group();
    plant.add(potBase)
    plant.add(leaves)

    //record table
    var recordStand = model.getBox(1.3, .5, 1.3, 0xFFC700)
    recordStand.position.set(-5, (recordStand.geometry.parameters.height/2) + 2.5, 5)
    var rec = model.getCylinder(0xFF00B8, .6, .6, .1, 12 )
    rec.position.set(-5, (recordStand.geometry.parameters.height/2) + 2.8, 5)
    rec.name = "listen to music"

    var records = new THREE.Group();
    records.add(recordStand)
    records.add(rec)

    //backpack
    var bag = model.extrudeBox(1.25, .75, 0x00FFE0)
    bag.rotation.y = Math.PI/2;
    bag.position.set(-1.6, .1, 1.5)
    var pouch = model.getBox(.75, .6, .1, 0x00FFE0)
    pouch.position.set(.4, pouch.geometry.parameters.height/2, .5)
    bag.add(pouch)

    bag.name = "prep for tomorrow"
    pouch.name = "prep for tomorrow"

    //tooltip text
    var label = model.ToolTip()

    //Add items to the scene
    scene.add( room )
    scene.add( label )

    scene.add( yogaMat )
    scene.add( book )
    scene.add( cushion )
    scene.add( plant )
    scene.add( records )
    scene.add( bag )

    //Create Array for Interactive Objects
    var objects = [];

    objects.push( yogaMat );
    objects.push( book );
    objects.push( cushion );
    objects.push( leaves );
    objects.push( rec );
    objects.push( bag );
    objects.push( pouch );
    
    var selectedObject = null

    //Create Hover and OnClick Events
    const onClick = (evt) => {
      raycaster.setFromCamera(pointer, camera);
      let intersects = raycaster.intersectObjects(objects);
      if (intersects.length > 0) {
        selectedObject = intersects[0].object
      }
    }

    const resetColor = () => {
      for (let i = 0; i < objects.length; i++) {
        if (objects[i].material) {
          objects[i] === selectedObject 
          ? objects[i].material.emissive.set ( 0xd411c4 )
          : objects[i].material.emissive.set ( 0x000000 )
        }
      }
    }

    const hoverPieces = () => {
      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(objects)
      for (let i = 0; i < intersects.length; i++) {
        intersects[ i ].object.material.emissive.set( 0xd411c4 );
        label.element.textContent=intersects[ i ].object.name
      }
    }

    const hasToolTip = () => {
      for (let i = 0; i < objects.length; i++) {
        if (!objects[i]) {
          objects[i] === selectedObject 
          ? label.element.textContent=objects[i].name
          : label.element.textContent=""
        }
      }
    }

    // const resetToolTip = () => {
    //   raycaster.setFromCamera(pointer, camera);
    //   const intersects = raycaster.intersectObjects(objects)
    //   for (let i = 0; i < intersects.length; i++) {
    //     label.element.textContent=intersects[ i ].object.name  
    //   }
    // }
    
    var controls = new OrbitControls(camera, labelRenderer.domElement, renderer.domElement);


    
      
    window.addEventListener( 'resize', onWindowResize );
    window.addEventListener( 'pointermove', onPointerMove );
    window.addEventListener('click', onClick )

    //>>>to display scene, the DOM Element for the renderer needs to be appended to our HTML content
    //>>>the renderer gets mounted to this component
    this.mount.appendChild( renderer.domElement );
    this.mount.appendChild(labelRenderer.domElement);

    const animate = () => {
      requestAnimationFrame( animate )
      renderer.render(scene, camera, controls)
      labelRenderer.render( scene, camera );
      hasToolTip()
      resetColor()
      hoverPieces();
    }
    animate()
  }

  render () {
    return (
      <div className='container'>
        <div ref={ref => (this.mount = ref)} />
      </div>
    )
  }
}

export default Three;


// const hasToolTip = () => {
//   for (let i = 0; i < objects.length; i++) {
//     if (objects[i].name) {
//       objects[i] === selectedObject 
//       ? scene.add( model.ToolTip(objects[i].name) )
//       : scene.remove( model.ToolTip(objects[i].name) )
//     }
//   }
// }

// const resetToolTip = () => {
//   raycaster.setFromCamera(pointer, camera);
//   const intersects = raycaster.intersectObjects(objects)
//   for (let i = 0; i < intersects.length; i++) {
//     scene.remove( model.ToolTip(intersects[ i ].object.name) )
//   }
// }