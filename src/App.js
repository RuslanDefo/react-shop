import {Card} from './components/Card/Card'
import {Header} from "./components/Header";
import {Drawer} from "./components/Drawer";
import React from "react";




function App() {
    let [items, setItems] = React.useState([]);
    let [cartItems, setCartItems] = React.useState([]);
    let [searchValue, setSearchValue] = React.useState('');
    let [cartOpened, setCartOpened] = React.useState(false);

    React.useEffect(()=> {
        fetch('https://62a06b85a9866630f80e70ab.mockapi.io/api/v1/boots').then((res) => {
            return res.json();
        })
            .then((json) => {
                setItems(json)
            });
    }, []);

    const onAddToCart = (obj) =>{
       setCartItems((prev) => [...prev, obj])
    }

const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
}


    return (
        <div className="wrapper clear">
            {cartOpened ? <Drawer
                    onClose={() => setCartOpened(false)}
                    items={cartItems}
                />
                : null}
            <Header
                onClickCart={() => setCartOpened(true)}
            />
            <div className="content p-40">
                <div className="d-flex align-center justify-between mb-40">
                    <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все абибасы'}</h1>
                    <div className="search-block d-flex">
                        <img src="/img/search.svg" alt="Search" />
                        { searchValue && <img onClick={() => setSearchValue('')} className="clear cu-p" src="/img/btn-remove.svg" alt="Clear"/> }
                        <input onChange={onChangeSearchInput}  value={searchValue} placeholder="Поиск..." />
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
                            onPlus={ (item) => onAddToCart(item) }
                            onFavorite={() => console.log(obj)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;