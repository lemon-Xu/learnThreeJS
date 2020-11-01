/*
 * @Author: lemon-Xu
 * @Date: 2020-11-01 14:05:59
 * @LastEditTime: 2020-11-01 17:12:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-ts-threejs/src/threeJS/learn/demo/demo1.tsx
 *
 * 编写第一个three.js 程序
 * 实现一个居中的不断在跳舞的绿色的立方体
 */
import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { render } from "react-dom";

/**
 * 四大组建设
 *  +   场景
 *  场景就是舞台，你可以把任何要显示的东西，放在场景中的任何位置。
 *  THREE.Scene = function ()
 *
 *  +   相机
 * 相机就是现实生活中的相机，我们最终能够在浏览器中看到的景象，就是相机拍摄出来的。
 *      +   透视相机
 *      透视投影符合人们心里习惯，即离视点近的物体大，离视点远的物体小，远到极点即为消失，成为灭点。
 *      +   正投影相机
 *      就是远处和近处的是一样大。
 *  THREE.PerspectiveCamera = function(fov, aspect, near, far)
 *      +   视角fov
 *      +   近平面near
 *      +   远平面far
 *      +   纵横比aspect
 *  let camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000)
 *
 *  +   渲染器
 *  渲染器，决定离画家怎么将眼前的场景画到屏幕上。
 *  THREE.WebGLRenderer()
 *
 *  +    几何体
 *  几何体，就是要显示在场景中的对象，网格模型、纹理、光照、颜色。
 */


/**
 * @description:
 * @param {*}
 * @return {*}
 */
const DancingCube = () => {
  const dom = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);

    const renderer = new THREE.WebGL1Renderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor("#FFFFFF")
    if(renderer.domElement){
        dom.current?.append(renderer.domElement);

        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshBasicMaterial({color: 0xff0000});

        const cube = new THREE.Mesh(geometry, material);

        // scene.add(cube);

        //  坐标系
        const axisHelper = new THREE.AxesHelper(4);
        // scene.add(axisHelper);


        // 成组
        const objectTotal = new THREE.Object3D();
        objectTotal.add(cube);
        objectTotal.add(axisHelper)
        scene.add(objectTotal);


        camera.position.z = 15;
        camera.position.x = 5;
        const render = () => {
            requestAnimationFrame(render);
            // geometry.rotateX(0.01);
            // geometry.rotateZ(0.02);
            objectTotal.rotateY(0.01);
            renderer.render(scene, camera);
        }
        render();
    }


    console.log(THREE.REVISION);
    console.log("1");
  });
  return <>
    <div ref={dom}></div>
  </>;
};

export { DancingCube };
