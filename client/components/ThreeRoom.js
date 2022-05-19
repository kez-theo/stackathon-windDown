import * as THREE from 'three';
import * as model from './threeHelpers'

// Room Geometry
var floor = model.getPlane(12, 12, 0x7000FF)
var wall1 = model.getBox(12, 8, 1, 0x7000FF)
var wall2 = model.getBox(1, 8, 13,  0x7000FF)
var windowHole = model.getShinyBox(1.1, 3.5, 5, 0x1a0949)
windowHole.position.set(0, 0, 1)

//positions
floor.rotation.x = Math.PI/2;
wall1.position.set(0, wall1.geometry.parameters.height/2, -6.5)
wall2.position.set(-6.5, wall2.geometry.parameters.height/2, -0.5)

// Room Furniture
var dressingTable = model.getBox(1.5, 2, 1.5, 0xFF00B8)
var bed = model.getBox(4, 1.5, 8, 0xFF00B8)
var sheets = model.getBox(4.25, 1, 8.25, 0xFFC700)
var pillow = model.getBox(3.5, .5, 2, 0x7000FF)

var lampBase = model.getCylinder(0x00FFE0, .125, .125, 1, 6)
var lampShade = model.getCylinderNoShadow(0xFFC700, .25, .5, .75, 10)

//positions
dressingTable.position.set(0, dressingTable.geometry.parameters.height/2, -5)
bed.position.set(-4, bed.geometry.parameters.height/2, -2)
sheets.position.set(0.15, sheets.geometry.parameters.height/2, 0.2)
pillow.position.set(0, 1.25, -3)

lampShade.position.set(0, .75, 0)
lampBase.position.set(0, 2.5, -5)

// Scene Lighting
var pointLight = model.getPointLight(0xFFFFFF, 1, 2, 2)
var sphere = model.getSphere(0xFFFFFF, .2, 24)

var shadowIntensity = 0.4

var pointLight2 = pointLight.clone();
pointLight.castShadow = true;
pointLight2.castShadow = false;
pointLight.intesity = shadowIntensity;
pointLight2.intesity = 1 - shadowIntensity;

//positions
pointLight.position.set(0, 3.5, -4.5)
pointLight2.position.set(0, 3.5, -4.5)

//Appending Objects to Rcene
wall2.add(windowHole)

bed.add( sheets )
bed.add( pillow );
lampBase.add( lampShade )

//Appending Lighting to Scene
pointLight.add(pointLight2)
// pointLight.add(sphere)


export const room = new THREE.Group();

room.add(floor)
room.add(wall1)
room.add(wall2)
room.add( bed );
room.add( dressingTable );
room.add( lampBase );
room.add( pointLight )
