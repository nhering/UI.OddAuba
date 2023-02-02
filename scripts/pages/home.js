class HomePage {
   constructor() {
   }

   get element()
   {
      let e = document.createElement('div')
      e.setAttribute('id','content')
      e.classList.add('page')
      e.appendChild(this.notice)
      return e
   }

   get notice()
   {
      let n = document.createElement('div')
      n.classList.add('login-notice')
      // n.innerText = "Sign In Required"
      n.addEventListener('click', () => {
         funtilityUi.showModal(funtilityUi.SignInContainer)
      })
      n.innerHTML = "<span class='link'>Sign In</span><br/><span>Required</span>"
      return n
   }
}


class BackgroundAnimation {
   constructor() {
       this.targetId = 'content';
       this.targetElement = document.getElementById(this.targetId);
       this.canvas = document.createElement('canvas');
       this.canvas.setAttribute('id','animCanvas');
       this.targetElement.appendChild(this.canvas);
       
       // Customizable properties
       this.backgroundColor =  "rgb(0,0,0)";
       this.hexagonStyle = { radius: 35, gap: 0, red: 200, green: 200, blue: 200, alpha: 1};
       this.affectorCount = { max: 5, min: 2 };
       this.affectorRadiusPercent = { max: 1, min: .8 };
       this.affectorSpeedRange = { max: 20, min: 10 };
       this.affectorMaxAffect = { radius: .03, alpha: .2 };
       
       // Non-customizable properties.
       this.hexagonArray = [];
       this.affectorArray = [];
       this.affectorRadiusRange = { max: 1, min: .9 };
       
       // Hook into the resize event of the window.
       let obj = this;
       window.addEventListener('resize', obj.resizeCanvas());
       // Set up the initial drawing of the animation
       this.resizeCanvas();
       // Begin the animation cycle.
       this.intervalId = setInterval(function() { obj.drawBackground() }, 75);
   }

   resizeCanvas() {
       this.targetElement = document.getElementById(this.targetId);
       this.canvasWidth = this.targetElement.clientWidth;
       this.canvasHeight = this.targetElement.clientHeight;
       this.canvas = document.getElementById("animCanvas");
       this.ctx = this.canvas.getContext('2d');
       this.canvas.setAttribute('width', this.canvasWidth);
       this.canvas.setAttribute('height', this.canvasHeight);
       if (this.canvasHeight < this.canvasWidth) {
           this.affectorRadiusRange.max = this.canvasHeight * this.affectorRadiusPercent.max;
           this.affectorRadiusRange.min = this.canvasHeight * this.affectorRadiusPercent.min;
       } else {
           this.affectorRadiusRange.max = this.canvasWidth * this.affectorRadiusPercent.max;
           this.affectorRadiusRange.min = this.canvasWidth * this.affectorRadiusPercent.min;
       }
       this.newHexagonPositionArray();
       this.drawHexagonArray();
   }

   newHexagonPositionArray() {
       var newArray = [];
       var transformX = this.hexagonStyle.radius * 1.76 + this.hexagonStyle.gap;
       var transformY = this.hexagonStyle.radius * 1.52106 + this.hexagonStyle.gap;
       var rows = (this.canvasHeight / transformY).toFixed(); rows++;
       var cols = (this.canvasWidth / transformX).toFixed(); cols++;
       var originX = 0;
       var originY = this.hexagonStyle.radius * .25;
       var oddRowOffset = transformX / 2;

       var x = originX;
       var y = originY;
       for (var row = 1; row <= rows; row++) {
           if (row % 2 !== 0) {
               x -= oddRowOffset;
               for (var oddCol = 1; oddCol <= cols + 1; oddCol++) {
                   newArray.push({ x: x, y: y });
                   x += transformX;
               }
           } else {
               for (var evenCol = 1; evenCol <= cols; evenCol++) {
                   newArray.push({ x: x, y: y });
                   x += transformX;
               }
           }
           x = originX;
           y += transformY;
       }

       this.hexagonArray = newArray;
   }

   drawBackground() {
       this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
       this.ctx.fillStyle = this.backgroundColor;
       this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
       this.drawHexagonArray();
       this.deleteEscapedAffectors();
       this.updateAffectorArray();
   }

   drawHexagonArray() {
       var hexagonCount = this.hexagonArray.length;
       var affectorCount = this.affectorArray.length;
       var hexagon = { xPos: 0, yPos: 0, radius: 0, alpha: 0 };
       for (var hex = 0; hex < hexagonCount; hex++) {
           hexagon.xPos = this.hexagonArray[hex].x;
           hexagon.yPos = this.hexagonArray[hex].y;
           hexagon.radius = this.hexagonStyle.radius;
           hexagon.alpha = this.hexagonStyle.alpha;
           hexagon = this.affectHexagon(hexagon, affectorCount);
           this.drawHexagon(hexagon.xPos, hexagon.yPos, hexagon.radius, hexagon.alpha);
       }
   }

