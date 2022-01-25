// import React from 'react'
// import * as THREE from 'three';
// import * as model from './threeHelpers'

// class ThreeSandbox extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   componentDidMount() {
//     //>>>set up parameters for the scene
//     //>>>scene object is the container for all other objects - params include FoV, aspect ratio, near and far clipping planes
//     var scene = new THREE.Scene();
//     // scene.background = new THREE.Color( 0x1a0949 );

//     // scene.fog = new THREE.FogExp2(0x1a0949, 0.2)

//     //>>>"eyes" we will be viewing our scene from
//     //>>>camera position needs to be moved away from origin
//     var camera = new THREE.PerspectiveCamera( 50, window.innerWidth/window.innerHeight, 0.1, 2000 );
//     camera.position.x = 1;
//     camera.position.y = 2;
//     camera.position.z = 5;

//     //>>>camera is looking at origin
//     camera.lookAt(new THREE.Vector3(0,0,0))

//     //>>>WebGL renderer that will render our scene
//     var renderer = new THREE.WebGLRenderer();
//     //>>>set size of the render output
//     renderer.setSize( window.innerWidth, window.innerHeight );

//     //>>>var geometry = new THREE.BoxGeometry( 1, 1, 1 );
//     //>>>var material = new THREE.MeshBasicMaterial( { color: 0x7000FF } );
//     //>>>var cube = new THREE.Mesh( geometry, material );
//     var box = model.getBox(1, 1, 1, 0xFF00B8)
//     var plane = model.getPlane(4, 4, 0x7000FF)
//     var pointLight = model.getPointLight(0xFFFFFF, 1)

//     box.position.y = box.geometry.parameters.height/2;
//     // box.position.set(-8, box.position.y, -8 )
//     plane.rotation.x = Math.PI/2;
//     pointLight.position.y = 2

//     scene.add( box );
//     scene.add( plane );
//     scene.add( pointLight )
 


//     //>>>to display scene, the DOM Element for the renderer needs to be appended to our HTML content
//     //>>>the renderer gets mounted to this component
//     this.mount.appendChild( renderer.domElement );
//     renderer.render(
//       scene,
//       camera
//     )
//   }

//   render () {
//     return (
//       <div>
//         <div>
//           <h1 className='container'>3D component below...</h1>
//         </div>
//         <div>
//           <div ref={ref => (this.mount = ref)} />
//         </div>
//       </div>
//     )
//   }
// }

// export default ThreeSandbox;


// ******************************************************************************//


// import React from 'react'
// import * as THREE from 'three';
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import * as model from './threeHelpers'

// class Three extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   componentDidMount() {
//     //>>>set up parameters for the scene
//     //>>>scene object is the container for all other objects - params include FoV, aspect ratio, near and far clipping planes
//     var scene = new THREE.Scene();
//     // scene.background = new THREE.Color( 0x1a0949 );

//     // scene.fog = new THREE.FogExp2(0x1a0949, 0.2)

//     //>>>"eyes" we will be viewing our scene from
//     //>>>camera position needs to be moved away from origin
//     var camera = new THREE.PerspectiveCamera( 50, window.innerWidth/window.innerHeight, 0.1, 2000 );
//     camera.position.x = 1;
//     camera.position.y = 2;
//     camera.position.z = 5;

//     //>>>camera is looking at origin
//     camera.lookAt(new THREE.Vector3(0,0,0))

//     //>>>WebGL renderer that will render our scene
//     var renderer = new THREE.WebGLRenderer();

//     //>>>cast shadows
//     renderer.shadowMap.enabled = true;
//     //>>>set size of the render output
//     renderer.setSize( window.innerWidth, window.innerHeight );

    

//     //>>>var geometry = new THREE.BoxGeometry( 1, 1, 1 );
//     //>>>var material = new THREE.MeshBasicMaterial( { color: 0x7000FF } );
//     //>>>var cube = new THREE.Mesh( geometry, material );
//     var box = model.getBox(1, 1, 1, 0xFF00B8)
//     var plane = model.getPlane(6, 6, 0x7000FF)
//     var pointLight = model.getPointLight(0xFFFFFF, 1)
//     var sphere = model.getSphere(0xFFFFFF, .05, 24)

//     box.position.y = box.geometry.parameters.height/2;
//     plane.rotation.x = Math.PI/2;
//     pointLight.position.y = 1.5

//     scene.add( box );
//     scene.add( plane );
//     pointLight.add(sphere)
//     scene.add( pointLight )


//     //>>>to display scene, the DOM Element for the renderer needs to be appended to our HTML content
//     //>>>the renderer gets mounted to this component
//     this.mount.appendChild( renderer.domElement );
    
//     var controls = new OrbitControls(camera, renderer.domElement);
    
//     model.update(renderer, scene, camera, controls);

//   }

//   render () {
//     return (
//       <div>
//         <div>
//           <h1 className='container'>3D component below...</h1>
//         </div>
//         <div>
//           <div ref={ref => (this.mount = ref)} />
//         </div>
//       </div>
//     )
//   }
// }

// export default Three;