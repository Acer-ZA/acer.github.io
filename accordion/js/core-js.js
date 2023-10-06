/* 
**********************************************************
   Huble SnapDocs Accordion Replication
   by Theo du Plooy
   081 415 6287 | tdpcorp@gmail.com
***********************************************************
 */


$(document).ready(function(){
  /// Initialise Accordion ///
  $('#accordion [data-accordion]').accordion();
  $(".acc-control").on("click",function(){
    var getThisTarget = $(this).attr("acc-target");
    var checkIfActive = $(this).parent().hasClass("open");
    if (checkIfActive) {
      /// Clears the accordion image + animation
      $(".accordion-img-actual").removeAttr("acc-img");
      $(".accordion-img-actual").removeClass("acc-img-animate");
      setTimeout(function(){
        /// Assigns the accordion image based on the selected accordion target
        /// + adds accordion image animation(transition) class
        $(".accordion-img-actual").attr("acc-img","img-"+getThisTarget);
        $(".accordion-img-actual").addClass("acc-img-animate");
      },200);
    }
    else {
      /// If the accordion is not open, clear the accordion image/animation
      $(".accordion-img-actual").removeAttr("acc-img");
      $(".accordion-img-actual").removeClass("acc-img-animate");
    }
  });
});