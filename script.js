let playerState  = 'idle';
const dropdown = document.getElementById('animations');
dropdown.addEventListener('change', function(e){
  playerState  = e.target.value;
})  
const canvas = document.getElementById('canvas1'); 
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600; 
const CANVAS_HEIGHT = canvas.height = 600; 

const playerImage = new Image();
playerImage.src = 'shadow_dog.png';
// by taking width of the entire file and dividing it by the nbr of columns you get width of 1 frame.
// 6876/12 = 573
const spriteWidth = 575;
// by taking the top height of our image and diving it by entire height pxs.
// 5230/10 = 523
const spriteHeight = 523; 
// gameFrame is set to 0 so our frame will endless loop over and over.
let gameFrame = 0;

// amount of frames to stagger between each iteration. the lower the faster the higher the slower. 
const staggerFrames = 9;
const spriteAnimations = [];
const animationsStates = [
    {
      name: 'idle',
      frames: 7,
    },

    {
      name: 'jump',
      frames: 7,
    },

    {
      name: 'fall',
      frames: 7,
    },

    {
      name: 'run',
      frames: 9,
    },

    {
      name: 'dizzy',
      frames: 11,
    },

    {
      name: 'sit',
      frames: 5,
    },

    {
      name: 'roll',
      frames: 7,
    },
    
    {
      name: 'bite',
      frames: 7,
    },
    
    {
      name: 'ko',
      frames: 12,
    },

    {
      name: 'getHit',
      frames: 4,
    },
];
animationsStates.forEach((state, index) => {
  let frames = {
    loc: [],
    
  }
  for (let j = 0; j < state.frames; j++){
    let postionX = j * spriteWidth;
    let postionY = index * spriteHeight;
    frames.loc.push({x: postionX, y: postionY}); 
  }
  spriteAnimations [state.name] = frames; 
});
console.log (spriteAnimations);

function animate(){
  //ctx clearRect where x is equal to 0 and y is equal 0 inside the space of our width and height. 
  ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
  //ctx.fillRect(100,50,100,100); 
  //ctx.drawImage(image, sx,sy,sw,sh,dx,dy,dw,dh);

  let postion = Math.floor(gameFrame/staggerFrames) % spriteAnimations[playerState].loc.length;
  let frameX = spriteWidth * postion;  
  let frameY = spriteAnimations[playerState].loc[postion].y; 
  ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
    // if gameframe by remainder of stagger frames is true = 0 and if Famex < the given amount of frameX increment framex


   /* 
   Less advance method of staggering frames.
   if (gameFrame % staggerFrames == 0){

    if (frameX < 6) frameX++;
    // else if frame  x is equal to 0 then return to orignal frame. 
    else frameX= 0;
  } */
    // gameFrame increments by 1 for each frame.   
    gameFrame++;
    // calls our animate frame function
      requestAnimationFrame(animate);
};
animate();