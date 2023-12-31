class Car {
    constructor(x,y,width,height, controlType, maxSpeed = 3) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height
        
        // so as to have a realistic movement of the car we are going to add speed and accelleration
        this.speed = 0;
        this.acceleration = 0.2;
        
        //stop the car and adding friction
        this.maxspeed = maxSpeed;
        this.friction =0.05;
        
        // define the mechanics of corner
        this.angle = 0;
        this.damage = false
        
        this.polygon = this.#createPolygon();
        //sensors injection
        
        this.sensor = new Sensor(this)
        this.controls = new Controls(controlType);
        
    }
    
    update(roadBorders, traffic){
        if(!this.damage) {
            this.#move();
            this.polygon = this.#createPolygon();
            this.damage = this.#assessDamage(roadBorders, traffic);
        }
        
        this.sensor.update(roadBorders, traffic);
    }
    
    #assessDamage(roadBorders,traffic){
        for (let i = 0; i < roadBorders.length; i++){
            if (polysIntersect(this.polygon, roadBorders[i])) {
                return true
            }
        }
        for (let i = 0; i < traffic.length; i++){
            if (polysIntersect(this.polygon, traffic[i].polygon)) {
                return true
            }
        }
        return  false
    }
    #createPolygon(){
        const points = [];
        const rad = Math.hypot(this.width,this.height)/2;
        const alpha = Math.atan2(this.width,this.height);
        points.push({
            x : this.x - Math.sin(this.angle - alpha) * rad,
            y : this.y - Math.cos(this.angle - alpha) * rad
        });
        points.push({
            x : this.x - Math.sin(this.angle + alpha) * rad,
            y : this.y - Math.cos(this.angle + alpha) * rad
        });
        points.push({
            x : this.x - Math.sin(Math.PI + this.angle - alpha) * rad,
            y : this.y - Math.cos(Math.PI + this.angle - alpha) * rad
        });
        points.push({
            x : this.x - Math.sin(Math.PI + this.angle + alpha) * rad,
            y : this.y - Math.cos(Math.PI + this.angle + alpha) * rad
        });
        
        return points
    }
    
    #move() {
        if(this.controls.forward){
            this.speed += this.acceleration;
        }
        if (this.controls.reverse) {
            this.speed -= this.acceleration;
        }
        if(this.speed > this.maxspeed){
            this.speed =  this.maxspeed;
        }
        if (this.speed < -this.maxspeed/2) {
            this.speed =- this.maxspeed/2;
        }
        if(this.speed > 0){
            this.speed -= this.friction;
        }
        if (this.speed < 0){
            this.speed += this.friction;
        }
        if(Math.abs(this.speed) < this.friction){
            this.speed = 0;
        }

        if(this.speed != 0){

            const flip = this.speed > 0 ? 1 : -1;
            if(this.controls.left){
                this.angle += 0.03 * flip;
            }
            if(this.controls.right) {
                this.angle -= 0.03 * flip;
            }
        }
        this.x -= Math.sin(this.angle)* this.speed;
        this.y -= Math.cos(this.angle)*this.speed;
    }
    
    draw(context) {
        if(this.damage) {
            context.fillStyle = "red";
        } else {
            context.fillStyle = 'black';
        }
      context.beginPath();
      context.moveTo(this.polygon[0].x, this.polygon[0].y);
      for(let i = 1; i < this.polygon.length; i++){
          context.lineTo(this.polygon[i].x, this.polygon[i].y)
      }
        context.fill();
    }
}