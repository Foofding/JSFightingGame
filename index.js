const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;
c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = .2;
let movementSpeed = 5;

class Sprite {
    constructor({ position, velocity, color = 'red', offset }) {
        this.position = position;
        this.velocity = velocity;
        this.width = 50;
        this.height = 150;
        this.lastKey = 's';
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,
            height: 50
        }
        this.color = color;
        this.isAttacking;
    }

    draw() {
        c.fillStyle = this.color;
        c.fillRect(this.position.x, this.position.y, this.width, this.height);

        // attackbox is drawn
        if (this.isAttacking) {
            c.fillStyle = 'green';
            c.fillRect(
                this.attackBox.position.x,
                this.attackBox.position.y,
                this.attackBox.width,
                this.attackBox.height
            );
        }
    }

    update() {
        this.draw()
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y;

        // Y Axis 
        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0;
        }
        else {
            this.velocity.y += gravity;
            this.position.y += this.velocity.y;
        }

        // X Axis 
        if (this.position.x + this.width + this.velocity.x >= canvas.width || this.position.x + this.velocity.x <= 0) {
            this.velocity.x = 0;
            console.log('boundry hit');
        }
        else {
            this.position.x += this.velocity.x;
        }

        if (rectangularCollision({
            rectangle1: playerOne,
            rectangle2: playerOne
        }) &&
            playerOne.isAttacking
        ) {
            playerOne.isAttacking = false;
            console.log('HIT!');
        }

        if (rectangularCollision({
            rectangle1: playerOne,
            rectangle2: playerTwo
        }) &&
            playerTwo.isAttacking
        ) {
            playerTwo.isAttacking = false;
            console.log('Enemy HIT!');
        }
    }

    attack() {
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, 100)
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
    },
    offset: {
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
    },
    color: 'blue',
    offset: {
        x: -50,
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

function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
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
    if (keys.a.pressed == true && playerOne.lastKey == 'a')
        playerOne.velocity.x = (-1 * movementSpeed);
    else if (keys.d.pressed == true && playerOne.lastKey == 'd')
        playerOne.velocity.x = (1 * movementSpeed);

    //PlayerTwo Movement Updates
    if (keys.ArrowLeft.pressed == true && playerTwo.lastKey == 'ArrowLeft')
        playerTwo.velocity.x = (-1 * movementSpeed);
    else if (keys.ArrowRight.pressed == true && playerTwo.lastKey == 'ArrowRight')
        playerTwo.velocity.x = (1 * movementSpeed);
}



animate();

window.addEventListener('keydown', (event) => {

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
            break;
        case ' ':
            playerOne.attack();
            console.log(event.key)
            break;
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
            break;
        //numbpad 0 for Attack
        case '0':
            playerTwo.isAttacking = true;
            break;
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