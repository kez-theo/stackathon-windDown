import * as THREE from 'three';
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer"

// CUBE
export const getBox = (w, h, d, color) => {
  var geometry = new THREE.BoxGeometry( w, h, d );
  var material = new THREE.MeshStandardMaterial({ 
    color: color
  });
  var cube = new THREE.Mesh( geometry, material );
  cube.castShadow = true;
  cube.receiveShadow = true;
  return cube;
}

export const getShinyBox = (w, h, d, color) => {
  var geometry = new THREE.BoxGeometry( w, h, d );
  var material = new THREE.MeshPhongMaterial({ 
    color: color,
    transparent: true,
    opacity: 0.70
  });
  var cube = new THREE.Mesh( geometry, material );
  cube.castShadow = true;
  cube.receiveShadow = true;
  return cube;
}

// SPHERE - MESH BASIC
export const getSphere = (color, size, polys) => {
  var geometry = new THREE.SphereGeometry(size, polys, polys)
  var material = new THREE.MeshBasicMaterial ({
    color: color
  })
  var sphere = new THREE.Mesh( geometry, material );
  return sphere;
}

// SPHERE - MESH PHONG
export const getPhongSphere = (color, size, polys) => {
  var geometry = new THREE.SphereGeometry(size, polys, polys)
  var material = new THREE.MeshStandardMaterial ({
    color: color
  })
  var sphere = new THREE.Mesh( geometry, material );
  sphere.castShadow = true;
  sphere.receiveShadow = true;
  return sphere;
}

// SPHERE - MOON
export const getMoon = (color, size, polys) => {
  var geometry = new THREE.SphereGeometry(size, polys, polys)
  var moonTexture = new THREE.TextureLoader().load( "lroc_color_poles_2k.png" );
  moonTexture.wrapS = moonTexture.wrapT = THREE.MirroredRepeatWrapping;
  var material = new THREE.MeshStandardMaterial({ 
    bumpMap: moonTexture,
    bumpScale: .05, 
    color: color 
  });
  var sphere = new THREE.Mesh( geometry, material );
  // sphere.castShadow = true;
  // sphere.receiveShadow = true;
  return sphere;
}

// CYLINDER
export const getCylinder = (color, radiusTop, radiusBottom, height, segments) => {
  var geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, segments)
  var material = new THREE.MeshStandardMaterial ({
    color: color
  })
  var cylinder = new THREE.Mesh( geometry, material );
  cylinder.castShadow = true;
  cylinder.receiveShadow = true;
  return cylinder;
}

// CYLINDER - NO SHADOW CAST
export const getCylinderNoShadow = (color, radiusTop, radiusBottom, height, segments) => {
  var geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, segments)
  var material = new THREE.MeshStandardMaterial ({
    color: color,
  })
  var cylinder = new THREE.Mesh( geometry, material );
  cylinder.receiveShadow = true;
  return cylinder;
}

// PLANE
export const getPlane = (w, d, color) => {
  var geometry = new THREE.PlaneGeometry( w, d );
  var material = new THREE.MeshStandardMaterial({ 
    color: color,
    side: THREE.DoubleSide
  });
  var plane = new THREE.Mesh( geometry, material );
  plane.receiveShadow = true;
  return plane;
}

// TORUS
export const getTorus = (radius, tube, radialSegments, tubularSegments, arc, color) => {
  var geometry = new THREE.TorusGeometry( radius, tube, radialSegments, tubularSegments, arc );
  var material = new THREE.MeshStandardMaterial({ 
    color: color,
  });
  var torus = new THREE.Mesh( geometry, material );
  torus.receiveShadow = true;
  return torus;
}

//>>>>>>>> LIGHT <<<<<<<<<<//

// POINT LIGHT
export const getPointLight = (color, intensity, distance, decay) => {
  var light = new THREE.PointLight({color, intensity, distance, decay })
  light.castShadow = true;
  light.shadow.radius= 8
  return light;
}

//>>>>>>>> 2D OBJECTS <<<<<<<<<<//

export const ToolTip = () => {
  var textDiv = document.createElement('div');
  textDiv.className = 'label';

  textDiv.textContent = "";
  textDiv.style.marginTop = '3em';
  textDiv.style.color = "white";
  var textLabel = new CSS2DObject(textDiv);
  textLabel.position.set(0, 1, 0);

  return textLabel
}
