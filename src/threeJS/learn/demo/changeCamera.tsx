/*
渲染循环
渲染的时候，我们调用的是渲染器的render()函数。代码如下，
renderer.render(scene, camera);

如果不断的改变物体的颜色，那么就需要不断的绘制新的场景，所以我们最好的方式，是让画面执行一个循环，不断的调用render来重绘，
    这个循环就是循环循环，在游戏中，也叫游戏循环。
function animate(){
    render();
    requestAnimationFrame(animate);
}
*/

/*
性能测试
fps（Frames Per Second）：视频或者动画每秒显示多少帧数。理论上，3D程序最大的帧数是显卡支持的刷新率。
电影以每秒24张画面的速度播放，电视30fps，游戏最好在30fps以上。

*/
import Stats from 'stats.js';
import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { render } from "react-dom";

/**
 * @description:
 * @param {*}
 * @return {*}
 */
const ChangeCamera = () => {
  const dom = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );

    const renderer = new THREE.WebGL1Renderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor("#FFFFFF");
    if (renderer.domElement) {
      dom.current?.append(renderer.domElement);

      const geometry = new THREE.BoxGeometry(2, 2, 2);
      const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

      const cube = new THREE.Mesh(geometry, material);

      // scene.add(cube);

      //  坐标系
      const axisHelper = new THREE.AxesHelper(4);
      // scene.add(axisHelper);

      // 成组
      const objectTotal = new THREE.Object3D();
      objectTotal.add(cube);
      objectTotal.add(axisHelper);
      scene.add(objectTotal);

      camera.position.z = 15;
      camera.position.x = 5;
      const stats = new Stats()
      const render = () => {
        stats.begin()
        requestAnimationFrame(render);
        // geometry.rotateX(0.01);
        // geometry.rotateZ(0.02);

        objectTotal.rotateY(0.01);
        // camera.position.setX(camera.position.x + 0.1);
        // cube.position.setX(cube.position.x + 0.1)
        stats.end()
        renderer.render(scene, camera);
      };
      render();
    }

    console.log(THREE.REVISION);
    console.log("1");
  });
  return (
    <>
      <div ref={dom}></div>
    </>
  );
};

export { ChangeCamera };
