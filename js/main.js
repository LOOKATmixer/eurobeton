$(document).ready(function() {
    $('.j-main__number').each(function () {
        var $this = $(this);
        jQuery({Counter: 0}).animate({Counter: $this.text()}, {
            duration: 3000,
            easing: 'swing',
            step: function () {
                $this.text(Math.ceil(this.Counter));
            }
        });
    });
});

fetch('https://eurobeton.katren.org')
    .then(res => console.log(res))