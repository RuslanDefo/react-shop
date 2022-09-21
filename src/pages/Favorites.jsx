import React from 'react';
import {Card} from "../components/Card/Card";
import AppContext from "../context";


export function Favorites() {
const {favorites, onAddFavorite} = React.useContext(AppContext);


    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>Мои закладки</h1>

            </div>

            <div className="d-flex flex-wrap">
                {favorites
                    .map((obj, index) => (
                        <Card
                            key={index}
                            favorited={true}
                            onFavorite={onAddFavorite}
                            {...obj}
                        />
                    ))}
            </div>
        </div>
    );
}

