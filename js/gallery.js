$(document).ready(function () {

if ($('.data__container').length != 0) {
    $('.data__container').slick({
        variableWidth: true,
        prevArrow: '<div class="data__arrow data__arrow_prev"></div>',
        nextArrow: '<div class="data__arrow data__arrow_next"></div>',
        asNavFor: '.images__container',
    });
}

if ($('.images__container').length != 0) {
    $('.images__container').slick({
        arrows: false,
        variableWidth: true,
        asNavFor: '.data__container',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    rows: 4,
                    slideToShow: 1,
                    centerMode: true,
                }
            },
        ]
    });
}

    /* lightgallery */

    $('#lg').lightGallery();
    $('#lg1').lightGallery();

});
