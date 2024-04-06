import React, { useState, useEffect } from "react";
import items from "./products.json"

function Store() {
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [oneView, setOneView] = useState(0);
    

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
            // PRODUCT
            <div class="row border-top border-bottom" key={el.id}>
              <div class="row main align-items-center">
                <div class="col-2">
                  <img class="img-fluid" src={el.image} />
                </div>
                <div class="col">
                  <div class="row text-muted">{el.title}</div>
                  <div class="row">{el.category}</div>
                </div>
                <div class="col">
                  <button type="button" variant="light" onClick={() => removeFromCart(el)} > - </button>{" "}
                  <button type="button" variant="light" onClick={() => addToCart(el)}> + </button>
                </div>
                <div class="col">
                  ${el.price} <span class="close">&#10005;</span>
                  {howManyofThis(el.id)}
                </div>
              </div>
            </div>
          ));

          function howManyofThis(id) {
            let hmot = cart.filter((cartItem) => cartItem.id === id);
            return hmot.length;
          }

          return (
            <div>
              INSERT TEXT HERE
              <div class="card">
                <div class="row">
                  {/* HERE, IT IS THE SHOPING CART */}
                  <div class="col-md-8 cart">
                    <div class="title">
                      <div class="row">
                        <div class="col">
                          <h4>
                            <b>Dalton & Nathan's Epic Store</b>
                          </h4>
                        </div>
                        <div class="col align-self-center text-right text-muted">
                          Products selected {cart.length}
                        </div>
                      </div>
                    </div>
                    <div>{listItems}</div>
                  </div>
                  <div class="float-end">
                    <p class="mb-0 me-5 d-flex align-items-center">
                      <span class="small text-muted me-2">Order total:</span>
                      <span class="lead fw-normal">${cartTotal}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
    }

    function CartPage() {
        const cartItems = cart.map((el) => (
            <div key={el.id}>
              <img class="img-fluid" src={el.image} width={150} />
              {el.title}${el.price}
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

    const returnView = () => {
        if (oneView === 0) setOneView(2)
        else if (oneView === 2) setOneView(1)
        else setOneView(0);
    };

    return (<div>
        {oneView === 0 && <button onClick={setView}>Cart</button>}
        {oneView === 1 && <button onClick={returnView}>Back to Products</button>}
        {oneView === 1 && <button onClick={setView}>Checkout</button>}
        {oneView === 2 && <button onClick={returnView}>Return</button>}

        {oneView === 0 && <ProductPage />}
        {oneView === 1 && <CartPage />}
        {oneView === 2 && <OrderPage />}
    </div>);
}

export default Store;