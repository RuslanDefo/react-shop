import {Card} from './components/Card/Card'
import {Header} from "./components/Header";
import {Drawer} from "./components/Drawer";
import React from "react";



function App() {
    let [items, setItems] = React.useState([]);
    let [cartItems, setCartItems] = React.useState([]);
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
            <div className="content  p-40">
                <h1 className="mb-40">Все кроссовки</h1>

                <div className="d-flex flex-wrap">
                    {items.map((obj) => (
                        <Card
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