"use strict";

let basketHolder = $("#basket-holder");
let totalPriceHolder = $("#total-price");
let totalPriceInput = $("#order-total-price")

class Basket{

    constructor(){
        this._events();
    }
    _events(){
        basketHolder.on("click", ".counter-btn", (e) => { this.handleCounter(e) });
    }
    handleCounter(e){
        let target = $(e.target);
        let targetType = target.data("count-type");
        let quantityHolder = target.closest(".counter-holder").find(".quantity");
        let quantity = parseInt(quantityHolder.text());
        let priceHolder = target.closest(".basket-item").find(".price");
        let price = parseFloat(priceHolder.data("original-price"));
        
        quantity = this.getQuantity(targetType, quantity);
        price = this.getPrice(quantity, price);

        quantityHolder.text(quantity);
        priceHolder.text(price);

        this.setTotalPrice();

        return false;
    }
    getQuantity(type, quantity){
        (type === "increase") ? quantity++ : quantity--;
        if(quantity <= 0) quantity = 1;

        return quantity;
    }
    getPrice(quantity, price){
        return (quantity * price).toFixed(2);
    }
    setTotalPrice(){
        let totalPrice = 0;
        let items = basketHolder.find(".basket-item");

        items.each(function(index, el){
            let price = $(el).find(".price");
            totalPrice += parseFloat(price.text());
        });

        totalPrice = totalPrice.toFixed(2);

        totalPriceInput.html(totalPrice)
        totalPriceHolder.text(totalPrice);
    }
}

export default Basket;