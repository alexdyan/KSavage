let sketch = function (p) {
    let gradientHues = [0, 200]
    let counter = 0
    p.setup = function () {
        const canvas = p.createCanvas(window.innerWidth, window.innerHeight);
        canvas.id('background-canvas');
    };

    p.draw = function () {
        p.colorMode(p.HSB)
        gradientHues[0] = p.map(sin(counter), 0, 1, 200, 300)
        gradientHues[1] = p.map(sin(counter + .5), 0, 1, 200, 300)
        counter += 0.005;

        p.setGradient(0, 0, window.innerWidth, window.innerHeight, p.color(gradientHues[0], 100, 100), p.color(gradientHues[1], 100, 100))
    };

    p.setGradient = function (x, y, w, h, c1, c2, axis) {
        p.noFill();

            // Top to bottom gradient
            for (let i = y; i <= y + h; i++) {
                let inter = p.map(i, y, y + h, 0, 1);
                let c = p.lerpColor(c1, c2, inter);
                p.stroke(c);
                p.line(x, i, x + w, i);
            }
        
    }

};

let myp5 = new p5(sketch);
