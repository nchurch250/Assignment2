import { useState, useEffect } from "react";
import items from "./products.json"



function ProductPage() {
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

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

export default ProductPage;