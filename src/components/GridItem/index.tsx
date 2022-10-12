import * as C from './style';
import { GridItemTypes } from '../../types/GridItemTypes';
import svgB7web from '../../svgs/b7.svg';
import { items } from '../Data/items';


type Props = {
    item: GridItemTypes,
    onClick: () => void
}

export const GridItem = ({item, onClick}:Props) =>{
    return(
        <C.Container 
            showBackground={item.permamenteShown || item.shown}
            onClick={onClick}
        
        >
          {item.permamenteShown === false && item.shown === false &&
                <C.Icon src={svgB7web} alt="" opacity={.1}/>
          }

          {(item.permamenteShown || item.shown) && item.item !== null  &&
                <C.Icon src={items[item.item].icon} alt=""/>
          
          }
        </C.Container>
    )
}