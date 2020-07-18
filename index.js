function draw() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        // the coordinates
        const h = 920, k = 360;   // circle centre
        const R = 160;            // circle radius
        const L = 640;            // length of coupler
        const sliderH = 30;
        const sliderW = 60;

        // draw the centre line
        ctx.beginPath();
        ctx.moveTo(0, k);
        ctx.lineTo(1280, k);
        ctx.stroke();

        // draw circle
        ctx.beginPath();
        ctx.arc(h, k, R, 0, 2*Math.PI);
        ctx.stroke();

        // draw the radius line
        ctx.beginPath();
        ctx.moveTo(h, k);
        ctx.lineTo(h, k - R);
        ctx.stroke();


        // draw the coupler
        ctx.beginPath();
        ctx.moveTo(h, k - R);
        let sliderPosX = h - Math.sqrt(L**2 - R**2)
        ctx.lineTo(sliderPosX, k);
        ctx.stroke();

        // draw the slider
        ctx.beginPath();
        ctx.rect(sliderPosX - sliderW/2, k - sliderH/2, sliderW, sliderH/2);
        ctx.stroke();
    }
}
