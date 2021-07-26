$(document).ready( function() {
    $("#phone").mask("+7(999) 999-9999");
    //замена инст на инстаграм
    if((window).innerWidth >= 1024) {
        $('.contact__social-link--inst').text('instagram')
    }


    //показ и скрытие меню
    if($('.j-header__nav').length) {

        let icon = $('.j-nav__icon')
        let wrapper = $('.j-nav__items-wrapper')
        let nav = $('.j-header__nav')
        let body = $('body')

        $(icon).click(function(e) {

            if($(nav).hasClass('is-active')) {

                $(nav).removeClass('is-active')
                $(body).removeClass('overflow')
                wrapper.hide()


            }

            else {

                $(nav).addClass('is-active')
                wrapper.show()

                if((window).innerWidth < 768) {
                    $(body).addClass('overflow')
                }
            }
        })
    }


    //если в инпуте есть значение то
    // не опускаем плейсхолдер
    if($('.form__input-area').length) {

        $('.form__input-area input').each(function() {

            $(this).on('change keyup focusout',function() {
                if($(this)[0].value.length < 1) {
                    $(this).closest('.form__input-area').removeClass('is-active')
                }
                else {
                    $(this).closest('.form__input-area').addClass('is-active')
                }
            })

        })

        $('.form__input-area textarea').each(function() {

            $(this).on('change keyup focusout',function() {
                if($(this)[0].value.length < 1) {
                    $(this).closest('.form__input-area').removeClass('is-active')
                }
                else {
                    $(this).closest('.form__input-area').addClass('is-active')
                }
            })

        })
    }


    if($('.kviz__blocks').length) {
        let kviz = $('.j-kviz')
        let step1 = $('.j-kviz-1')
        let step2 = $('.j-kviz-2')
        let step3 = $('.j-kviz-3')
        let end = $('.j-kviz-end')
        let beton = $(end.find('span'))
        let current = $('.j-kviz-current')
        let button = $('.kviz__button')
        let calcBlock = $('.j-kviz-calc')
        let betonPrice = $('.j-beton-price')
        let inputList = $('.j-form__input-list')

        //показываем, скрываем блоки в зависимости от выбора
        $('.kviz__blocks input').on('change', function() {
            if($(this).data('type') == 'фундамент') {
                step1.slideUp(200)
                step2.slideDown(200)
            }

            else if($(this).data('type') == 'дом') {
                step2.slideUp(200)
                step3.slideDown(200)
            }

            else {
                step1.slideUp(200)
                step2.slideUp(200)
                step3.slideUp(200)
                end.slideDown(200)
                button.addClass('is-active')
            }

            current.slideDown(200)
            current.find('.kviz__item span').text($(this).closest('label').find('span').text())
            beton.text($(this).data('beton'))

        })

        //Скрываем все кроме первого блока при нажатии на последний выбор и обнуляем радио
        $(current).click( function() {
            step1.slideDown(200)
            step2.slideUp(200)
            step3.slideUp(200)
            end.slideUp(200)
            current.slideUp(200)
            button.removeClass('is-active')

            $('.kviz__blocks input').each( function() {
                $(this).prop('checked', false);
            })
        })

        //При клике на кнопку рассчитать показываем блок с калькулятором
        //скрываем все блоки
        $(button).click( function() {
            if($(this).hasClass('is-active')) {
                calcBlock.slideDown(200)
                kviz.slideUp(200)
                button.removeClass('is-active')

                let betonLength = beton.text().split(" ").length - 1;
                let betonVal = beton.text().split(" ")[betonLength];//берем последнее значение в выбранном бетоне
                if ($('input[data-type="стяжка"]').prop('checked') == true) {
                    betonVal = beton.text().split(" ")[betonLength] //делим на пробелы
                    betonVal = betonVal.slice(0, -1)//удаляем последнюю кавычку
                    $(inputList).find('input').each( function() {

                        if($(this).val() == betonVal) {
                            $(this).prop('checked', true)
                            $(this).change()
                        }
                    })

                } else {
                    $(inputList).find('input').each( function() {

                        if($(this).val() == betonVal) {
                            $(this).prop('checked', true)
                            $(this).change()
                        }
                    })
                }



            }
        })

    }


    //блок с маркой бетона
    if($('.j-form__input-list').length) {
        let inputCalc = $('.form__input--calc')
        let block = $('.j-form__input-list')
        let beton = $('.j-form__input--calc')

        //показываем и скрываем его
        $(inputCalc).click(function() {

            if($(block).hasClass('is-active')) {
                $(block).closest('.form__input-area').find('svg').removeClass('is-active')
                $(block).removeClass('is-active')

            }
            else {
                $(block).closest('.form__input-area').find('svg').addClass('is-active')
                $(block).addClass('is-active')
            }
        })


        // передаем в инпут марки бетона в валуе выбраный тип бетона
        // и скрываем блок



        $(block).find('input').change( function () {
            $(block).find('input').each(function() {
                $(this).closest('label').removeClass('is-active')
            })
            $('.j-beton-price').text($(this).data('cost')+ ' ₽')
            let data = $(this).closest('label').text()
            $(beton).val(data)
            $(block).removeClass('is-active')
            $(this).closest('label').addClass('is-active')
        })


        let bSpace =  parseInt($('.j-space-price').text()) || 0;
        let bType = parseInt($('.j-beton-price').text()) || 0;


        $(document).on('change', '.j-form__input-list input, input[name="userSpace"]', function() {
            let sumBeton = 0
            $('.j-space-price').text($('.j-space-price').closest('.form__input-area').find('input').val() * parseInt($('.j-beton-price').text() || 0)+ ' ₽')

            bSpace =  parseInt($('.j-space-price').text()) || 0;
            bType = parseInt($('.j-beton-price').text()) || 0;
            sumBeton += bSpace
            console.log(bSpace);
            console.log(bType);
            $('.j-form__price').text(sumBeton + ' ₽')
        })

    }


    //показываем и скрывает крестик и при нажатии на него обнуляем валуе
    if($('.j-input-close').length) {

        let input = $('.j-input-close')

        $(input).on('change', function() {
            if($(this)[0].value.length) {
                let svg = $(this).closest('.form__input-area').find('svg.svg-close')
                svg.show()

                $(svg).click(function() {
                    $(this).closest('.form__input-area').find('input').val("");
                    sumBeton = parseInt($(".j-form__price").text()) - parseInt($(".j-delivery-price").text())
                    $(".j-delivery-price").html("0 ₽");
                    $(this).closest('.form__input-area').removeClass('is-active')
                    svg.hide();
                    $('.j-form__price').text(sumBeton + ' ₽')
                })
            }
        })
    }


    /* #VALIDATE */

    $('#form').validate({
        rules: {
            userPhone: {
                required: true,
            },
            userName: {
                required: true,
            },
            userBeton: {
                required: true
            },
            userSpace: {
                required: true
            },
            userAdress: {
                required: true
            }
        },
        messages: {
            userPhone: {
                required: "Телефон",
                number: "Введите корректный телефон"
            },
            userName: {
                required: "Имя",
            },
            userBeton: {
                required: "Выберите марку бетона",
            },
            userSpace: {
                required: "Выберите объём",
            },
            userAdress: {
                required: "Введите район доставки",
            },
        }
    });

    $('#formContact').validate({
        rules: {
            userPhone: {
                required: true,
            },
            userName: {
                required: true,
            }
        },
        messages: {
            userPhone: {
                required: "Телефон",
                number: "Введите корректный телефон"
            },
            userName: {
                required: "Имя",
            },
        }
    })

    /* #VALIDATE-END */

});
