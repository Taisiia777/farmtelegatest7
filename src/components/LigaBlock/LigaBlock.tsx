// import { TLiga } from "../../types/globalTypes";

// import classNames from "classnames/bind";
// import styles from "./LigaBlock.module.scss";
// import Button from "../Button/Button";
// import CoinWhiteBg from "../CoinWhiteBg/CoinWhiteBg";
// const cn = classNames.bind(styles);

// interface ILigaBlockProps {
//    ligaName: TLiga;
//    percent: number;
//    price: string;
//    acitve: boolean;
// }

// const LigaBlock = ({ ligaName, percent, price, acitve }: ILigaBlockProps) => {
//    let priceFontSize;

//    if (price.length < 7) {
//       priceFontSize = 16;
//    } else {
//       priceFontSize = 12;
//    }
//    return (
//       <div className={cn("ligaBlock")}>
//          <img
//             src={`img/leagueIcons/${ligaName}.png`}
//             className={cn("ligaBlock__ligaImg")}
//             alt={ligaName}
//          />
//          <div className={cn("ligaBlock__info", "ligaBlockInfo")}>
//             <div className={cn("ligaBlockInfo__top")}>
//                <h3
//                   className={
//                      `${cn("ligaBlockInfo__ligaName")}` + " textShadow"
//                   }>
//                   {ligaName}
//                </h3>
//                <Button
//                   className={cn("ligaBlockInfo__btn")}
//                   size="small"
//                   disabled={!acitve}>
//                   <CoinWhiteBg iconName="BTC" size="small" />
//                   <span
//                      className={cn("ligaBlockInfo__price") + " textShadow"}
//                      style={{
//                         fontSize: priceFontSize + "px",
//                      }}>
//                      +{price}
//                   </span>
//                </Button>
//             </div>
//             <div className={cn("ligaBlockInfo__bottom")}>
//                <img src="img/ligaBlock/percent.svg" alt="" />

//                {/* Заполнитель плашки */}
//                <div className={cn("ligaBlockInfo__percentWrap")}>
//                   <div
//                      className={cn("ligaBlockInfo__percent")}
//                      style={{
//                         width: percent + "%",
//                      }}></div>
//                </div>
//             </div>
//          </div>
//       </div>
//    );
// };

// export default LigaBlock;
  import { TLiga } from "../../types/globalTypes";
  import classNames from "classnames/bind";
  import styles from "./LigaBlock.module.scss";
  import Button from "../Button/Button";
  import CoinWhiteBg from "../CoinWhiteBg/CoinWhiteBg";
  import { useDispatch } from "react-redux";
  import { setUser } from "../../store/reducers/userSlice"; // Импорт экшена для обновления пользователя
  import { useAppSelector } from "../../store"; // Импорт хука для доступа к состоянию пользователя

  const cn = classNames.bind(styles);

  interface ILigaBlockProps {
    ligaName: TLiga;
    percent: number;
    price: string;
    acitve: boolean;
  }

  const LigaBlock = ({ ligaName, percent, price, acitve }: ILigaBlockProps) => {
    const dispatch = useDispatch();
    const user = useAppSelector((state) => state.user.user);

    const handleButtonClick = async () => {
      if (acitve) {
        const routeMap = {
          Wooden: 'wood',
          Silver: 'silver',
          Gold: 'gold',
          Fire: 'fire',
          Diamond: 'diamond'
        };
    
        const route = routeMap[ligaName];
    
        try {
          const response = await fetch(`https://coinfarm.club/reward/${route}/${user.id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          });
    
          if (!response.ok) {
            throw new Error('Failed to give reward');
          }
    
          const updatedUser = await response.json();
          dispatch(setUser(updatedUser)); // Обновляем пользователя в Redux
        } catch (error) {
          console.error('Error giving reward:', error);
        }
      }
    };

    let priceFontSize;

    if (price.length < 7) {
      priceFontSize = 16;
    } else {
      priceFontSize = 12;
    }

    return (
      <div className={cn("ligaBlock")}>
        <img
          src={`img/leagueIcons/${ligaName}.png`}
          className={cn("ligaBlock__ligaImg")}
          alt={ligaName}
        />
        <div className={cn("ligaBlock__info", "ligaBlockInfo")}>
          <div className={cn("ligaBlockInfo__top")}>
            <h3
              className={
                `${cn("ligaBlockInfo__ligaName")}` + " textShadow"
              }>
              {ligaName}
            </h3>
            <Button
  className={cn("ligaBlockInfo__btn")}
  size="small"
  disabled={!acitve}
  onClick={handleButtonClick} // Добавляем обработчик клика
>
  <CoinWhiteBg iconName="BTC" size="small" />
  <span
    className={cn("ligaBlockInfo__price") + " textShadow"}
    style={{
      fontSize: priceFontSize + "px",
    }}
  >
    +{price}
  </span>
</Button>
          </div>
          <div className={cn("ligaBlockInfo__bottom")}>
            <img src="img/ligaBlock/percent.svg" alt="" />

            {/* Заполнитель плашки */}
            <div className={cn("ligaBlockInfo__percentWrap")}>
              <div
                className={cn("ligaBlockInfo__percent")}
                style={{
                  width: percent + "%",
                }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default LigaBlock;
