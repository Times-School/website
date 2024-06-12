$(document).ready(function(){
    $('.students_slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        centerMode: true,
        focusOnSelect: true,
        prevArrow: $('.students_slider_prev'),
        nextArrow: $('.students_slider_next'),
        responsive: [
            {
              breakpoint: 900,
              settings: {
                centerMode: false,
                focusOnSelect: false,
                slidesToShow: 1,
                slidesToScroll: 1,
              }
            },
        ]
    });
    $('.team_slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        prevArrow: $('.team_slider_prev'),
        nextArrow: $('.team_slider_next'),
    });
});