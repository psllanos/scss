$(window).load(function() {
    $(".loading").addClass("spin");
  
    setTimeout(function() {
      var currentPositon = $(".loading").css("transform");
      console.log(currentPositon)
      $(".loading").addClass("class").css("transform", currentPositon).css("transform", "none")
      $(".loading").animate({
  
      }, 500, function() {
        increaseWidth();
      });
    }, 1985);
  
    function increaseWidth() {
      $(".loading").animate({
  
        width: "+=100%",
      }, 2500, function() {
        slide();
        removeLine();
        moveTextRight();
        moveTextLeft();
      });
    }
  
    function removeLine() {
      $(".loading").animate({
  
        width: "0%",
      }, 2500, function() {});
    }
  
    function goUp() {
      $(".up").show();
      $(".up").animate({
        top: "-=50%"
      }, 2500, function() {
        $(this).hide();
      });
    }
  
    function goDown() {
      $(".down").show();
      $(".down").animate({
        bottom: "-=50%"
      }, 2500, function() {
        $(this).hide();
      });
    }
  
    function slide() {
      goUp();
      goDown();
    }
  
  });