const numbers = document.querySelector(".j-main__number");
const address = document.querySelector(".j-input-close");
const datalist = document.querySelector("#addressList");

//отгруженные машины
fetch(
  "https://concrete.katren.org/?c=Vehicle_Controller&f=get_total_shipped&v=ViewJSON"
)
  .then((res) => res.json())
  .then((res) => JSON.stringify(+res.models.TotalShipped_Model.rows[0].val))
  .then((res) => {

    numbers.innerHTML = res;
    $(numbers).each(function () {
      var $this = $(this);
      jQuery({ Counter: 0 }).animate(
        { Counter: $this.text() },
        {
          duration: 5000,
          easing: "easeOutCirc",
          step: function () {
            $this.text(Math.ceil(this.Counter));
          },
        }
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });

// подстановка адреса
/* var streets = fetch('https://concrete.katren.org/?c=Destination_Controller&f=complete_for_site&search=Тюмень республики&count=10&v=ViewJSON')
    .then(res => res.json())
    .then(res =>
        JSON.stringify(res.models.DestinationForSiteList_Model),
    )
    .then(res => {
            for(let i = 0; i < res.rows.length; i++){
                datalist.append(
                    `<option value=${i}></option>`
                )
            } 
            for (key in res[rows]) {
                console.log(key);
                datalist.append(`<option value="${key.address}"></option>`)
            } 
            console.log(res);
        })
    .catch(error => {
        console.log(error)
    }); */

// $.getJSON(
//   "https://concrete.katren.org/?c=Destination_Controller&f=complete_for_site&search=Тюмень республики&count=10&v=ViewJSON",
//   function (item) {
//     let addresses = item.models.DestinationForSiteList_Model.rows.map(
//       (p) => p.address
//     );
//     let str = "";
//     for (let i = 0; i < addresses.length; i++) {
//       str += '<option value="' + addresses[i] + '"></option>';
//     }
//     datalist.innerHTML = str;
//   }
// );

// let sum = parseInt($(".j-form__price").text());
// цена по адресу
// $.getJSON(
//   "https://concrete.katren.org/?c=Order_Controller&f=calc_for_site&concrete_type_id=1&quant=1&address=Тюмень Мельничная 83&v=ViewJSON",
//   function (item) {
//     $(document).on("change", "#address", function () {
//       sum = 0;
//       $(".j-delivery-price").html(
//         `${item.models.CalcForSite_Model.rows[0].delivery_cost} ₽`
//       );
//       sum +=
//         parseInt($(".j-delivery-price").text()) +
//         parseInt($(".j-space-price").text());
//       console.log(sum);

//       $(".j-form__price").text(sum + " ₽");
//     });
//   }
// );

/* $(document).ready( function() {
    $(address).autocomplete({
        source: streets
    })
}); */




$("#address").keypress(function(e) {
  const value = e.target.value;

  if(value) {
    datalist.innerHTML = "";

    fetch("https://concrete.katren.org/?c=Destination_Controller&f=complete_for_site&search="+ value +"&count=15&v=ViewJSON")
      .then((res) => res.json())
      .then((res) => {
        let addresses = res.models.DestinationForSiteList_Model.rows.map(
          (p) => p.address
        );
        let str = "";
        for (let i = 0; i < addresses.length; i++) {
          str += '<option value="' + addresses[i] + '"></option>';
        }

        datalist.innerHTML = str;
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

$("#address").change(function(e) {
    const value = e.target.value;
    const quant = $(".j-space-quantity").val();

    if(value) {
      fetch("https://concrete.katren.org/?c=Order_Controller&f=calc_for_site&concrete_type_id=1&quant="+ quant +"&address="+ value +"&v=ViewJSON")
        .then((res) => res.json())
        .then((res) => {
          const model = res.models.CalcForSite_Model;

          console.log(res);

          if(model) {
            const deliveryPrice = model.rows[0]["delivery_cost"];
            const spacePrice = $(".j-space-price").val();
            const meters = model.rows[0]["distance"];
            const distance = parseInt(meters);
              // Math.floor(distance/1000)

            // $(".j-delivery-price").html(
            //   `${deliveryPrice}` + `₽`
            // );

            const sumDelivery = parseInt(deliveryPrice);
              // parseInt($(".j-space-quantity").val()) *

              $(".j-delivery-price").html(
                  `${sumDelivery}` + ` ₽`
              );

            const sum = parseInt($(".j-space-price").text()) + parseInt($(".j-delivery-price").text());

            // console.log(sum);

            $(".j-form__price").text(sum + " ₽");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
});