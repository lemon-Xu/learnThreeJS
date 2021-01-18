import React, { useImperativeHandle } from 'react';
import logo from './logo.svg';
import './App.css';

import {
  DancingCube,
  Line,
  LineText,
  ChangeCamera,
  NoLight,
  UseAmbientLightLight,
  UseDirectionalLightLight,
  UsePointLightLight,
  UseBaseImageMaterial,
  UseImageMaterialWrap,
  Geometry,
  TriangleGeometry
} from './threeJS/learn'

function App() {
  return (
    <>
      <TriangleGeometry></TriangleGeometry>
    </>
  );
}

export default App;
