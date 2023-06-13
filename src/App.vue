<template>
	<div id="app">
		<div id="container"></div>
	</div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default {
	data() {
		return {
			camera: null, //相机对象
			scene: null, //场景对象
			renderer: null, //渲染器对象
			mesh: null //网格模型对象Mesh
		};
	},
	mounted() {
		this.init();
		this.loadObj();
		this.render();
	},
	methods: {
		init() {
			this.scene = new THREE.Scene();
			// this.scene.fog = new THREE.FogExp2(0xcce0ff, 10, 500);
			/**
			 * 创建网格模型
			 */
			// let geometry = new THREE.SphereGeometry(60, 40, 40); //创建一个球体几何对象
			// let geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
			let geometry = new THREE.BoxGeometry(111, 111, 111); //创建一个胶囊图形
			let material = new THREE.MeshLambertMaterial({
				color: 0x00ff00
			}); //材质对象Material 可以自定义颜色
			this.mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
			this.scene.add(this.mesh); //网格模型添加到场景中
			/**
			 * 光源设置
			 */
			//点光源
			let point = new THREE.PointLight(0xffffff);
			point.position.set(400, 200, 300); //点光源位置
			this.scene.add(point); //点光源添加到场景中
			//环境光
			let ambient = new THREE.AmbientLight(0x444444);
			this.scene.add(ambient);
			// console.log(scene)
			// console.log(scene.children)
			/**
			 * 相机设置
			 */
			let container = document.getElementById('container');
			let width = window.innerWidth; //窗口宽度
			let height = window.innerHeight; //窗口高度
			let k = width / height; //窗口宽高比
			let s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
			//创建相机对象
			this.camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
			this.camera.position.set(200, 300, 200); //设置相机位置
			this.camera.lookAt(this.scene.position); //设置相机方向(指向的场景对象)
			// this.camera = new THREE.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 0.01, 10);
			// this.camera.position.z = 1;
			const axesHelper = new THREE.AxesHelper(5);
			// 添加到场景
			this.scene.add(axesHelper);
			/**
			 * 创建渲染器对象
			 */
			this.renderer = new THREE.WebGLRenderer();
			this.renderer.setSize(width, height); //设置渲染区域尺寸
			this.renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
			container.appendChild(this.renderer.domElement); //body元素中插入canvas对象
			//执行渲染操作   指定场景、相机作为参数
			// this.renderer.render(this.scene, this.camera);
			this.animate();
		},
		animate() {
			requestAnimationFrame(this.animate);
			this.mesh.rotation.x += 0.09;
			this.mesh.rotation.y += 0.09;
			this.renderer.render(this.scene, this.camera);
		},
		// 创建控制器
		// 创建渲染函数
		render() {
			const controls = new OrbitControls(this.camera, this.renderer.domElement);
			// controls = new THREE.OrbitControls(camera); // 初始化控制器
			// controls.target.set(0, 0, 0); // 设置控制器的焦点，使控制器围绕这个焦点进行旋转
			// controls.minDistance = 80; // 设置移动的最短距离（默认为零）
			// controls.maxDistance = 400; // 设置移动的最长距离（默认为无穷）
			// controls.maxPolarAngle = Math.PI / 3; //绕垂直轨道的距离（范围是0-Math.PI,默认为Math.PI）
			// controls.update(); // 照相机转动时，必须更新该控制器
			// requestAnimationFrame(this.renderer);
		},
		loadObj() {
			const loader = new GLTFLoader();
			loader.load('/models/audi_rsq3_sportback.glb', (glb) => {
				console.log(glb, 'glb');
				// 调用OBJ的loader函数,加载成功会有个回调函数，参数obj就是模型加载成功后的网格Mesh实例对象
				// 设置模型缩放
				glb.scene.scale.set(60, 60, 60);
				// 设置模型位置
				glb.scene.position.set(10, 10, 10);
				// 将模型添加到场景中
				this.scene.add(glb.scene);
			});
		}
	}
};
</script>

<style>
#app {
}
#container {
	height: 400px;
	position: relative;
}
</style>

