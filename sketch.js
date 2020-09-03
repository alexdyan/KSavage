let currentRotation = -25
let rotationDirection = .11
let pills = []
let threshold = -36
const player = new Tone.Player("./song.mp3")
const fft = new Tone.FFT(32)
let canAnimate = true
player.autostart = true
player.connect(fft)
fft.toDestination()

document.addEventListener('click', () => {
    console.log("resumed context")
    Tone.start()
})

let counter = 0.1;
const width = window.innerWidth * 1.2;
const height = window.innerHeight * 1.2;


function setup() {
    for (let i = 0; i < 100; i++) {
        pills.push(new Pill())
    }
    createCanvas(width, height)
}


function draw() {
    background(0)
    const freqs = fft.getValue()
    const canvas = document.querySelector('canvas')
    canvas.style.transform = `perspective(500px) translateZ(20px) rotate3d(0, 1, 0, ${.5 * sin(.05 * counter)}deg)`
    
    for (let i = 0; i < pills.length; i++) {
        erase()
        pills[i].draw()
        noErase()
    }
    
    const img = document.querySelector('img')
    img.style.transform = `perspective(500px) translateZ(200px) rotate3d(0, 1, 0, ${4 * sin(.05 * counter)}deg)`
    img.style.top = `${window.innerHeight / 2 - 98}px`
    img.style.left = `${window.innerWidth / 2 - 98}px`
    
    const logoBackground = document.getElementById('logo-background')
    logoBackground.style.transform = `perspective(500px) translateZ(200px) rotate3d(0, 1, 0, ${4 * sin(.05 * counter)}deg)`
    logoBackground.style.top = `${window.innerHeight / 2 - 100}px`
    logoBackground.style.left = `${window.innerWidth / 2 - 100}px`

    let avgLowFrequency = 0;
    for (let i = 0; i < 4; i++) {
        avgLowFrequency += freqs[i];
    }
    avgLowFrequency /= 4;
    if (avgLowFrequency > threshold && canAnimate) {
        canvas.style.transform = `perspective(500px) translateZ(50px) rotate3d(0, 1, 0, ${.1 * sin(.05 * counter)}deg)`
        canvas.style.transition = 'all .1s'
        canAnimate = false
        window.setTimeout(() => {
            canvas.style.transform = `perspective(500px) translateZ(20px) rotate3d(0, 1, 0, ${.1 * sin(.05 * counter)}deg)`
            canvas.style.transition = 'all .1s'
            canAnimate = true
        }, 200)
    }

    counter += 1
}

class Pill {
    constructor() {
        this.state = {
            idle: 1,
            movingP1: 2,
            movingP2: 3
        }
        this.dist = 50
        this.currentState = this.state.idle
        this.radius = random(2, 25)
        colorMode(HSB)
        this.color = color(random(0, 75), 50, 100)
        this.direction = createVector()
        const startPos = { x: random(width), y: random(height) }
        this.points = [{ ...startPos }, { ...startPos }]
        this.target = { x: 0, y: 0 }
        this.switchState()
    }

    switchState() {
        const delay = random(4000, 7000)
        setTimeout(() => {
            if (this.currentState === this.state.idle) {
                this.currentState = this.state.movingP1
                this.target.x = this.points[0].x + random(-this.dist, this.dist)
                this.target.y = this.points[0].y + random(-this.dist, this.dist)
                const xDiff = this.target.x - this.points[0].x
                const yDiff = this.target.y - this.points[0].y
                this.direction.x = xDiff
                this.direction.y = yDiff
                return;
            }

            else if (this.currentState === this.state.movingP1) {
                const xDiff = this.target.x - this.points[1].x
                const yDiff = this.target.y - this.points[1].y
                this.direction.x = xDiff
                this.direction.y = yDiff
                this.currentState = this.state.movingP2
                return
            }
            else {
                this.currentState = this.state.idle
                this.switchState()
            }
        }, delay)
    }

    draw() {
        if (this.currentState === this.state.movingP1) {
            this.points[0].x += this.direction.x * .5
            this.points[0].y += this.direction.y * .5
            if ((this.direction.x < 0 && this.points[0].x < this.target.x) || (this.direction.x > 0 && this.points[0].x > this.target.x)) {
                this.currentState = this.state.movingP2
            }
            else if ((this.direction.y < 0 && this.points[0].y < this.target.y) || (this.direction.y > 0 && this.points[0].y > this.target.y)) {
                this.currentState = this.state.movingP2
            }
        }

        else if (this.currentState === this.state.movingP2) {
            this.points[1].x += this.direction.x * .5
            this.points[1].y += this.direction.y * .5
            if ((this.direction.x < 0 && this.points[1].x < this.target.x) || (this.direction.x > 0 && this.points[1].x > this.target.x)) {
                this.currentState = this.state.idle
                this.switchState()
            }
            else if ((this.direction.y < 0 && this.points[1].y < this.target.y) || (this.direction.y > 0 && this.points[1].y > this.target.y)) {
                this.currentState = this.state.idle
                this.switchState()
            }
        }
        erase()
        strokeWeight(this.radius)
        line(this.points[0].x, this.points[0].y, this.points[1].x, this.points[1].y)
        noErase()   
    }

}