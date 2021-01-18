/*
 * @Author: lemon-Xu
 * @Date: 2020-11-01 14:05:59
 * @LastEditTime: 2021-01-17 18:46:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-ts-threejs/src/threeJS/learn/demo/demo1.tsx
 */
import * as THREE from "three";
import React, { useEffect, useRef } from "react";

/**
 * 三维模型加载与显示基础
 * 什么是三维模型，存放三维数据的文件，叫模型文件。
 *
 * 如果我们设计一个模型文件，应该怎么设计
 * 只要点、线、面即可
 * 由不同位置的2个点，组成线
 * 三条线组成一个面
 * 若干个面组成一个复杂的模型
 *
 * 每个面赋予不同的颜色和纹理
 * 每个面计算出不同的光照效果
 *
 * 模型查看器
 * ParaView、Blender
 *
 * 模型下载
 * www.cc.gatech.edu/projects/large_models/
 */

/**
 * @description:
 * @param {*}
 * @return {*}
 */
const Geometry = () => {
  const dom = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);

    const renderer = new THREE.WebGL1Renderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor("#FFFFFF")
    if(renderer.domElement){
        dom.current?.append(renderer.domElement);

        const geometry = new THREE.PlaneGeometry(100, 100)
        const material = new THREE.MeshBasicMaterial({
            vertexColors: true,
            wireframe: false,
        });
        const color1 = new THREE.Color(0x00900F);
        const color2 = new THREE.Color(0x0000F0);
        const color3 = new THREE.Color(0x20F0FF);

        for (let i = 0; i < geometry.faces.length; i++) {
            const f = geometry.faces[i];
            f.vertexColors[0] = color1
            f.vertexColors[1] = color2
            f.vertexColors[2] = color3
        }
        const object = new THREE.Mesh(geometry, material)
        scene.add(object);


        camera.position.z = 500;
        camera.position.x = 5;
        renderer.render(scene, camera);
    }
  });
  return <>
    <div ref={dom}></div>
  </>;
};

const TriangleGeometry = () => {
    const dom = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);

    const renderer = new THREE.WebGL1Renderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor("#FFFFFF")
    if(renderer.domElement){
        dom.current?.append(renderer.domElement);

        const geometry = new THREE.Geometry()
        const material = new THREE.MeshBasicMaterial({
            vertexColors: true,
            wireframe: false,
        });
        const color1 = new THREE.Color(0x00900F);
        const color2 = new THREE.Color(0x0000F0);
        const color3 = new THREE.Color(0x20F0FF);

        // 放三个定点
        const p1 = new THREE.Vector3(100, 0, 0);
        const p2 = new THREE.Vector3(0, 100, 100);
        const p3 = new THREE.Vector3(-100, 0, 0);

        geometry.vertices.push(p1)
        geometry.vertices.push(p2)
        geometry.vertices.push(p3)

        const face = new THREE.Face3(0, 1, 2)
        face.vertexColors[0] = color1
        face.vertexColors[1] = color2
        face.vertexColors[2] = color3

        // 几何体只有一个面，空间几何插值
        geometry.faces.push(face)

        const object = new THREE.Mesh(geometry, material)
        scene.add(object);


        camera.position.z = 500;
        camera.position.x = 5;
        renderer.render(scene, camera);
    }
  });
  return <>
    <div ref={dom}></div>
  </>;
}

export {  };