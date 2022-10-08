import Info from "./info";
import React from "react";
import AppContext from "../context";
import axios from "axios";

const delay = () => new Promise((resolve) => setTimeout(resolve, 1000))

export function Drawer({onClose, onRemove, items = []}) {
    const {cartItems, setCartItems} = React.useContext(AppContext);
    const [isCompleted, setIsCompleted] = React.useState(false)
    const [orderId, setOrderId] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(false)

    const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

    const onClickOrder =async () => {
        try {
            setIsLoading(true)
            const {data} = await axios.post('https://62a06b85a9866630f80e70ab.mockapi.io/api/v1/orders', {
                items: cartItems,
            });

            setOrderId(data.id)
            setIsCompleted(true);
            setCartItems([]);

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete('https://62a06b85a9866630f80e70ab.mockapi.io/api/v1/cart/' + item.id);
                await delay();
            }


        } catch (error) {
            alert('Не удалось создать заказ =(')
        }
        setIsLoading(false)
    };

    return (
        <div className="overlay">
            <div className="drawer">
                <h2 className="d-flex justify-between mb-30">
                    Корзина <img className="cu-p" src="/img/btn-remove.svg" alt="Remove" onClick={onClose}/>
                </h2>

                {
                    items.length > 0 ?
                        <div className="d-flex flex-column flex">
                            <div className="items">

                                {items.map((obj) =>
                                    <div className="cartItem d-flex align-center mb-20" key={obj.id}>
                                        <div
                                            style={{backgroundImage: `url(${obj.imageUrl})`}}
                                            className="cartItemImg"/>

                                        <div className="mr-20 flex">
                                            <p className="mb-5">{obj.name}</p>
                                            <b>{obj.price} бачей</b>
                                        </div>
                                        <img onClick={() => onRemove(obj.id)} className="removeBtn"
                                             src="/img/btn-remove.svg"
                                             alt="Remove"/>
                                    </div>
                                )}
                            </div>
                            <div className="cartTotalBlock">
                                <ul>
                                    <li>
                                        <span>Итого:</span>
                                        <div></div>
                                        <b>{totalPrice} руб. </b>
                                    </li>
                                    <li>
                                        <span>Налог 5%:</span>
                                        <div></div>
                                        <b>{totalPrice /100 * 5} руб. </b>
                                    </li>
                                </ul>
                                <button disabled={isLoading} onClick={onClickOrder} className="greenButton">
                                    Оформить заказ <img src="/img/arrow.svg" alt="Arrow"/>
                                </button>
                            </div>
                        </div>
                        : (
                            <Info title={isCompleted ? "Заказ оформлен!" : "Корзина пустая"} description={isCompleted? `Ваш заказ номер ${orderId} передан курьеру!` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."} image={isCompleted ? "/img/complete-order.jpg" : "/img/empty-cart.jpg"}/>
                        )}


            </div>
        </div>
    );
}

