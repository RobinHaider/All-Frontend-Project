//search function...............

function search(input){
    $(".box").hide();
    $(".after-search").show();
    $(".search-result").empty();
    $("input").val(input);
    if(input.length>0){
      $.getJSON("https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + encodeURI(input) + "&callback=?", function(data){
        
        //if no result found....
        if(data[1].length == 0){
          $(".search-result").append('<br><p>There were no results matching the query.</p><p>The page <strong>"' + $("input").val() + '"</strong> does not exist. You can <a href="https://en.wikipedia.org/wiki/Wikipedia:Articles_for_creation" target="_blank" rel="noopener noreferrer">ask for it to be created.</a></p><ul><li>Make sure that all words are spelled correctly.</li><li>Try different keywords</li><li>Try more general keywords.</li></ul>');
        }
        
        for(var i=0; i<data[1].length; i++){
          $(".search-result").append("<div class='content content-" + i + "'></div>");
          $(".content-" + i).append("<h4>" + data[1][i] + "</h4>");
          $(".content-" + i).append("<p>" + data[2][i] + "</p>");
          $(".content-" + i).append("<hr>");
          $(".content-" + i).append("<a href='" + data[3][i] + "' target='_blank' rel='noopener noreferrer'>Read more</a>");
          $(".content-" + i).append("<a href='https://en.wikipedia.org/w/index.php?title=" + encodeURI(data[1][i]) + "&action=edit' target='_blank' rel='noopener noreferrer'>Edit Source</a>")
        }
        
        
      });
    }
  }
  //search function end here.....................................
  
  
  //document ready start here..............
  $(document).ready(function(){
    
    $("input").val("");
    $("input").focus();
    //primary search btn.......
    $("#search-btn").on("click", function(){
      var input = $("#search-box").val();
      if(input.length>0){
        search(input);
      }
      
    });
    //primary search box on enter key down.....
     $("#search-box").on("keydown", function(e){
       if (e.which == 13 || e.keyCode == 13){
         var input = $("#search-box").val();
         if(input.length>0){
        search(input);
          } 
         
       }
    });
    
    
    //top bar search button......
    $("#top-bar-button").on("click", function(){
      var input = $("#search-box-after").val();
      if(input.length>0){
           search(input);
         }
    });
    //top bar search box enter key down......
    $("#search-box-after").on("keydown", function(e){
      if(e.which == 13 || e.keycode == 13){
        var input = $("#search-box-after").val();
         if(input.length>0){
           search(input);
         }
      }
    });
    
    
    //autocomplete............
    $("input").autocomplete({
      source: function(request, response){
        $.ajax({
          url: "https://en.wikipedia.org/w/api.php",
          dataType: "jsonp",
          data: {
            "action": "opensearch",
            "format": "json",
            "limit": 5,
            "search": request.term
          },
          success: function(data){
            response(data[1]);
          }
        });
      },
       select: function(event, ui){
        if (event.which === 1){
          search(ui.item.value);
        }
      }
    });
    //autocomplete end here................
    
    
    
  });
  //document ready function end here........