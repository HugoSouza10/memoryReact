import * as C from './App.styles';
import { useEffect, useState } from 'react';

import logoImage from './assets/devmemory_logo.png';
import Restart from './svgs/restart.svg';

import {InfoItem } from './components/InfoItem';
import { Button } from './components/Button';
import { GridItem } from './components/GridItem';

import { GridItemTypes } from './types/GridItemTypes';
import { items } from './components/Data/items';
import { formatTimeElapse } from './helpers/formatTimeElapse';


const App = () => {

  const [playing, setPlaying] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0); //Conta os acertos
  const [showCount, setShowCount] = useState<number>(0); //Conta a rodada
  const [gridItens, setGridItens] = useState<GridItemTypes[]>([]);

  useEffect(()=>resetAndCreateGrid(),[]);

  //Tempo
  useEffect(()=>{
    const timer = setInterval(()=>{
        if(playing){
          setTimeElapsed(timeElapsed+1);
        }
    }, 1000);
    return () => clearInterval(timer);
  },[playing, timeElapsed]);


  //Verificar se os itens abertos estão iguais
  useEffect(()=>{
      if(showCount === 2){
        let opened = gridItens.filter(item=> item.shown === true); //Filtrar todos os itens shown true
        if(opened.length === 2){
          if(opened[0].item === opened[1].item){
              let tempGrid = [...gridItens];
              //v-1: Se eles são iguais, torna-los "Shown" permanentes
              for(let i in tempGrid){
                if(tempGrid[i].shown){
                  tempGrid[i].permamenteShown = true;
                  tempGrid[i].shown = false;
                }
              }
              //Achou alguém igual, então precisamos manipular
              setGridItens(tempGrid);
              setShowCount(0);
          }else{
            //v2 - Se o shown não é igual então vamos fechar
           setTimeout(()=>{
              let tempGrid = [...gridItens];
              for(let i in tempGrid){
                tempGrid[i].shown = false;

              }

              setGridItens(tempGrid);
              setShowCount(0);
              setMoveCount(moveCount=> moveCount+1);
           },1000);

          }
        }
      }
  }, [showCount, gridItens]);


  //Verificar se o jogo acabou
  useEffect(()=>{
    if(moveCount > 0 && gridItens.every(item=> item.permamenteShown === true)){
          setPlaying(false);
    }
  },[moveCount, gridItens]);

  const resetAndCreateGrid = ()=>{
      //Passo 1 - Resetar o jogo
      setTimeElapsed(0);
      setMoveCount(0);
      setShowCount(0);

      //Passo 2 - Criar o grid
      //Passo 2.1 - Criar um grid vazio

      let tempGrid:GridItemTypes[] = [];

      for(let i = 0; i<(items.length *2); i++){
          tempGrid.push({
            item:null,
            shown: false,
            permamenteShown: false,
          });
      }

      //Passo 2.2 Preencher o Grid

      //Rodamos um loop para preencher os itens de forma aleatória
      for(let w = 0; w<2; w++){
        for(let i = 0; i< items.length; i++){
          let pos = -1;
          while(pos < 0 || tempGrid[pos].item != null){
             pos = Math.floor(Math.random() *(items.length*2)); //Gerando uma posição até o item 12
          }
          tempGrid[pos].item = i;
         
        }

      }


      //Passo 2.3 Colocar no State
      setGridItens(tempGrid);
      

      //Passo 3  Começar o jogo
      setPlaying(true);

  }

  const handleItemClick = (index:number)=>{
        if(playing && index !== null && showCount < 2){
           let tempGrid = [...gridItens];

           if(tempGrid[index].permamenteShown === false && tempGrid[index].shown === false){
             tempGrid[index].shown = true;

             setShowCount(showCount+1);
           }
           setGridItens(tempGrid);
        }
  }

  return (
    <C.Container>
      <C.Infor>
          <C.logoLink href="">
              <img src={logoImage} width="200" alt="" />
          </C.logoLink>

          <C.InfoArea>
            {showCount}
            <InfoItem label="Tempo" value={formatTimeElapse(timeElapsed)}/>
            <InfoItem label="Movimento" value={moveCount.toString()}/>
          </C.InfoArea>
          <Button label="Reiniciar" icon={Restart} onClick={resetAndCreateGrid}/>
      </C.Infor>

        <C.GridArea>
            <C.Grid>
                {gridItens.map((item,index)=>
                  <GridItem 
                    key={index} 
                    item={item}
                    onClick={() => handleItemClick(index)}
                  />
                )}
            </C.Grid>
        </C.GridArea>
    </C.Container>
  )
}

export default App;