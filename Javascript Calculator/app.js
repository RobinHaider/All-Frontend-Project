/* variables......*/
var numbers = [];
var operators = "";
var all = "";
var lastClickNumberBtn = false;
var lastClickOperator = true;




//onNumberClick....
function onNumbersClick(num){
  
  //for firstNumberInput.....
  if(!lastClickNumberBtn){
    //canNot Input Zero as a first letter....
      if(num != "0"){
        //If firstLetter is point then add zero before it....
          if(num == '.'){
            num = '0.'
          }
          lastClickOperator = false;
          lastClickNumberBtn = true;
          numbers.push(num);
          all += num;
          document.getElementById("history").innerHTML = all;
          document.getElementById("entry").innerHTML = num;
      }
    }else {
        var previousNumbers = "" +  numbers[numbers.length-1];
        //Number Input when it is not for a firstDigit....
        //when point as a input checking there already has a point or not...
        //Maximum input length is 8 number...
        if(previousNumbers.length < 8 && all.length < 15){
            if(num == "."){
              if(previousNumbers.indexOf(".") == -1){
                all += num;
                document.getElementById("history").innerHTML = all;
                document.getElementById("entry").innerHTML = num;
                num = "" +  previousNumbers + "" + num;
                numbers[numbers.length-1] = num;
              }
            }else {
              all += num;
              document.getElementById("history").innerHTML = all;
              document.getElementById("entry").innerHTML = num;
              num = "" +  previousNumbers + "" + num;
              numbers[numbers.length-1] = num;
            }
        }

      
    }
  
}

//addToNumberArray....
function addToNumberArray(num){
  
}

//onOperatiorClick.......
function onOperatorClick(operator, operatorText){
  if(!lastClickOperator && operators.length <1) {
    lastClickOperator = true;
    lastClickNumberBtn = false;
    operators = operator;
    all += operatorText;
    document.getElementById("history").innerHTML = all;
    document.getElementById("entry").innerHTML = operatorText;
  }else if(!lastClickOperator && operators.length == 1){
    var total = calculate();
    operators = operator;
    lastClickOperator = true;
    lastClickNumberBtn = false;
    all = "" + total + operatorText;
    document.getElementById("history").innerHTML = all;
    document.getElementById("entry").innerHTML = operatorText;
  }
  
}

//alClearButtonClick....
function onCbuttonClick(){
  lastClickNumberBtn = false;
  lastClickOperator = true;
  all = "";
  numbers = [];
  operators = "";
  document.getElementById("history").innerHTML = "0";
  document.getElementById("entry").innerHTML = "0";
}


//onbackspaceButton click......
function onBackspaceClick(){
  
  document.getElementById("entry").innerHTML = "&larr;";
  var reg = new RegExp('^[0-9\.]$');
  var lastLetter = all.charAt(all.length - 1);
  var isLastLetterNumber = reg.test(lastLetter);
  
   
  
  //if it is number....
  if(isLastLetterNumber){
    //check numberlength...
    //delete from number array
    //delete from all
    //show in history..
    var lastNumber = "" + numbers[numbers.length-1];
    
    if(lastNumber.length == 1){
      numbers.splice(-1, 1);
    }else {
      lastNumber = lastNumber.slice(0, -1);
      numbers[numbers.length-1] = parseFloat(lastNumber);
    }
    all = all.slice(0, -1);
    document.getElementById("history").innerHTML = all;
      
  }else {
    operators = "";
    all = all.slice(0, -1);
    document.getElementById("history").innerHTML = all;
  }
  
  //after delete checking lastLetter is number or not...
  lastClickNumberBtn = reg.test(all.charAt(all.length - 1));
  lastClickOperator = !(reg.test(all.charAt(all.length - 1)));
}

//onEqualButtonclick.......
function onEqualClick(){
  
  var total = calculate();
    if(total.toString().length <= 9){
      if(total.toString().length > 0 && !lastClickOperator){
      document.getElementById("entry").innerHTML = "" + total;
      //all += ("=" + total);
      document.getElementById("history").innerHTML = all;
      //clearAll
      all = "";
      numbers = [];
      operators = "";
      lastClickNumberBtn = false;
      lastClickOperator = true;
    }
  }else {
      document.getElementById("entry").innerHTML = "" + 0;
      //all += ("=" + total);
      document.getElementById("history").innerHTML = "Max limit met";
      //clearAll
      all = "";
      numbers = [];
      operators = "";
      lastClickNumberBtn = false;
      lastClickOperator = true;
  }
  
      
        
      
      
}//equal function end here.....
  
  



//Calculate Function.....
function calculate(){
  var total = parseFloat(numbers[0]);
  
  switch(operators){
        case "+":
          total += parseFloat(numbers[1]);
          break;
        case "-":
          total -= parseFloat(numbers[1]);
          break;
        case "*":
          total *= parseFloat(numbers[1]);
          break;
        case "/":
          total /= parseFloat(numbers[1]);
          break;
        }//switchEndHere...
  numbers = []; //empty array
  total = total.toFixed(2);
  if(total.toString().charAt(total.length-1) == 0){
     total = parseFloat(total.toString().slice(0,-1));
  }
  if(total.toString().charAt(total.length-1) == 0){
    total = parseInt(total);
  }
  numbers.push(total); //pushing the total to the array 
  return total;
}//calculate function end here....




//document ready function .......
$(document).ready(function(){
  
  
  
  //onNumberButtonsClick.....
  $(".number").click(function(){
   var num = $(this).val();
    onNumbersClick(num);
  });
  
  
  
  //onOperetorButtonsClick....
  $(".operator").click(function(){
    var operator = $(this).val();
    var operatorText = $(this).text();
    onOperatorClick(operator, operatorText);
  });
  
  
  
  //onCbuttonClick.....
  $("#allClear-btn").click(function(){
    onCbuttonClick();
  });
  
  
  
  //onEqualButtonClick....
  $("#equal-btn").click(function(){
    onEqualClick();
  });
  
  //onbackspaceButton click....
  $("#backspace").click(function(){
    onBackspaceClick();
  });
  
  
});
//document ready end here..............





/* Algorithom for multiple number calculation at a time...
 var total = parseFloat(numbers[0]);
  
  if(total > 0 && !lastClickOperator){
      for(var i=0; i<numbers.length-1; i++){
    
      switch(operators[i]){
        case "+":
          total += parseFloat(numbers[i+1]);
          break;
        case "-":
          total -= parseFloat(numbers[i+1]);
          break;
        case "*":
          total *= parseFloat(numbers[i+1]);
          break;
        case "/":
          total /= parseFloat(numbers[i+1]);
          break;
        }//switchEndHere...

      }//forLoopEndHere...
      total = total.toFixed(2);
      
        //document.getElementById("entry").innerHTML = "0";
        //document.getElementById("history").innerHTML = "Digit Limit Met";
        document.getElementById("entry").innerHTML = total;
        all += ("=" + total);
        document.getElementById("history").innerHTML = all;
        //clearAll
        all = "";
        numbers = [];
        operators = [];
        lastClickNumberBtn = false;
        lastClickOperator = true;
      
      ..................................................*/