   updateAffectorArray() {
       if (this.affectorArray.length < this.affectorCount.max || this.affectorArray.length < this.affectorCount.min) {
           this.affectorArray.push(this.newAffector());
       }

       for (let i = 0; i < this.affectorArray.length; i++) {
           this.updateAffector(this.affectorArray[i], i);
       }
   }

   updateAffector(affector) {
       affector.xPos -= affector.xVel;
       affector.yPos -= affector.yVel;
   }

   drawHexagon(x, y, r, a) {
       this.ctx.lineWidth = 18;
       this.ctx.fillStyle = 'rgba(' + this.hexagonStyle.red + ', ' + this.hexagonStyle.green + ', ' + this.hexagonStyle.blue + ', ' + a + ')';
       this.ctx.beginPath();
       this.ctx.moveTo(x, y - r);                   //top
       this.ctx.lineTo(x + r * .866, y - r * .5);   //upper right
       this.ctx.lineTo(x + r * .866, y + r * .5);   //lower right
       this.ctx.lineTo(x, y + r);                   //bottom
       this.ctx.lineTo(x - r * .866, y + r * .5);   //lower left
       this.ctx.lineTo(x - r * .866, y - r * .5);   //upper left
       this.ctx.lineTo(x, y - r);                   //top
       this.ctx.fill();
   }

   affectHexagon(hexagon, affectorCount) {
       var radiusAffect = 1;
       var alphaAffect = 1;
       var distance;
       var a;
       var b;
       var percent = 0;
       for (let i = 0; i < affectorCount; i++) {
           a = hexagon.xPos - this.affectorArray[i].xPos;
           b = hexagon.yPos - this.affectorArray[i].yPos;
           distance = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
           if (distance < this.affectorArray[i].radius) {
               percent = (this.affectorArray[i].radius - distance) / this.affectorArray[i].radius;
               radiusAffect -= percent * (this.affectorMaxAffect.radius * percent);
               alphaAffect += percent * (this.affectorMaxAffect.alpha * percent);
           }
       }
       hexagon.radius = hexagon.radius * radiusAffect;
       hexagon.alpha = hexagon.alpha * alphaAffect;
       if (hexagon.radius < 0) {
           hexagon.radius = 0;
       }
       return hexagon;
   }

   newAffector() {
       var radius = Math.round(Math.random() * (this.affectorRadiusRange.max - this.affectorRadiusRange.min) + this.affectorRadiusRange.min);
       var startX;
       var startY;
       var endX;
       var endY;
       var xVel;
       var yVel;
       var radians;
       var speed = Math.random() * (this.affectorSpeedRange.max - this.affectorSpeedRange.min) + this.affectorSpeedRange.min;

       if (Date.now() % 2 === 0) {
           // Choose left or right of canvas
           startX = Math.floor(Math.random() * Math.floor(2)) === 0
               ? radius * -1
               : radius + this.canvasWidth;
           // Choose vertical starting point
           startY = Math.random() * this.canvasHeight;

           endX = startX < 0 ? this.canvasWidth : 0;
           endY = Math.random() * this.canvasHeight;

           radians = Math.atan2(startX - endX, startY - endY);
           xVel = speed * Math.sin(radians);
           yVel = speed * Math.cos(radians);
       } else {
           // Choose top or bottom of canvas
           startY = Math.floor(Math.random() * Math.floor(2)) === 0
               ? radius * -1
               : radius + this.canvasHeight;
           // Choose horizontal starting point
           startX = Math.random() * this.canvasWidth;

           endY = startY < 0 ? this.canvasHeight : 0;
           endX = Math.random() * this.canvasWidth;
           radians = Math.atan2(startX - endX, startY - endY);
           xVel = speed * Math.sin(radians);
           yVel = speed * Math.cos(radians);
       }

       return { xPos: startX, yPos: startY, xVel: xVel, yVel: yVel, radius: radius };
   }

   deleteEscapedAffectors() {
       var affCount = this.affectorArray.length;
       var affector = {};

       for (let i = 0; i < affCount; i++) {
           affector = this.affectorArray[i];
           if (affector.xPos < 0 - affector.radius ||
               affector.xPos > this.canvasWidth + affector.radius ||
               affector.yPos < 0 - affector.radius ||
               affector.yPos > this.canvasHeight + affector.radius) {
               this.affectorArray.splice(i, 1);
               affCount = this.affectorArray.length;
               i--;
           }
       }
   }
}

