import axios from 'axios';
import {Header} from "./components/Header";
import {Drawer} from "./components/Drawer";
import {Home} from './pages/Home';
import {Favorites} from './pages/Favorites';
import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';


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

    const onRemoveItem = (id) => {
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
                    onRemove={onRemoveItem}
                />
                : null}
            <Header
                onClickCart={() => setCartOpened(true)}
            />

            <Routes>
            <Route path="/" exact element={<Home
                items={items}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToCart={onAddToCart}
                onAddFavorite={onAddFavorite}
            />}> </Route>
                <Route path="/favorites" exact element={<Favorites />}> </Route>
            </Routes>


        </div>
    );
}

export default App;