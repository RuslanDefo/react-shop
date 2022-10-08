import React from 'react';
import {Card} from "../components/Card/Card";
import axios from "axios";
import AppContext from "../context";


export function Orders() {
    const {onAddToCart, onAddFavorite} = React.useContext(AppContext)
    let [orders, setOrders] = React.useState([]);
    let [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        (async () => {
            try {
                const {data} = await axios.get('https://62a06b85a9866630f80e70ab.mockapi.io/api/v1/orders');
                setOrders(data.map((obj) => obj.items).flat())
                setIsLoading(false)
            } catch (error) {
                alert('ошибка получения данных');
            }
        })();
    }, [])

    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>Мои заказы</h1>

            </div>

            <div className="d-flex flex-wrap">
                {(isLoading ? [...Array(10)] : orders).map((obj, index) => (
                    <Card
                        key={index}
                        loading={isLoading}
                        {...obj}
                    />
                ))}
            </div>
        </div>
    );
}

