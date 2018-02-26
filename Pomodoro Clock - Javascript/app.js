//variables.................
var breakTime = 5;
var sessionTime = 25;
var isSession = true;
var isPasued = true;
var timeLeft = sessionTime * 60 ;
var intervalCounter = null;
var fillAnimate = null;

var startAudio = new Audio("https://jpk-image-hosting.s3.amazonaws.com/pomodoro-app/audio/start.mp3");
var endAudio = new Audio("https://jpk-image-hosting.s3.amazonaws.com/pomodoro-app/audio/end.mp3");

var fillColor = "#2ecc71";
var fillTime = timeLeft;

var per = 0;

var getFormatedTime = function() {
  var m = Math.floor(timeLeft / 60),
      s = (timeLeft - m * 60);
  return m + ':' + (s < 10 ? '0' : '') + s;
};



var $breakValue = document.getElementById("break-value");
var $sessionValue =  document.getElementById("session-value");
var $timer = document.getElementById("timer");
var $status = document.getElementById("status");

/*function fillAnimate(){
  if(!isPasued){
    setInterval(function() {
    per++;
        if(per <= 100){
          $('.pomodoro').css({background: "linear-gradient(to top, "+fillColor+" "+per+"%,transparent "+per+"%,transparent    100%)"});
    
        }
        
      }, fillTime*10);
  }
  
} */


//break Dec buttons..
function onBreakDecBtn(){
  if(breakTime>1){
    breakTime--;
    $breakValue.innerHTML = breakTime;
    if(!isSession){
      timeLeft = breakTime * 60;
      fillTime = timeLeft;
      $timer.innerHTML = getFormatedTime();
    }
  }
  
  if(!isPasued){
    pausePomodoro();
    startPomodoro();
  }
  
}

///break inc buttons..
function onBreakIncBtn(){
  if(breakTime<100){
    breakTime++;
    $breakValue.innerHTML = breakTime;
    if(!isSession){
      timeLeft = breakTime * 60;
      fillTime = timeLeft;
      $timer.innerHTML = getFormatedTime();
    }
  }
  
  if(!isPasued){
    pausePomodoro();
    startPomodoro();
  }
  
}


//Session Dec buttons..
function onSessionDecBtn(){
  if(sessionTime>1){
    sessionTime--;
    $sessionValue.innerHTML = sessionTime;
    if(isSession){
      timeLeft = sessionTime * 60 ;
      fillTime = timeLeft;
      
      $timer.innerHTML = getFormatedTime();
    }
  }
  
  if(!isPasued){
    pausePomodoro();
    startPomodoro();
  }
  
}

///Session inc buttons..
function onSessionIncBtn(){
  if(sessionTime<100){
    sessionTime++;
    $sessionValue.innerHTML = sessionTime;
    if(isSession){
      timeLeft = sessionTime * 60 ;
      fillTime = timeLeft;
      
      $timer.innerHTML = getFormatedTime();
    }
  }
  
  if(!isPasued){
    pausePomodoro();
    startPomodoro();
  }
  
}

//pause pomodoro......
var pausePomodoro = function(){
  isPasued = true;
  clearInterval(intervalCounter);
  clearInterval(fillAnimate);
  $status.innerHTML = "Click Here to Start";
};//pausePomodoro end here....

//startPomodoro on click......
var startPomodoro = function(){
  
  //playAudio on start...
  if(timeLeft==fillTime){
    startAudio.play();
  }
  
  //start timer...
  intervalCounter = setInterval(function(){
    if(timeLeft>0){
      timeLeft--;
      $timer.innerHTML = getFormatedTime();
    }else {
      nextTimer();
      pausePomodoro();
      endAudio.play();
    }
    
  },1000);
  
  
 fillAnimate = setInterval(function() {
    per++;
        if(per <= 100){
          $('.pomodoro').css({background: "linear-gradient(to top, "+fillColor+" "+per+"%,transparent "+per+"%,transparent    100%)"});
    
        }
        
      }, (fillTime*10*100)/(100-per));  
  
  
  isPasued = false;
  $status.innerHTML = "Click Here to Stop";
  
};//startPomodoro finish here....

//nextTimer....
var nextTimer = function() {
  if(isSession){
    isSession = false;
    timeLeft = breakTime * 60;
    fillTime = timeLeft;
    per = 0;
    fillColor = "#c0392b";
    $('.pomodoro').css({background: "linear-gradient(to top, "+fillColor+" "+per+"%,transparent "+per+"%,transparent 100%)"});
    $timer.innerHTML = getFormatedTime();
  }else {
    isSession = true;
    timeLeft = sessionTime * 60;
    fillTime = timeLeft;
    per =0;
    fillColor = "#2ecc71";
    $('.pomodoro').css({background: "linear-gradient(to top, "+fillColor+" "+per+"%,transparent "+per+"%,transparent 100%)"});
    $timer.innerHTML = getFormatedTime();
  }
  
  if(!isPasued){
    pausePomodoro();
    startPomodoro();
  }
  
  
};

//resetTime.....
var resetTime = function() {
  if(isSession){
    pausePomodoro();
    timeLeft = sessionTime * 60;
    fillTime = timeLeft;
    per =0;
     $('.pomodoro').css({background: "linear-gradient(to top, "+fillColor+" "+per+"%,transparent "+per+"%,transparent 100%)"});
    $timer.innerHTML = getFormatedTime();
  }else {
    pausePomodoro();
    timeLeft = breakTime * 60;
    fillTime = timeLeft;
    per =0;
     $('.pomodoro').css({background: "linear-gradient(to top, "+fillColor+" "+per+"%,transparent "+per+"%,transparent 100%)"});
    $timer.innerHTML = getFormatedTime();
  }
};


//document ready start here....
$(document).ready(function(){
  
  //variables...
  
  
  //Change Break Time..........
  $("#dec-break-btn").click(function(){
    onBreakDecBtn();
  });
  
  $("#inc-break-btn").click(function(){
   onBreakIncBtn();
  });
  
  //Change Session Time..........
  $("#dec-session-btn").click(function(){
    onSessionDecBtn();
  });
  
  $("#inc-session-btn").click(function(){
    onSessionIncBtn();
  });
  
  //Click to start......
  $(".pomodoro").click(function(){
    if(isPasued){
      startPomodoro();
     
    }else {
      pausePomodoro();
    }
    
  });
  
  //On next btn click....
  $("#next-btn").click(function(){
    nextTimer();
  });
  
  //on reset btn click.....
  $("#reset-btn").click(function(){
    resetTime();
  });
  
  
});




