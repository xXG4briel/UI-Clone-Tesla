import React, { useCallback, useRef, useState } from 'react';

import ModelsContext, { CarModel } from '../ModelsContext'

import { Container, OverlaysRoot } from './styles';
import ModelOverlay from "../ModelOverlay"


const ModelsWrapper: React.FC = ({ children }) => {
  console.log(children)
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [ registeresModels, setRegisteredModels ] = useState<CarModel[]>([]);
  const registerModel = useCallback( (model: CarModel) => { 
    setRegisteredModels( state => [...state, {...model}] )
   }, [] );
   const unregisterModel = useCallback( (modelName: string) => { 
    setRegisteredModels( state => state.filter( model => model.modelName !== modelName ) )
   }, [] );
   const getModelByName = useCallback( 
     (modelName: string) => {
      return registeresModels.find(item => item.modelName === modelName ) || null;
   }, [registerModel] )
  console.log(registeresModels.map(m => m.modelName));
  return (
    <ModelsContext.Provider 
      value={{
        wrapperRef,
        registeresModels,
        registerModel,
        unregisterModel,
        getModelByName
      }}
    >
      <Container ref={wrapperRef}>
        <OverlaysRoot>
          { registeresModels.map( item => (
            <ModelOverlay key={item.modelName} model={item}> { item.overlayNode } </ModelOverlay>
          )) }
        </OverlaysRoot>
        { children }
      </Container>
    </ModelsContext.Provider>
  );
};

export default ModelsWrapper;
