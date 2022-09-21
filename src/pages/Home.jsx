import React from 'react';
import {Card} from '../components/Card/Card'

export function Home({
                         items,
                         searchValue,
                         setSearchValue,
                         onChangeSearchInput,
                         onAddToCart,
                         onAddFavorite,
                         isLoading
                     }) {

    const rendreItems = () => {

        const filtredItems = items.filter((obj) => obj.name.toLowerCase().includes(searchValue));
        return (isLoading ? [...Array(10)] : filtredItems)
            .map((obj, index) => (
                <Card
                    key={index}
                    onPlus={(item) => onAddToCart(item)}
                    onFavorite={(obj) => onAddFavorite(obj)}
                    loading={isLoading}
                    {...obj}
                />

            ))

    }

    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все абибасы'}</h1>
                <div className="search-block d-flex">
                    <img src="/img/search.svg" alt="Search"/>
                    {searchValue &&
                        <img onClick={() => setSearchValue('')} className="clear cu-p" src="/img/btn-remove.svg"
                             alt="Clear"/>}
                    <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..."/>
                </div>
            </div>

            <div className="d-flex flex-wrap">
                {rendreItems()}
            </div>
        </div>
    );
}

