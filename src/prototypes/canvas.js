const { CanvasRenderingContext2D } = require('canvas');

module.exports = bot => {

    // from https://matias.ma/nsfw/
    CanvasRenderingContext2D.prototype.roundedRect =
        function(x, y, w, h, r){
            if (w < 2 * r) r = w / 2;
            if (h < 2 * r) r = h / 2;
            this.beginPath();
            this.moveTo(x+r, y);
            this.arcTo(x+w, y,   x+w, y+h, r);
            this.arcTo(x+w, y+h, x,   y+h, r);
            this.arcTo(x,   y+h, x,   y,   r);
            this.arcTo(x,   y,   x+w, y,   r);
            this.closePath();
            return this;
        }

}
