import React, { useEffect, useRef } from "react";
import { render } from "react-dom";
import * as THREE from "three";
/**
 * @description: 绘制一条彩色直线
 * @param {*}
 * @return {*}
 */
const Line = () => {
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
                const color1 = new THREE.Color(0x444444), color2 = new THREE.Color(0xFF0000);

                // 线的材质可以由2点的颜色决定
                const p1 = new THREE.Vector3(-100, 0, 0);
                const p2 = new THREE.Vector3(100, 0, 0);
                geometry.vertices.push(p1);
                geometry.vertices.push(p2);
                geometry.colors.push(color1, color2);

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

export { Line };
