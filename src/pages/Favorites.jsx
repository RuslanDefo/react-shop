import React from 'react';
import {Card} from "../components/Card/Card";


export function Favorites({items, onAddFavorite}) {

    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>Мои закладки</h1>

            </div>

            <div className="d-flex flex-wrap">
                {items
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

