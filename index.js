const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;
c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = .2;
let movementSpeed = 5;

class Sprite {
    constructor({ position, velocity }) {
        this.position = position;
        this.velocity = velocity;
        this.height = 150;
        this.lastKey = 's';
    }

    draw() {
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, 50, this.height);
    }

    update() {
        this.draw()

        // Y Axis 
        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0;
        }
        else
        {
            this.velocity.y += gravity;
            this.position.y += this.velocity.y;
        }
        
        // X Axis 
        if (this.position.x + this.width + this.velocity.x >= canvas.width) {
            this.velocity.x = 0;
            console.log('boundry hit');
        }
        else
        {
          this.position.x += this.velocity.x;
        }    

    }
}

const playerOne = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    }
})

const playerTwo = new Sprite({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    }
})

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },    
    d: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    }
}

//This is where events per frame take place
function animate() {
    //creates a loop. 
    window.requestAnimationFrame(animate);
    
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height)
    
    playerOne.update();
    playerTwo.update();

    playerOne.velocity.x = 0;
    playerTwo.velocity.x = 0;   

    //PlayerOne Movement Updates
    if(keys.a.pressed == true && playerOne.lastKey == 'a')
        playerOne.velocity.x = (-1 * movementSpeed);    
    else if(keys.d.pressed == true && playerOne.lastKey == 'd')
        playerOne.velocity.x = (1 * movementSpeed);

    //PlayerTwo Movement Updates
    if(keys.ArrowLeft.pressed == true && playerTwo.lastKey == 'ArrowLeft')
        playerTwo.velocity.x = (-1 * movementSpeed);    
    else if(keys.ArrowRight.pressed == true && playerTwo.lastKey == 'ArrowRight')
        playerTwo.velocity.x = (1 * movementSpeed);    
    

}

animate();

window.addEventListener('keydown', (event) => {
    console.log(event.key);

    //playerOne controls
    switch (event.key) {
        //UP 
        case 'w':
            playerOne.velocity.y = -10;
            break;
        //Left
        case 'a':
            keys.a.pressed = true;
            playerOne.lastKey = 'a';
            break;      
        //Right  
        case 'd':
            keys.d.pressed = true;
            playerOne.lastKey = 'd';
    }

    //playerTwo controls
    switch (event.key) {
        //UP 
        case 'ArrowUp':
            playerTwo.velocity.y = -10;
            break;
        //Left
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            playerTwo.lastKey = 'ArrowLeft';
            break;   
        //Right     
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            playerTwo.lastKey = 'ArrowRight';
    }


})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'w':
            keys.w.pressed = false;            
            break;
        case 'a':
            keys.a.pressed = false;
            break;       
        case 'd':
            keys.d.pressed = false;
    }

    //playerTwo controls
    switch (event.key) {
        case 'ArrowUp':
            keys.ArrowUp.pressed = false;           
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;       
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
    }
})