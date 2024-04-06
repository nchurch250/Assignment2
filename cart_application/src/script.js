import React, { useState, useEffect } from "react";
import items from "./products.json"

function Store() {
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [oneView, setOneView] = useState(false);


    function ProductPage() {

        useEffect(() => {
            total();
        }, [cart]);

        const total = () => {
            let totalVal = 0;
            for (let i = 0; i < cart.length; i++) {
                totalVal += cart[i].price;
            }
            setCartTotal(totalVal);
        };

        const addToCart = (el) => {
            setCart([...cart, el]);
        };

        const removeFromCart = (el) => {
            let itemFound = false;
            const updatedCart = cart.filter((cartItem) => {
                if (cartItem.id === el.id && !itemFound) {
                    itemFound = true;
                    return false;
                }
                return true;
            });
            if (itemFound) {
                setCart(updatedCart);
            }
        };

        const listItems = items.map((el) => (
            <div key={el.id}>
                <img class="img-fluid" src={el.image} width={150} /> <br />
                {el.title} <br />
                {el.category} <br />
                {el.price} <br />

                <button type="button" onClick={() => removeFromCart(el)}>-</button>{" "}
                <button type="button" variant="light" onClick={() => addToCart(el)}> + </button>

            </div>
        ));

        return (<div>
            <h1>Browse Items</h1>
            {listItems}
        </div>);
    }

    function CartPage() {
        const cartItems = cart.map((el) => (
            <div key={el.id}>
                <img class="img-fluid" src={el.image} width={150} />
                {el.title}
                ${el.price}
            </div>
        ));

        return (<div>
            <div>Your Cart</div>
            <div>{cartItems}</div>
            <div>Order total to pay :{cartTotal}</div>

        </div>);
    }

    function OrderPage() {



        return (<div>
            <h1>A confirmation of the order will go here</h1>
        </div>);
    }


    const setView = () => {
        if (oneView === 0) setOneView(1)
        else if (oneView === 1) setOneView(2)
        else setOneView(0);
    };

    return (<div>
        <button onClick={setView}>One</button>

        {oneView === 0 && <ProductPage />}
        {oneView === 1 && <CartPage />}
        {oneView === 2 && <OrderPage />}
    </div>);
}

export default Store;