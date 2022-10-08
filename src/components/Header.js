import {Link} from 'react-router-dom';
import React from "react";
import AppContext from "../context";

export function Header(props) {

    const {cartItems} = React.useContext(AppContext);
    const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

    return (
        <header className="d-flex justify-between align-center p-40">
            <Link to="/">
                <div className="d-flex align-center">
                    <img width={40} height={40} src="/img/logo.png" alt="logotype"/>
                    <div>
                        <h3 className="text-uppercase">React Абибас</h3>
                        <p className="opacity-5">Магазин лучших кроссовок</p>
                    </div>
                </div>
            </Link>
            <ul className="d-flex">
                <li className="mr-30 cu-p" onClick={props.onClickCart}>
                    <img width={18} height={18} src="/img/cart.svg" alt="cart"/>
                    <span>{totalPrice} руб.</span>
                </li>
                <li>
                    <Link to="/favorites">
                        <img className="mr-30 cu-p" width={18} height={18} src="/img/heart.svg" alt="favs"/>
                    </Link>
                </li>
                <li>
                    <Link to="/orders">
                        <img width={18} height={18} src="/img/user.svg" alt="user"/>
                    </Link>
                </li>
            </ul>
        </header>
    );
}

