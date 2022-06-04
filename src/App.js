import {Card} from './components/Card'
import {Header} from "./components/Header";
import {Drawer} from "./components/Drawer";

const arr = [
    {name: 'Abibas обыкновенный', price: 1500},
    {name: 'Abibas необыкновенный', price: 3500},
    {name: 'Abibas загадочный', price: 7200},
]

function App() {
    return (
        <div className="wrapper clear">
            <Drawer/>
            <Header/>
            <div className="content p-40">
                <h1 className="mb-40">Все кроссовки</h1>

                <div className="d-flex">
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                </div>
            </div>
        </div>
    );
}

export default App;