/* 
**********************************************************
   Huble MonolithAI Slider Replication
   by Theo du Plooy
   081 415 6287 | tdpcorp@gmail.com
***********************************************************
 */


$(document).ready(function(){
  /// Initialise Slider ///
  $('.slider').slick({
      infinite: true,
      arrows: false,
      autoplay: true,
      dots: false,
      speed: 2800,
      slidesToShow: 5,
      pauseOnHover: true,
      responsive: [
      {
        breakpoint: 800,
        settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: false,
        arrows: false
      }
      }
    ]
  });
});