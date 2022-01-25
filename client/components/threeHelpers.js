import * as THREE from 'three';

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

//>>>>>>>> LIGHT <<<<<<<<<<//

// POINT LIGHT
export const getPointLight = (color, intensity, distance, decay) => {
  var light = new THREE.PointLight({color, intensity, distance, decay })
  light.castShadow = true;
  light.shadow.radius= 8
  return light;
}



// UPDATE SCENE
export const update = (renderer, scene, camera, controls) => {
  renderer.render(
    scene,
    camera
  )
  controls.update()  
  requestAnimationFrame(function() {
    update(renderer, scene, camera, controls);
  })
}
