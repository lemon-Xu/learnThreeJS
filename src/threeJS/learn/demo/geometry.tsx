/*
 * @Author: lemon-Xu
 * @Date: 2020-11-01 14:05:59
 * @LastEditTime: 2021-01-17 18:33:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-ts-threejs/src/threeJS/learn/demo/demo1.tsx
 *
 * 编写第一个three.js 程序
 * 实现一个居中的不断在跳舞的绿色的立方体
 */
import * as THREE from "three";
import React, { useEffect, useRef } from "react";

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

export { Geometry, TriangleGeometry };
