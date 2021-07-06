const numbers =  document.querySelector('.j-main__number');

fetch('https://concrete.katren.org/?c=Vehicle_Controller&f=get_total_shipped&v=ViewJSON')
    .then(res => res.json())
    .then(res =>
        JSON.stringify(+res.models.TotalShipped_Model.rows[0].val),
        )
    .then(res => {
        console.log(res);
        numbers.innerHTML = res;
        $(numbers).each(function () {
            var $this = $(this);
            jQuery({Counter: 0}).animate({Counter: $this.text()}, {
                duration: 5000,
                easing: 'easeOutCirc',
                step: function () {
                    $this.text(Math.ceil(this.Counter));
                }
            });
        });;
    })
    .catch(error => {
        console.log(error)
    })



