import cardStyles from './Card.module.scss'
import React from "react";
import ContentLoader from "react-content-loader"
import AppContext from "../../context";

export function Card({id, name, imageUrl, price, onFavorite, onPlus, favorited=false, loading= false }) {

    const {isItemAdded} = React.useContext(AppContext);
    let [isFavorite, setIsFavorite] = React.useState(favorited);


    const onAdd = () => {
        onPlus({name, imageUrl, price, id});
    }


    const onClickFavorite = () => {
        onFavorite({id, name, imageUrl, price});
        setIsFavorite(!isFavorite)
    }

    return (
        <div className={cardStyles.card}>
            {loading ?  <ContentLoader
                speed={2}
                width={150}
                height={250}
                viewBox="0 0 150 250"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
            >
                <circle cx="587" cy="532" r="15" />
                <rect x="502" y="535" rx="2" ry="2" width="140" height="10" />
                <rect x="518" y="524" rx="2" ry="2" width="140" height="10" />
                <rect x="0" y="0" rx="10" ry="10" width="150" height="155" />
                <rect x="0" y="166" rx="10" ry="10" width="144" height="15" />
                <rect x="0" y="191" rx="10" ry="10" width="100" height="15" />
            </ContentLoader>
                :
                <>
                <div className={cardStyles.favorite} onClick={onClickFavorite}>
                    <img src={isFavorite ? "/img/liked.svg" : "/img/unliked.svg"} alt="Unliked" />
                </div>
                <img width={133} height={112} src={imageUrl} alt="Sneakers"  alt="sneakers"/>
                <h5>{name}</h5>
                <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                <span>Цена:</span>
                <b>{price} рубасов</b>
                </div>
                <img
                className={cardStyles.plus}
                src={isItemAdded(id) ? "/img/btn-checked.svg" : "/img/plus.svg"}
                alt="Plus"onClick={onAdd}/>
                </div>
                </>
            }

        </div>

    );
}

