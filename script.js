       var shopcart = [];
        $(document).ready(function () {
            outputCart();
            
            $('#output').on('click','.remove-item',function(){
                var itemToDelete = $('.remove-item').index(this);
                shopcart.splice(itemToDelete,1);
                sessionStorage["sca"] = JSON.stringify(shopcart);
                outputCart();              
            })
            
            
            $(".productItem").click(function (e) {
                e.preventDefault();
                var iteminfo = $(this.dataset)[0];
                iteminfo.qty = 1;
                var itemincart = false;
                $.each(shopcart, function (index, value) {
                    //console.log(index + '  ' + value.id);
                    if (value.id == iteminfo.id) {
                        value.qty = parseInt(value.qty) + parseInt(iteminfo.qty);
                        itemincart = true;
                    }
                })
                if (!itemincart) {
                    shopcart.push(iteminfo);
                }
                sessionStorage["sca"] = JSON.stringify(shopcart);
                outputCart();
                ///
            })

            function outputCart() {
                if (sessionStorage["sca"] != null) {
                    shopcart = JSON.parse(sessionStorage["sca"].toString());
                    $('#checkoutdiv').show();
                }
                
                var holderHTML = '';
                var total = 0;
                var itemCnt = 0;
                
                $.each(shopcart, function (index, value) {
                    var stotal = value.qty * value.price;
                    total += stotal;
                    itemCnt += parseInt(value.qty);
                    holderHTML += '<tr><td><span class="btn btn-danger remove-item">x</span></td><td>' + value.qty + '</td><td>#' + value.id + ' ' + value.name + '(' + value.s + ')</td><td> ' + formatMoney(value.price) + ' </td><td class="text-xs-right"> ' + formatMoney(stotal) + '</td></tr>';
                })
                holderHTML += '<tr><td colspan="4" class="text-xs-right">Total</td><td class="text-xs-right">' + formatMoney(total) + '</td></tr>';
                
                $('#output').html(holderHTML);
                $('.total').html(formatMoney(total));
                $('.items').html(itemCnt);
            }

            function formatMoney(n) {
                return '₹' + n;
            }
            
            //---
        window.onload=function () {
            let button=$("#btn")
            let number=$(".fa-inverse");
            button.click(function () {
                let num=number.html();
                console.log(num);
                number.html(1+parseInt(num));
            })
        }
           
            //-- new implementation
            $('.add-to-cart').on('click', function () {
                var cart = $('.shopping-cart');
                var imgtodrag = $(this).parent('.item').find("img").eq(0);
                if (imgtodrag) {
                    var imgclone = imgtodrag.clone()
                        .offset({
                        top: imgtodrag.offset().top,
                        left: imgtodrag.offset().left
                    })
                        .css({
                        'opacity': '0.5',
                            'position': 'absolute',
                            'height': '150px',
                            'width': '150px',
                            'z-index': '100'
                    })
                        .appendTo($('body'))
                        .animate({
                        'top': cart.offset().top + 10,
                            'left': cart.offset().left + 10,
                            'width': 75,
                            'height': 75
                    }, 1000, 'easeInOutExpo');
                    
                    setTimeout(function () {
                        cart.effect("shake", {
                            times: 2
                        }, 200);
                    }, 1500);
        
                    imgclone.animate({
                        'width': 0,
                            'height': 0
                    }, function () {
                        $(this).detach()
                    });
                }
            });
        })

       