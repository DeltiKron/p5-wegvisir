// GLOBAL VARS & TYPES
let heightControl: p5.Element;
let scaleControl: p5.Element;
let nProngsControl: p5.Element;

let targetFps = 20

let images : p5.Image[];
let prong: ProngDrawer
function preload() {
  // dimensions of image are 780 x 440
  // dimensions of canvas are 100 x 100
  images = [
    'assets/prong_01.png',
    'assets/prong_02.png',
    'assets/prong_03.png',
    'assets/prong_04.png',
    'assets/prong_05.png',
    'assets/prong_06.png',
].map((x)=>{
    console.log('Reading asset: ',x)
    return loadImage(x)})
  

  }

// P5 WILL AUTOMATICALLY USE GLOBAL MODE IF A DRAW() FUNCTION IS DEFINED
function setup() {
  console.log("🚀 - Setup initialized - P5 is running");

  createCanvas(windowWidth, windowHeight)
  rectMode(CENTER).noFill().frameRate(targetFps);
  // NUMBER OF SHAPES SLIDER
  heightControl = createSlider(height/8, height/3.5, height/4).position(10, 20).style("width", "100px");
  scaleControl = createSlider(.2, 1.2, .8,.01).position(10, 120).style("width", "100px");
  nProngsControl = createSlider(1, 10, 7,1).position(10, 240).style("width", "100px");

}

// p5 WILL AUTO RUN THIS FUNCTION IF THE BROWSER WINDOW SIZE CHANGES
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


let rot=0

// p5 WILL HANDLE REQUESTING ANIMATION FRAMES FROM THE BROWSER AND WIL RUN DRAW() EACH ANIMATION FROME
function draw() {

  // CLEAR BACKGROUND
  background(100);

  // CENTER OF SCREEN
  translate(width / 2, height / 2);
  rotate(rot)

  const chevron_height = <number>heightControl.value();
  const scale = <number>scaleControl.value();
  

  const distance = chevron_height

  circle(0, 0, distance*2);
  stroke('black');
  strokeWeight(20*scale);

  prong = new ProngDrawer(images)
  
  push()
  let v = createVector(0,-distance)
  let nProngs = <number>nProngsControl.value()
  let i = 0
  while(i<nProngs){
    rotate(2*PI/nProngs)
    console.log('Drawing prong at',v)
    push()
    prong.draw(v.x, v.y,scale)
    pop()
    i++
  }
  pop()

  rot = rot+(targetFps/3000.)

}