import * as THREE from 'three';
import * as model from './threeHelpers'

// Scene Geometry
export const moon = model.getMoon(0xdb9dfc, 3, 32)
moon.position.set(-10, 4, 0)
moon.rotation.x = Math.PI

export const stars = [];

//>>>create star field
const starfield = () => {
  var num = Math.floor(Math.random()*15) + 1;
  num *= Math.floor(Math.random()*2) === 1 ? 1 : -1;
  return num
}

for (let i = 0; i < 100; i++) {
  let star = model.getSphere(0xFFFFFF, .02, 10)
  star.position.set( starfield(), starfield(), 0 );
  stars.push( star );
}

// for (let j = 0; j < stars.length; j++) {
//   scene.add( stars[j] );
// }

//Scene Lighting
var pointLight = model.getPointLight(0xffde01, 1, 2, 2)
pointLight.position.set(-5, 4, 7)
