/*
 * @Author: your name
 * @Date: 2020-11-08 10:54:16
 * @LastEditTime: 2020-11-08 13:37:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-ts-threejs/src/threeJS/learn/demo/light.tsx
 *
 * 环境光  AmbientLight
 * 经过多次反射而来的光称为环境光，无法确定其最初的方向。环境光是一种无处不在的光。环境光源放出的光线被认为来自任何方向。
 *
 * 方向光  DirectionalLight
 * 平行光又称方向光（Directional Light），是一组没有衰减的平行的光线。
 *  DirectionalLight（hex，intensity）
 *  光的强度： Intensity 默认为1 值为 0 到 1.
 *
 * 点光源
 * 类似于手电筒的光，从一点出发。
 * PointLight(hex, intensity, distance, decay)
 *
 *
 */
import React, { useEffect, useRef } from "react";
import { render } from "react-dom";
import * as THREE from "three";

/**
 * @description: 没有任何光，场景内所有的东西都是黑的。
 * @param {*}
 * @return {*}
 */
const NoLight = () => {
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
                // light = new THREE.DirectionalLight("#FFFFFF", 1.0);
                // light.position.set(100, 100, 200);
                // scene.add(light)
            }

            const initObject = () => {
                const geometry = new THREE.BoxGeometry(200, 100, 50, 4, 4);
                const material = new THREE.MeshLambertMaterial({color: 0xFFFFFF})
                const mesh = new THREE.Mesh(geometry, material)
                scene.add(mesh);
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
}



/**
 * @description: 没有任何光，场景内所有的东西都是黑的。仅使用绿色环境光照射红色物体，物体呈黑色。红色物体只反射红光。
 * @param {*}
 * @return {*}
 */
const UseAmbientLightLight = () => {
    const div = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (div.current) {
            const width = div.current.clientWidth;
            const height = div.current.clientHeight;
            let renderer: THREE.WebGLRenderer;
            let camera: THREE.Camera;
            let scene: THREE.Scene;
            let light: THREE.AmbientLight
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
                light = new THREE.AmbientLight(0x00FF00)
                light.position.set(0, 0, 0)
                scene.add(light)
            }

            const initObject = () => {
                const geometry = new THREE.BoxGeometry(200, 100, 50, 4, 4);
                const material = new THREE.MeshLambertMaterial({color: 0xFF0000})
                const mesh = new THREE.Mesh(geometry, material)
                scene.add(mesh);
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
                light.position.set(Math.random(), Math.random(), Math.random())
                renderer.clear();
                renderer.render(scene, camera)
                requestAnimationFrame(animation);
            }

            threeStart();
        }
    });
    return (
        <>
            <div ref={div} style={{width: '200px', height: '200px'}}></div>
        </>
    );
}


/**
 * @description: 平行光， 没有被照射的地方为黑色。光源强度不断变化，物体呈现不同深度的红色。不做特殊处理，平行光无法穿透物体。
 * @param {*}
 * @return {*}
 */
