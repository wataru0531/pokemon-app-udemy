import "./Card.css";

export const Card = (props) => {
  // console.log(props);
  const { pokemon } = props;

  return(
    <div className="p-card">
      <div className="p-card__img">
        <img src={pokemon.sprites.front_default} alt="" />
      </div>
      <div className="p-card__body">
        <h3 className="p-card__title">{ pokemon.name }</h3>
        <div className="p-card__types">
          <div className="p-card__type-name">タイプ</div>
          <div className="p-card__type">
            {
              pokemon.types.map((type) => {
                return(
                  <span key={ type.type.name } className="">{ type.type.name }</span>
                )
              })
            }
          </div>
          <div className="p-card__info">
            <div className="p-card__data">
              <p className="p-card__weight">重さ: { pokemon.weight }</p>
            </div>
            <div className="p-card__data">
              <p className="p-card__height">高さ: { pokemon.height }</p>
            </div>
            <div className="p-card__data">
              <p className="p-card__ability">アビリティ: { pokemon.abilities[0].ability.name }</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )


};