const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let raf;

const centerX = 920;    // x coordinate of center
const centerY = 360;    // y coordinate of center
const R = 160;     // radius of crank
const L = 640;          // coupler length

const dtheta = -2 * Math.PI / 60;

// nothing changes of this object
const wheel = {
    draw: function() {
        ctx.beginPath();
        ctx.arc(centerX, centerY, R, 0, 2*Math.PI, true);
        ctx.stroke();
    }
};

// only theta changes
const crank = {
    theta: Math.PI/2,
    draw: function() {
        ctx.beginPath();
        ctx.moveTo(centerX - R * Math.cos(this.theta), centerY - R * Math.sin(this.theta));
        ctx.lineTo(centerX, centerY);
        ctx.stroke();
    }
};

// all 4 coords change
const coupler = {
    x1: function() {
        return centerX - R * Math.cos(crank.theta);
    },
    y1: function() {
        return centerY - R * Math.sin(crank.theta);
    },
    x2: function() {
        let a = 1;
        let b = -2 * R * Math.cos(crank.theta);
        let c = R**2 - L**2;
        let x = (-b + Math.sqrt(b**2 - 4*a*c))/(2*a);
        return centerX - x;
    },
    y2: function() {
        return centerY;
    },
    draw: function() {
        ctx.beginPath();
        ctx.moveTo(this.x1(), this.y1());
        ctx.lineTo(this.x2(), this.y2());
        ctx.stroke();
    }
}

const slider = {
    h: 20,
    w: 40,
    x: function() {

    },
    draw: function() {
        ctx.beginPath();
        ctx.rect()
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw the wheel
    wheel.draw();
    // draw crank
    crank.theta += dtheta;
    crank.draw()
    // draw coupler
    coupler.draw();

    raf = window.requestAnimationFrame(draw);
}

canvas.addEventListener('mouseover', function(e) {
    raf = window.requestAnimationFrame(draw);
});
  
  canvas.addEventListener('mouseout', function(e) {
    window.cancelAnimationFrame(raf);
});