const UseDirectionalLightLight = () => {
    const div = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (div.current) {
            const width = div.current.clientWidth;
            const height = div.current.clientHeight;
            let renderer: THREE.WebGLRenderer;
            let camera: THREE.Camera;
            let scene: THREE.Scene;
            let light: THREE.DirectionalLight
            let cube: THREE.BoxGeometry;
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
                light = new THREE.DirectionalLight(0xFF0000, 1)
                light.position.set(500, 500, 600)
                scene.add(light)
            }

            const initObject = () => {
                cube = new THREE.BoxGeometry(200, 100, 200, 4, 4);
                cube.rotateZ(20)
                const material = new THREE.MeshLambertMaterial({color: 0xFF0000})
                const mesh = new THREE.Mesh(cube, material)
                scene.add(mesh);



                // const material = new THREE.MeshLambertMaterial({color: 0xFF0000})
                const mesh2 = new THREE.Mesh(cube, material)
                mesh2.position.set(-300, 0, 0)
                scene.add(mesh2);

                cube = new THREE.BoxGeometry(200, 100, 200, 4, 4);
                cube.rotateZ(20)
                // const material = new THREE.MeshLambertMaterial({color: 0xFF0000})
                const mesh3 = new THREE.Mesh(cube, material)
                mesh3.position.set(0, -150, 0)
                scene.add(mesh3);

                cube = new THREE.BoxGeometry(200, 100, 200, 4, 4);
                cube.rotateZ(20)
                // const material = new THREE.MeshLambertMaterial({color: 0xFF0000})
                const mesh4 = new THREE.Mesh(cube, material)
                mesh4.position.set(0, 150, 0)
                scene.add(mesh4);

                cube = new THREE.BoxGeometry(200, 100, 200, 4, 4);
                cube.rotateZ(20)
                // const material = new THREE.MeshLambertMaterial({color: 0xFF0000})
                const mesh5 = new THREE.Mesh(cube, material)
                mesh5.position.set(300, 0, 0)
                scene.add(mesh5);

                const mesh6 = new THREE.Mesh(cube, material)
                mesh6.position.set(0, 150, -20)
                scene.add(mesh6);


                const mesh7 = new THREE.Mesh(cube, material)
                mesh7.position.set(0, -150, -40)
                scene.add(mesh7);
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
                // light.position.set(Math.random(), Math.random(), Math.random())
                const a = Math.random()
                renderer.clear();
                renderer.render(scene, camera)
                light.intensity = a

                requestAnimationFrame(animation);
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
}

/**
 * @description: 点光源, 强度有衰减 发散性的。
 * @param {*}
 * @return {*}
 */
const UsePointLightLight = () => {
    const div = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (div.current) {
            const width = div.current.clientWidth;
            const height = div.current.clientHeight;
            let renderer: THREE.WebGLRenderer;
            let camera: THREE.Camera;
            let scene: THREE.Scene;
            let light: THREE.PointLight
            let cube: THREE.BoxGeometry;
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
                light = new THREE.PointLight(0xFF0000, 1)
                light.position.set(500, 500, 600)
                scene.add(light)
            }

            const initObject = () => {
                cube = new THREE.BoxGeometry(200, 100, 200, 4, 4);
                cube.rotateZ(20)
                const material = new THREE.MeshLambertMaterial({color: 0xFF0000})
                const mesh = new THREE.Mesh(cube, material)
                scene.add(mesh);



                // const material = new THREE.MeshLambertMaterial({color: 0xFF0000})
                const mesh2 = new THREE.Mesh(cube, material)
                mesh2.position.set(-300, 0, 0)
                scene.add(mesh2);

                cube = new THREE.BoxGeometry(200, 100, 200, 4, 4);
                cube.rotateZ(20)
                // const material = new THREE.MeshLambertMaterial({color: 0xFF0000})
                const mesh3 = new THREE.Mesh(cube, material)
                mesh3.position.set(0, -150, 0)
                scene.add(mesh3);

                cube = new THREE.BoxGeometry(200, 100, 200, 4, 4);
                cube.rotateZ(20)
                // const material = new THREE.MeshLambertMaterial({color: 0xFF0000})
                const mesh4 = new THREE.Mesh(cube, material)
                mesh4.position.set(0, 150, 0)
                scene.add(mesh4);

                cube = new THREE.BoxGeometry(200, 100, 200, 4, 4);
                cube.rotateZ(20)
                // const material = new THREE.MeshLambertMaterial({color: 0xFF0000})
                const mesh5 = new THREE.Mesh(cube, material)
                mesh5.position.set(300, 0, 0)
                scene.add(mesh5);

                const mesh6 = new THREE.Mesh(cube, material)
                mesh6.position.set(0, 150, -20)
                scene.add(mesh6);


                const mesh7 = new THREE.Mesh(cube, material)
                mesh7.position.set(0, -150, -40)
                scene.add(mesh7);
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
                // light.position.set(Math.random(), Math.random(), Math.random())
                const a = Math.random()
                renderer.clear();
                renderer.render(scene, camera)
                // light.intensity = a

                requestAnimationFrame(animation);
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
}

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

export { NoLight, UseAmbientLightLight, UseDirectionalLightLight, UsePointLightLight };
