// import $ from "jquery";
// import validate from "jquery-validation"

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

        // $(document).click(function (e) {
        //     if ( !block.is(e.target) && !block.is(e.target) && block.has(e.target).length === 0) {
        //         $(block).removeClass('is-active')
        //     };
        // });
        

        // передаем в инпут марки бетона в валуе выбраный тип бетона 
        // и скрываем блок

        

        $(block).find('input').change( function () { 
            // $('.j-form__input--calc').trigger('change')
            $(block).find('input').each(function() {
                $(this).closest('label').removeClass('is-active')
            })
            let data = $(this).closest('label').text()
            $(beton).val(data)
            $(block).removeClass('is-active')
            $(this).closest('label').addClass('is-active')
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
                    $(this).closest('.form__input-area').find('input').val("")
                    $(this).closest('.form__input-area').removeClass('is-active')
                    svg.hide()
                })
            }
        })
    }

    /* #VALIDATE */

        $('#formBeton').validate({
            rules: {
                userBeton: {
                    required: true
                },
                userSpace: {
                    required: true
                },
                userAdress: {
                    required: false
                }
            },
            messages: {
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
        })
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
                }
            }
        })
    

    /* #VALIDATE-END */

})
