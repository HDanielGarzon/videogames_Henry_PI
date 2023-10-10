import { filter, order } from "../../redux/action";
import Card from "../Card/Card";
import Paginate from "../Paginate/Paginate";
import style from "./CardsContainer.module.css";
import { useDispatch, useSelector } from "react-redux";

export default function CardsContainer({ videogame }) {
  const dispatch = useDispatch();

  //falta realizar el ORDENAMIENTO, detail y landing. hacer paginado e intentar resolver la demora del server
  const apiUsers = useSelector((state) => state.users);
  const filteredVideogames = useSelector((state) => state.filteredVideogames);
  const numberPage = useSelector((state) => state.numPage);
  

  const cardsForPage = 12;
  let desde = (numberPage - 1) * cardsForPage;
  let hasta = numberPage * cardsForPage;

  const handlerOrder = (event) => {
    dispatch(order(event.target.value));
  };

  const handleFilter = (event) => {
    dispatch(filter(event.target.value));
  };

  const handleSourceFilter = (event) => {
    dispatch(filter(event.target.value === "ApiRaw" ? "false" : "true"));
  };
  const usersToRender =
    filteredVideogames.length === 0 ? apiUsers : filteredVideogames;

  let totalPage = Math.floor(usersToRender.length / cardsForPage);
  const viewsVideogames = usersToRender?.slice(desde, hasta);
  const viewsVideogame = videogame?.slice(desde, hasta);

  return (
    <div >
      <div className={style.container}>
      <div>
        <div className={style.orderFilter}>
          <div>
            <select onChange={handlerOrder}>
              <option value="Ascendent">Ascendent</option>
              <option value="Descendent">Descendent</option>
              <option value="Ma">Mayor Rating</option>
              <option value="Me">Menor Rating</option>
            </select>
          </div>
          <div>
            <select onChange={handleFilter}>
              <option value="Action">Action</option>
              <option value="Indie">Indie</option>
              <option value="Adventure">Adventure</option>
              <option value="RPG">RPG</option>
              <option value="Strategy">Strategy</option>
              <option value="Shooter">Shooter</option>
              <option value="Casual">Casual</option>
              <option value="Simulation">Simulation</option>
              <option value="Puzzle">Puzzle</option>
              <option value="Arcade">Arcade</option>
              <option value="Platformer">Platformer</option>
              <option value="Massively Multiplayer">
                Massively Multiplayer
              </option>
              <option value="Racing">Racing</option>
              <option value="Sports">Sports</option>
              <option value="Fighting">Fighting</option>
              <option value="Family">Family</option>
              <option value="Board Games">Board Games</option>
              <option value="Card">Card</option>
              <option value="Educational">Educational</option>
            </select>
          </div>
          <div>
            <select onChange={handleSourceFilter}>
              <option value="ApiRaw">ApiRaw</option>
              <option value="DataBase">DataBase</option>
            </select>
          </div>
        </div>
      </div>
        <Paginate numberPage={numberPage} totalPage={totalPage} />
        {videogame.length === 0
          ? viewsVideogames.map((user) => {
              return (
                <div className={style.card}>
                  <Card
                    key={user.id}
                    id={user.id}
                    image={user.background_image}
                    name={user.name}
                    genres={user.genres}
                  />
                </div>
              );
            })
          : viewsVideogame.map((user) => {
              return (
                <div className={style.card}>
                <Card
                  key={user.id}
                  id={user.id}
                  image={user.background_image}
                  name={user.name}
                  genres={user.genres}
                />
              </div>
              );
            })}
      <Paginate numberPage={numberPage} totalPage={totalPage} />
      </div>
    </div>
  );
}
