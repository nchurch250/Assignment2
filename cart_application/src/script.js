import React, { useState, useEffect } from "react";
import items from "./products.json"

function Store() {
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [oneView, setOneView] = useState(false);


    function ProductPage() {


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
            {listItems}
        </div>);
    }

    function CartPage() {

    }

    function OrderPage() {

    }

    const setView = () =>{

    }

    const setView1 = () => {
        if (oneView === 0) setOneView(1)
        else if (oneView === 1) setOneView(2)
        else setOneView(0);
    };

    return(<div>
        <button onClick={setView1}>One</button>

        {oneView === 0 && <ProductPage />}
        {oneView === 1 && <CartPage />}
        {oneView === 2 && <OrderPage />}
    </div>);
}

export default Store;