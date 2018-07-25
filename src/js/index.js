import $ from "jquery";
import Swiper from "swiper";

(function() {
  'use strict';

  $(document).ready(function() {

    window.addEventListener('touchstart', function() {
      // the user touched the screen!
      $('body').addClass('touch-enabled');
    });

    // Home page carousel
    const swiper = new Swiper('.swiper-container', {
      spaceBetween: 10,
      slidesPerView:'auto',
      centeredSlides: true,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  });

}());
