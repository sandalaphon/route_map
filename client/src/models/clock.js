var secondsInterval = null

var Clock = function(){
//   var canvas = document.getElementById("canvas");
// this.ctx = canvas.getContext("2d");
// this.radius = canvas.height / 2;
// var ctx = this.ctx
// var radius = this.radius
//   ctx.translate(radius/2, radius/2);
// secondsInterval = setInterval(this.drawClock(ctx, radius), 1000);
this.haveUserTime = true
this.animationRunning = false
this.hour = 0
this.minute = 0
this.second = 0


}


Clock.prototype = {

  createAClock: function() {
      var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var radius = canvas.height / 2;
      ctx.translate(radius, radius);
    secondsInterval = setInterval(this.drawClock(ctx, radius), 1000);

  },

  createAnotherClock: function(){
    clearInterval(secondsInterval)
      var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var radius = canvas.height / 2;
      ctx.translate(0, 0);
     this.drawClock2(ctx, radius)
  },

drawClock: function(ctx, radius) {
 return function(){
  // radius = radius * 0.90
  this.drawFace(ctx, radius);
  this.drawNumbers(ctx, radius);
  this.drawTime(ctx, radius);
}.bind(this)
  },

  drawClock2: function(ctx, radius) {
 
    this.drawFace(ctx, radius);
    this.drawNumbers(ctx, radius);
    this.drawTime2(ctx, radius);

    },

setAnime: function(inputBool){
  this.animationRunning = inputBool
},

drawFace: function(ctx, radius) {
  var grad;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2*Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();
  grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
  grad.addColorStop(0, '#333');
  grad.addColorStop(0.5, 'white');
  grad.addColorStop(1, '#333');
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius*0.1;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
  ctx.fillStyle = '#333';
  ctx.fill();
},

drawNumbers: function(ctx, radius) {
  var ang;
  var num;
  ctx.font = radius*0.15 + "px arial";
  ctx.textBaseline="middle";
  ctx.textAlign="center";
  for(num = 1; num < 13; num++){
    ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius*0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius*0.85);
    ctx.rotate(-ang);
  }
},

addSeconds: function(seconds, callback){
   var secondsToAdd = seconds % 60
   var totalMinutes = (seconds - secondsToAdd) / 60
   var minutesToAdd = totalMinutes % 60
   var hoursToAdd = (totalMinutes - minutesToAdd) / 60
   this.second += secondsToAdd
   this.minute += minutesToAdd
   this.hour += hoursToAdd
   callback
},

drawTime2: function(ctx, radius){
  if(secondsInterval) {
    clearInterval(secondsInterval)}
  var hour = this.hour
  var minute = this.minute
  var second = this.second
  hour=hour%12;
  hour=(hour*Math.PI/6)+
  (minute*Math.PI/(6*60))+
  (second*Math.PI/(360*60));
  this.drawHand(ctx, hour, radius*0.5, radius*0.07);
  //minute
  minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
  this.drawHand(ctx, minute, radius*0.8, radius*0.07);
// set second to zero as it isnt needed
  second=0
  this.drawHand(ctx, second, radius*0.9, radius*0.02);


},

drawTime: function(ctx, radius){
  if(this.haveUserTime){
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    
  }else{

    var hour=this.hour
    var minute=this.minute
    var second=0


  }
    //hour
    hour=hour%12;
    hour=(hour*Math.PI/6)+
    (minute*Math.PI/(6*60))+
    (second*Math.PI/(360*60));
    this.drawHand(ctx, hour, radius*0.5, radius*0.07);
    //minute
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    this.drawHand(ctx, minute, radius*0.8, radius*0.07);
    // second
    second=(second*Math.PI/30);
    this.drawHand(ctx, second, radius*0.9, radius*0.02);

},

drawHand: function(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

}

module.exports = Clock