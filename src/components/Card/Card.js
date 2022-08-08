import cardStyles from './Card.module.scss'
import React from "react";

export function Card({id, name, imageUrl, price, onFavorite, onPlus, favorited=false}) {

    let [added, setAdded] = React.useState();
    let [isFavorite, setIsFavorite] = React.useState(favorited);

    const onAdd = () => {
        onPlus({name, imageUrl, price});
        setAdded(!added)
    }


    const onClickFavorite = () => {
        onFavorite({id, name, imageUrl, price});
        setIsFavorite(!isFavorite)
    }

    return (
        <div className={cardStyles.card}>
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
                        src={added ? "/img/btn-checked.svg" : "/img/plus.svg"}
                        alt="Plus"onClick={onAdd}/>
            </div>
        </div>

    );
}

