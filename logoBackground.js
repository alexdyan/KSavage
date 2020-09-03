let logoBackground = function (p) {
    let gradientHues = [0, 200]
    let counter = 0
    let radius = 100

    p.setup = function () {
        const canvas = p.createCanvas(200, 200);
        canvas.id('logo-background');
        const x = window.innerWidth / 2 - radius
        const y = window.innerHeight / 2 - radius
        document.getElementById('logo-background').style.left = x + 'px';
        document.getElementById('logo-background').style.top = y + 'px';

    };

    p.draw = function () {
        p.colorMode(p.HSB)
        gradientHues[0] = p.map(sin(counter), 0, 1, 200, 300)
        gradientHues[1] = p.map(sin(counter + .5), 0, 1, 200, 300)
        counter += 0.005;
        const x = window.innderWidth / 2 - radius
        const y = window.innerHeight / 2 - radius

        p.setGradient(0, 0, radius*2, radius*2, p.color(gradientHues[0], 100, 100), p.color(gradientHues[1], 100, 100))
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

let logoBackgroundP5 = new p5(logoBackground);
