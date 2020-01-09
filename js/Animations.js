function animation() {
    var width = "+=" + window.innerWidth / 1.5;

    function goRight() {
        $("#animate").css("transform","rotateY(0deg)").animate({
        left: width
      }, 5000, function() {
         setTimeout(goLeft, 50);
      });
    }
    function goLeft() {
        $("#animate").css("transform","rotateY(180deg)").animate({
        left: 0
      }, 5000, function() {
         setTimeout(goRight, 50);
      });
    }

    setTimeout(goRight, 50);
}

$(document).ready(animation);