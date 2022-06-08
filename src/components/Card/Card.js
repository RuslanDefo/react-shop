import cardStyles from './Card.module.scss'
import React from "react";

export function Card({title, imageUrl, price, onFavorite, onPlus}) {

    let [added, setAdded] = React.useState();

    const onAdd = () => {
        onPlus({title, imageUrl, price});
        setAdded(!added)
    }

    return (
        <div className={cardStyles.card}>
            <div className={cardStyles.favorite} onClick={onFavorite}>
                <img src="/img/unliked.svg" alt="Unliked" />
            </div>
            <img width={133} height={112} src={imageUrl} alt="Sneakers"  alt="sneakers"/>
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена:</span>
                    <b>{price}</b>
                </div>
                    <img
                        className={cardStyles.plus}
                        src={added ? "/img/btn-checked.svg" : "/img/plus.svg"}
                        alt="Plus"onClick={onAdd}/>
            </div>
        </div>
    );
}

