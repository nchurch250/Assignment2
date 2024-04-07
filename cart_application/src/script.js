import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import items from "./products.json"


function Store() {
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [oneView, setOneView] = useState(0);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [dataF, setDataF] = useState({});
    const [ProductsCategory, setProductsCategory] = useState(items);
    const [query, setQuery] = useState('');

    function ProductPage() {

        useEffect(() => {
            total();
        }, [cart]);

        const render_products = (ProductsCategory) => {
            return (
              <div className="category-section fixed">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-600 category-title">
                  Products ({ProductsCategory.length})
                </h2>
                <div
                  className="m-6 p-3 mt-10 ml-0 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-10"
                  style={{ maxHeight: "800px", overflowY: "scroll" }}
                >
                  {/* Loop Products */}
                  {ProductsCategory.map((product, index) => (
                    <div key={index} className="group relative shadow-lg">
                      <div className=" min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-60 lg:aspect-none">
                        <img
                          alt="Product Image"
                          src={product.image}
                          className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                        />
                      </div>
                      <div className="flex justify-between p-3">
                        <div>
                          <h3 className="text-sm text-gray-700">
                            <a href={product.href}>
                              <span aria-hidden="true" className="absolute inset-0" />
                              <span style={{ fontSize: "16px", fontWeight: "600" }}>
                                {product.title}
                              </span>
                            </a>
                            <div class="col">
                                <button type="button" variant="light" onClick={() => removeFromCart(product)} > - </button>{" "}
                                <button type="button" variant="light" onClick={() => addToCart(product)}> + </button>
                            </div>
                            <p>Tag - {product.category}</p>
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            Rating: {product.rating.rate}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-green-600">
                          ${product.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          };

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

        const handleChange = (e) => {
            setQuery(e.target.value);
            console.log("Step 6 : in handleChange, Target Value :",e.target.value," Query Value :",query);
            const results = items.filter(eachProduct => {
            if (e.target.value === "") return ProductsCategory;
            return eachProduct.title.toLowerCase().includes(e.target.value.toLowerCase())
            });
            setProductsCategory(results);
            }

        return (
            <div>
                <input type="search" value={query} onChange={handleChange} />
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
                            <div>{render_products(ProductsCategory)}</div>
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