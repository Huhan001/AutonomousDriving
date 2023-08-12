const canvas =document.getElementById('mycanvas');
//canvas.height = window.innerHeight;
canvas.width =200;

const context = canvas.getContext("2d");
const road = new Road(canvas.width/2, canvas.width * 0.9);
const car = new Car(road.getlaneCenter(1),100,30,50,'KEYS');
const traffic = [
    new Car(road.getlaneCenter(1),-100,30,50,'DUMMY',2)
];
car.draw(context);

animate();

function animate(){
    
    for(let i = 0; i < traffic.length; i++){
        traffic[i].update(road.borders,[]);
    }
    
    car.update(road.borders, traffic);
    
    
    // this resizes the cancas📌
    canvas.height = window.innerHeight;
    context.save();
    context.translate(0, -car.y+ canvas.height*0.7);
    road.draw(context);
    
    for(let i = 0; i < traffic.length; i++) {
        traffic[i].draw(context);
    }
    
    car.draw(context);
    car.sensor.draw(context);
    
    context.restore();
    requestAnimationFrame(animate)
}



// 1:30: and a second less is about the delition of dummys sensors.
