import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import {ProductComponent} from "../../components/product/index.js";
import {BackButtonComponent} from "../../components/back-button/index.js";
import {MainPage} from "../main/index.js";
import { HeaderComponent } from "../../components/header/index.js";
import { FooterComponent } from "../../components/footer/index.js";
import { productStore } from "../../data.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
        this.animationFrameId = null;
    }

    getData() {
        return productStore.items.find(p => p.id == this.id);
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return (
            `
                <div id="product-page"></div>
            `
        );
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    goHome() {
        new MainPage(this.parent).render();
    }

    init3D() {
        const container = document.getElementById('canvas-3d-container');
        const spinner = document.getElementById('loading-spinner');
        if (!container) return;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf8f9fa);

        const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
        camera.position.set(0, 1.5, 4.0);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.maxDistance = 10;
        controls.minDistance = 1;

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
        dirLight.position.set(5, 10, 7);
        scene.add(dirLight);

        const loader = new GLTFLoader();
        loader.load('/models/apple.glb', (gltf) => {
            const model = gltf.scene;

            const box = new THREE.Box3().setFromObject(model);
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);

            const targetSize = 1.8;
            const scaleFactor = targetSize / maxDim;
            model.scale.set(scaleFactor, scaleFactor, scaleFactor);

            const updatedBox = new THREE.Box3().setFromObject(model);
            const updatedCenter = updatedBox.getCenter(new THREE.Vector3());

            model.position.x = -updatedCenter.x;
            model.position.z = -updatedCenter.z;

            model.position.y = -updatedCenter.y;

            scene.add(model);

            if (spinner) spinner.style.display = 'none';

            const animate = () => {
                this.animationFrameId = requestAnimationFrame(animate);

                if (!controls.state == -1) {
                    model.rotation.y += 0.005;
                }

                controls.update();
                renderer.render(scene, camera);
            };
            animate();

        }, undefined, (error) => {
            console.error('Ошибка загрузки 3D модели:', error);
            if (spinner) spinner.innerHTML = '<span class="text-danger fw-bold">Ошибка 3D</span>';
        });

        const resizeObserver = new ResizeObserver(() => {
            if (!container.clientWidth || !container.clientHeight) return;
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });
        resizeObserver.observe(container);
    }

    render() {
        const product = this.getData();
        if (!product) {
            new MainPage(this.parent).render();
            return;
        }

        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }

        this.parent.innerHTML = '';

        const header = new HeaderComponent(this.parent);
        header.render(this.goHome.bind(this));

        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const backBtn = new BackButtonComponent(this.pageRoot);
        backBtn.render(this.clickBack.bind(this));

        const productComp = new ProductComponent(this.pageRoot);
        productComp.render(product);

        const originalImg = this.pageRoot.querySelector('img');
        if (originalImg) {
            const container3D = document.createElement('div');
            container3D.id = 'canvas-3d-container';
            container3D.style.cssText = 'width: 100%; aspect-ratio: 1 / 1; position: relative; overflow: hidden; border-radius: 8px; cursor: grab;';

            container3D.innerHTML = `
                <div id="loading-spinner" class="position-absolute top-50 start-50 translate-middle">
                    <div style="width: 3rem; height: 3rem;" class="spinner-border text-primary" role="status"></div>
                </div>
            `;

            originalImg.parentNode.replaceChild(container3D, originalImg);

            this.init3D();
        }

        const footer = new FooterComponent(this.parent);
        footer.render(this.goHome.bind(this));
    }
}
