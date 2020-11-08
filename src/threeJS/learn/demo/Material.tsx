/*
 * @Author: your name
 * @Date: 2020-11-08 13:39:38
 * @LastEditTime: 2020-11-08 14:43:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-ts-threejs/src/threeJS/learn/demo/Material.jsx
 * 纹理
 * 纹理->图片->皮肤。
 *
 * 纹理坐标
 * 1,0 1,1 1,0 0,0
 *
 * 纹理粘合
 * mesh
 *
 * 纹理类
 * THREE.Texture
 * image 图片
 * wrapS  回环
 * offset 偏移
 */
import React, { useEffect, useRef } from "react";
import { render } from "react-dom";
import * as THREE from "three";
/**
 * @description: 绘制一条彩色直线
 * @param {*}
 * @return {*}
 */
const UseBaseImageMaterial = () => {
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
                const geometry = new THREE.BoxGeometry(500, 500, 500, 4, 4);
                const loader = new THREE.TextureLoader();
                loader.load(
                    '/ks1.jpg',
                    (texture) => {
                        const material = new THREE.MeshBasicMaterial({
                            map: texture
                        })
                        const mesh = new THREE.Mesh(geometry, material)
                        scene.add(mesh)
                    },
                    (xhr) => {
                        console.log(xhr)
                    },
                    (xhr) => {
                        console.log('An error happend', xhr)
                    },
                )
                console.log(loader)
                // const material = new THREE.MeshBasicMaterial({map: THREE.Texture});
                // const mesh = new THREE.Mesh(geometry, material)
                // scene.add(mesh);
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

            const animation = () => {
                renderer.clear()
                renderer.render(scene, camera)
                requestAnimationFrame(animation)
            }

            threeStart();
            animation()
        }
    });
    return (
        <>
            <div ref={div} style={{width: '200px', height: '200px'}}></div>
        </>
    );
};

export { UseBaseImageMaterial };
