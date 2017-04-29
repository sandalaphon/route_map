var secondsInterval = null
var clockInstances = []

var Clock = function(){
  this.haveUserTime = true
  this.animationRunning = false
  this.hour = 0
  this.minute = 0
  this.second = 0
  this.setCenter = true
  clockInstances.push(this)
  this.clockInstances = clockInstances
}


Clock.prototype = {

  createAClock: function() {
    secondsInterval = setInterval(this.drawClock.bind(this), 1000);
  },

  drawClock: function() {
    console.log(clockInstances)
  var canvas = document.getElementById("canvas");
  var radius = canvas.height / 2;
  var ctx = canvas.getContext("2d");
  if(this.setCenter){
    ctx.translate(radius, radius)
    this.setCenter = false}
   if(this.animationRunning) {
    
    clockInstances[0].pauseTheClock()
    this.drawFace(ctx, radius);
    this.drawNumbers(ctx, radius);
    this.drawStopWatch(ctx, radius);

  }else{


  this.drawFace(ctx, radius);
  this.drawNumbers(ctx, radius);
  this.drawTime(ctx, radius);
  }
},

pauseTheClock: function(){
  clearInterval(secondsInterval)
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

addSeconds: function(seconds){
  this.setCenter = false
 var secondsToAdd = seconds % 60
 var totalMinutes = (seconds - secondsToAdd) / 60
 var minutesToAdd = totalMinutes % 60
 var hoursToAdd = (totalMinutes - minutesToAdd) / 60
 this.second += secondsToAdd
 this.minute += minutesToAdd
 this.hour += hoursToAdd
 this.drawClock()
},

drawStopWatch: function(ctx, radius){
  if(secondsInterval) {
    clearInterval(secondsInterval)} //stop previous clock
    var hour = this.hour
    var minute = this.minute
    var second = this.second
    this.calculateAnglesAndDrawHands(ctx, radius, hour, minute, second)
},

drawTime: function(ctx, radius){

  if(this.haveUserTime){
    console.log(ctx)
    console.log(this)
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    
  }else{

    var hour=this.hour
    var minute=this.minute
    var second=0
  }
this.calculateAnglesAndDrawHands(ctx, radius, hour, minute, second)
  
  },

  calculateAnglesAndDrawHands: function(ctx, radius,hour, minute, second){
    hour=hour%12;
    hour=(hour*Math.PI/6)+
    (minute*Math.PI/(6*60))+
    (second*Math.PI/(360*60));
    this.drawHand(ctx, hour, radius*0.5, radius*0.07);
    //minute
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    this.drawHand(ctx, minute, radius*0.8, radius*0.07);
    // second
    if(this.animationRunning){second=0}else{
    second=(second*Math.PI/30)};
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