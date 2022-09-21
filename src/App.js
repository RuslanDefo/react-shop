import axios from 'axios';
import {Header} from "./components/Header";
import {Drawer} from "./components/Drawer";
import {Home} from './pages/Home';
import {Favorites} from './pages/Favorites';
import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AppContext from "./context";

function App() {
    let [items, setItems] = React.useState([]);
    let [cartItems, setCartItems] = React.useState([]);
    let [favorites, setFavorites] = React.useState([]);
    let [searchValue, setSearchValue] = React.useState('');
    let [cartOpened, setCartOpened] = React.useState(false);
    let [isLoading, setIsLoading] = React.useState(true);


    React.useEffect(() => {
        async function fetchData() {
            const cartsResponse = await axios.get('https://62a06b85a9866630f80e70ab.mockapi.io/api/v1/cart');
            const favResponse = await axios.get('https://62a06b85a9866630f80e70ab.mockapi.io/api/v1/favorites');
            const itemsResponse = await axios.get('https://62a06b85a9866630f80e70ab.mockapi.io/api/v1/boots');

            setIsLoading(false)

            setItems(itemsResponse.data);
            setCartItems(cartsResponse.data);
            setFavorites(favResponse.data);
        }

        fetchData();
    }, []);

    const onAddToCart = (obj) => {

        if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
            axios.delete(`https://62a06b85a9866630f80e70ab.mockapi.io/api/v1/cart/${obj.id}`);
            setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))
        } else {
            axios.post('https://62a06b85a9866630f80e70ab.mockapi.io/api/v1/cart', obj);
            setCartItems((prev) => [...prev, obj]);
        }

    }

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    }

    const onRemoveItem = (id) => {
        axios.delete(`https://62a06b85a9866630f80e70ab.mockapi.io/api/v1/cart/${id}`);
        setCartItems((prev) => prev.filter(item => item.id !== id));
    }

    const onAddFavorite = async (obj) => {

        try {
            if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
                await axios.delete(`https://62a06b85a9866630f80e70ab.mockapi.io/api/v1/favorites/${obj.id}`);
                setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))
            } else {
                const {data} = await axios.post('https://62a06b85a9866630f80e70ab.mockapi.io/api/v1/favorites', obj);
                setFavorites((prev) => [...prev, data]);
            }
        } catch (error) {
            alert('Не удалось добавить в фавориты');
        }
    };

    const isItemAdded = (id) => {
       return  cartItems.some((obj) => Number(obj.id) === Number(id))
    }

    return (
        <AppContext.Provider value={{cartItems, favorites, items, isItemAdded, onAddFavorite}}>
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
                <Route path="/" exact
                       element={<Home
                           items={items}
                           searchValue={searchValue}
                           setSearchValue={setSearchValue}
                           onChangeSearchInput={onChangeSearchInput}
                           onAddToCart={onAddToCart}
                           onAddFavorite={onAddFavorite}
                           cartItems={cartItems}
                           isLoading={isLoading}
                       />}>
                </Route>
                <Route path="/favorites" exact
                       element={<Favorites/>}> </Route>
            </Routes>


        </div>
        </AppContext.Provider>
    );
}

export default App;