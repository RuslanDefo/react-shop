import {Card} from './components/Card/Card'
import axios from 'axios';
import {Header} from "./components/Header";
import {Drawer} from "./components/Drawer";
import React from "react";


function App() {
    let [items, setItems] = React.useState([]);
    let [cartItems, setCartItems] = React.useState([]);
    let [favorites, setFavorites] = React.useState([]);
    let [searchValue, setSearchValue] = React.useState('');
    let [cartOpened, setCartOpened] = React.useState(false);

    React.useEffect(() => {
        axios.get('https://62a06b85a9866630f80e70ab.mockapi.io/api/v1/boots').then((res) => {
        setItems(res.data);
        });
        axios.get('https://62a06b85a9866630f80e70ab.mockapi.io/api/v1/cart').then((res) => {
            setCartItems(res.data);
        });
    }, []);

    const onAddToCart = (obj) => {
        axios.post('https://62a06b85a9866630f80e70ab.mockapi.io/api/v1/cart', obj);
        setCartItems((prev) => [...prev, obj]);
    }

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    }

    const onRemoveItem =  (id) => {
        axios.delete(`https://62a06b85a9866630f80e70ab.mockapi.io/api/v1/cart/${id}`);
       setCartItems((prev) => prev.filter(item => item.id !== id));
    }

    const onAddFavorite = (obj) => {
        axios.post('https://62a06b85a9866630f80e70ab.mockapi.io/api/v1/favorites', obj);
        setFavorites((prev) => [...prev, obj]);
    }


    return (
        <div className="wrapper clear">
            {cartOpened ? <Drawer
                    onClose={() => setCartOpened(false)}
                    items={cartItems}
                    onRemove = {onRemoveItem}
                />
                : null}
            <Header
                onClickCart={() => setCartOpened(true)}
            />
            <div className="content p-40">
                <div className="d-flex align-center justify-between mb-40">
                    <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все абибасы'}</h1>
                    <div className="search-block d-flex">
                        <img src="/img/search.svg" alt="Search"/>
                        {searchValue &&
                        <img onClick={() => setSearchValue('')} className="clear cu-p" src="/img/btn-remove.svg"
                             alt="Clear"/>}
                        <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..."/>
                    </div>
                </div>

                <div className="d-flex flex-wrap">
                    {items
                        .filter((obj) => obj.name.toLowerCase().includes(searchValue))
                        .map((obj, index) => (
                            <Card
                                key={index}
                                title={obj.name}
                                price={obj.price}
                                imageUrl={obj.imageUrl}
                                onPlus={(item) => onAddToCart(item)}
                                onFavorite={(obj) =>onAddFavorite(obj)}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}

export default App;