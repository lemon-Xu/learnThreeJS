/*
 * @Author: your name
 * @Date: 2020-11-01 16:16:20
 * @LastEditTime: 2020-11-01 16:52:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-ts-threejs/src/threeJS/learn/demo/pointer.tsx
 */

 /**
  * 在计算机世界里，3D世界是由点组成，两个点能够组成一条直线，三个不在一条直线上的点就能够组成一个三角平面，无数三角形面就能够组成各种形状的物体。
  *
  */

 /*
几何体 THREE.Geometry()
几何体是一个包含必要三维数据的一个数据结构:
点： this.vertices = [];
颜色: this.colors = [];
面: this.faces = [];

let geometry = new THREE.Geometry();
geometry.vertices.push(
    new THREE.Vector3(10, 10, 0),
    new THREE.Vector3(-10, -10, 0),
    new THREE.Vector(10, -10, 0));
 */

/*
线材质 THREE.LineBasicMaterial
简单的说就是物体看起来是什么材质。材质可以看成是材料和质感的结合。在程序中，它是表面各可视属性的结合，这些可视属性是指表面的色彩、纹理、光滑度、透明度、反射率、折射率、发光度等。

THREE.LineBasicMaterial = function (parameters)
Color: 线条的颜色，用16进制来表示，默认的颜色是白色。
Linewidth： 线条的宽度，默认时候1各单位宽度。
Linecap：   线条两端的外观，默认是圆角端点，当线条较粗的时候才看得出效果，如果线条很细，那么你几乎看不出效果了。
Linejoin：  两个线条的连接点处的外观，默认是“round”，表示圆角。
VertexColors:   定义线条材质是否使用定点颜色，这是一个boolean值。意思是，线条各部分的颜色来进行插值。
*/

/*
颜色差值
WebGL线绘制方式
*/

import React, { useEffect, useRef } from "react";
import { render } from "react-dom";
import * as THREE from "three";
/**
 * @description: 绘制一条彩色直线
 * @param {*}
 * @return {*}
 */
const LineText = () => {
    const div = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (div.current) {
            const width = div.current.clientWidth;
            const height = div.current.clientHeight;
            let renderer: THREE.WebGLRenderer;
            let camera: THREE.Camera;
            let scene: THREE.Scene;
            let light;
            let cube;
            const initThree = () => {
                if (div.current) {
                    renderer = new THREE.WebGLRenderer({ antialias: true }); // 抗锯齿
                    renderer.setSize(width, height); // 裁剪
                    div.current.append(renderer.domElement);
                    renderer.setClearColor("#FFFFFF", 1.0); // 粉刷屏幕
                }
            };

            const initCamera = () => {
                camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
                camera.position.x = 0;
                camera.position.y = 1000;
                camera.up.x = 0;
                camera.up.y = 0;
                camera.up.z = 1;
                camera.lookAt(new THREE.Vector3(0, 0, 0));
            };

            const initScenne = () => {
                scene = new THREE.Scene();
            }

            const initLight = () => {
                light = new THREE.DirectionalLight("#FFFFFF", 1.0);
                light.position.set(100, 100, 200);
                scene.add(light)
            }

            const initObject = () => {
                const geometry = new THREE.Geometry();
                const material = new THREE.LineBasicMaterial({vertexColors: true});
                const color1 = new THREE.Color(0x444444), color2 = new THREE.Color(0xFF0000), color3 = new THREE.Color(0xFFFFFF)

                // 线的材质可以由2点的颜色决定
                const p1 = new THREE.Vector3(-100, 0, 0);
                const p2 = new THREE.Vector3(100, 0, 0);
                const p3 = new THREE.Vector3(0, -100, 0);
                const p4 = new THREE.Vector3(0, 200, 200)
                geometry.vertices.push(p1);
                geometry.vertices.push(p4);
                geometry.vertices.push(...[p3, p2]);
                geometry.colors.push(color1, color2, color3, color3);

                const line = new THREE.Line(geometry, material);
                scene.add(line);
            }

            const threeStart = () => {
                initThree();
                initCamera();
                initScenne();
                initLight();
                initObject();
                renderer.clear();
                renderer.render(scene, camera);
            }

            threeStart();
        }
    });
    return (
        <>
            <div ref={div} style={{width: '200px', height: '200px'}}></div>
        </>
    );
};

export { LineText };
