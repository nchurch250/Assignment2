import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import items from "./products.json"

function Store() {
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [oneView, setOneView] = useState(0);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [dataF, setDataF] = useState({});

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

        const onSubmit = data => {
            console.log(data); // log all data
            console.log(data.fullName); // log only fullname
            // update hooks
            setDataF(data);
            setView(1);
        }

        const cartItems = cart.map((el) => (
            <div key={el.id}>
                <img class="img-fluid" src={el.image} width={150} />
                {el.title} ${el.price} Quantity: 1
            </div>
        ));



        return (<div>
            <h2>Your Cart</h2>
            <div>{cartItems}</div>
            <div>Order total to pay: ${cartTotal}</div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("fullName", { required: true })} placeholder="Full Name" />
                {errors.fullName && <p>Full Name is required.</p>}
                <input {...register("email", { required: true, pattern: /^\S+@\S+$/i })} placeholder="Email" />
                {errors.email && <p>Email is required.</p>}
                <input {...register("creditCard", { required: true })} placeholder="Credit Card" />
                {errors.creditCard && <p>Credit Card is required.</p>}
                <input {...register("address", { required: true })} placeholder="Address" />
                {errors.address && <p>Address is required.</p>}
                <input {...register("city", { required: true })} placeholder="City" />
                {errors.city && <p>City is required.</p>}
                <input {...register("state", { required: true })} placeholder="State" />
                {errors.state && <p>State is required.</p>}
                <input {...register("zip", { required: true })} placeholder="Zip" />
                {errors.zip && <p>Zip is required.</p>}

                <button type="submit">Order</button>
            </form>

        </div>);
    }

    function OrderPage() {

        const updateHooks = () => {
            setView(2);
            setDataF({});
            setCart([]);
        };

        const cartItems = cart.map((el) => (
            <div key={el.id}>
                <img class="img-fluid" src={el.image} width={150} />
                {el.title}${el.price}
            </div>
        ));

        return (<div>
            <h2>Ordered Products</h2>
            <div>{cartItems}</div>

            <h1>Payment summary:</h1>
            <h3>{dataF.fullName}</h3>
            <p>{dataF.email}</p>
            <p>{dataF.creditCard}</p>
            <p>Billing Address: {dataF.address}</p>
            <p>{dataF.city}, {dataF.state} {dataF.zip} </p>

            <p>Subtotal: {cartTotal}</p>
            <p>Tax: +{Math.floor((cartTotal * .07) * 100) / 100}</p>
            <p>Total: {(Math.floor((cartTotal * .07) * 100) / 100) + cartTotal}</p>

            <button onClick={updateHooks}>Done</button>
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
        {oneView === 2 && <button onClick={returnView}>Return</button>}

        {oneView === 0 && <ProductPage />}
        {oneView === 1 && <CartPage />}
        {oneView === 2 && <OrderPage />}
    </div>);
}

export default Store;