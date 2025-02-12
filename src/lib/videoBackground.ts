import {
  ColorManagement,
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  VideoTexture,
  SRGBColorSpace,
  PlaneGeometry,
  MeshBasicMaterial,
  Mesh,
} from "three";

ColorManagement.enabled = true;

export class VideoBackground {
  private video: HTMLVideoElement;
  private canvas: HTMLCanvasElement;
  private scene: Scene;
  private camera: PerspectiveCamera;
  private renderer: WebGLRenderer;
  private texture: VideoTexture;
  private plane: Mesh;
  private animationFrameId: number | null;

  constructor(
    videoElement: HTMLVideoElement,
    canvasElement: HTMLCanvasElement
  ) {
    this.video = videoElement;
    this.canvas = canvasElement;
    this.scene = this.setupScene();
    this.camera = this.setupCamera();
    this.renderer = this.setupRenderer();
    this.texture = this.setupTexture();
    this.plane = this.setupPlane();
    this.animationFrameId = null;
    this.createListeners();
    this.createObservers();
  }

  private setupScene() {
    return new Scene();
  }

  private setupCamera() {
    const camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    return camera;
  }

  private setupRenderer() {
    const renderer = new WebGLRenderer({
      canvas: this.canvas,
      alpha: false,
      powerPreference: "high-performance",
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = SRGBColorSpace;

    return renderer;
  }

  private setupTexture() {
    const texture = new VideoTexture(this.video);
    texture.colorSpace = SRGBColorSpace;

    return texture;
  }

  private setupPlane() {
    const geometry = new PlaneGeometry(16, 9);
    const material = new MeshBasicMaterial({ map: this.texture });
    const plane = new Mesh(geometry, material);
    this.scene.add(plane);

    return plane;
  }

  private createListeners() {
    window.addEventListener("resize", () => this.resize());
  }

  private createObservers() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.startRendering();
          this.video.play();
        } else {
          this.stopRendering();
          this.video.pause();
        }
      });
    });

    observer.observe(this.renderer.domElement);
  }

  private resize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }

  setup() {}

  startRendering() {
    if (!this.animationFrameId) {
      const render = () => {
        this.renderer.render(this.scene, this.camera);
        this.animationFrameId = requestAnimationFrame(render);
      };

      render();
    }
  }

  stopRendering() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  updateVideoSource(source: HTMLVideoElement) {
    this.video = source;

    this.texture = new VideoTexture(this.video);
    this.texture.colorSpace = SRGBColorSpace;

    (this.plane.material as MeshBasicMaterial).map = this.texture;
    (this.plane.material as MeshBasicMaterial).needsUpdate = true;
  }
}

// import {
//   ColorManagement,
//   Scene,
//   PerspectiveCamera,
//   WebGLRenderer,
//   VideoTexture,
//   SRGBColorSpace,
//   PlaneGeometry,
//   ShaderMaterial,
//   Mesh,
// } from "three";

// ColorManagement.enabled = true;

// export class VideoBackground {
//   private video: HTMLVideoElement;
//   private canvas: HTMLCanvasElement;
//   private scene: Scene;
//   private camera: PerspectiveCamera;
//   private renderer: WebGLRenderer;
//   private texture: VideoTexture;
//   private oldTexture: VideoTexture | null;
//   private plane: Mesh;
//   private material: ShaderMaterial;
//   private animationFrameId: number | null;

//   private delayStep1: number = 200; 
//   private delayStep2: number = 200; 
//   private delayStep3: number = 100;

//   constructor(videoElement: HTMLVideoElement, 
//               canvasElement: HTMLCanvasElement) {
//     this.video = videoElement;
//     this.canvas = canvasElement;
//     this.scene = this.setupScene();
//     this.camera = this.setupCamera();
//     this.renderer = this.setupRenderer();
//     this.texture = this.setupTexture();
//     this.oldTexture = null;
//     this.material = this.setupShaderMaterial();
//     this.plane = this.setupPlane();
//     this.animationFrameId = null;

//     this.createListeners();
//     this.createObservers();
//   }

//   private setupScene() {
//     return new Scene();
//   }

//   private setupCamera() {
//     const camera = new PerspectiveCamera(
//       75,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000
//     );
//     camera.position.z = 5;
//     return camera;
//   }

//   private setupRenderer() {
//     const renderer = new WebGLRenderer({
//       canvas: this.canvas,
//       alpha: false,
//       powerPreference: "high-performance",
//     });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.outputColorSpace = SRGBColorSpace;
//     return renderer;
//   }

//   private setupTexture() {
//     const texture = new VideoTexture(this.video);
//     texture.colorSpace = SRGBColorSpace;
//     return texture;
//   }

//   private setupShaderMaterial() {
//     return new ShaderMaterial({
//       uniforms: {
//         displayTexture: { value: this.texture },
//         pixelateAmount: { value: 0.0 },
//         pixelSize: { value: 200.0 },
//       },
//       vertexShader: `
//         varying vec2 vUv;
//         void main() {
//           vUv = uv;
//           gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//         }
//       `,
//       fragmentShader: `
//         uniform sampler2D displayTexture;
//         uniform float pixelateAmount;
//         uniform float pixelSize;
//         varying vec2 vUv;
        
//         void main() {

//           vec2 pixelatedUV = (floor(vUv * pixelSize) + 0.5) / pixelSize;

//           vec2 finalUV = mix(vUv, pixelatedUV, pixelateAmount);
//           gl_FragColor = texture2D(displayTexture, finalUV);
//         }
//       `,
//     });
//   }

//   private setupPlane() {
//     const geometry = new PlaneGeometry(16, 9);
//     const plane = new Mesh(geometry, this.material);
//     this.scene.add(plane);
//     return plane;
//   }

//   private createListeners() {
//     window.addEventListener("resize", () => this.resize());
//   }

//   private createObservers() {
//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           this.startRendering();
//           this.video.play();
//         } else {
//           this.stopRendering();
//           this.video.pause();
//         }
//       });
//     });
//     observer.observe(this.renderer.domElement);
//   }

//   private resize() {
//     this.renderer.setSize(window.innerWidth, window.innerHeight);
//     this.camera.aspect = window.innerWidth / window.innerHeight;
//     this.camera.updateProjectionMatrix();
//   }

//   startRendering() {
//     if (!this.animationFrameId) {
//       const render = () => {
//         this.renderer.render(this.scene, this.camera);
//         this.animationFrameId = requestAnimationFrame(render);
//       };
//       render();
//     }
//   }

//   stopRendering() {
//     if (this.animationFrameId) {
//       cancelAnimationFrame(this.animationFrameId);
//       this.animationFrameId = null;
//     }
//   }


//   updateVideoSource(source: HTMLVideoElement) {
//     this.material.uniforms.pixelateAmount.value = 1.0;
//     this.oldTexture = this.texture;
    
//     setTimeout(() => {
//       const newTexture = new VideoTexture(source);
//       newTexture.colorSpace = SRGBColorSpace;
//       this.texture = newTexture;
//       this.material.uniforms.displayTexture.value = newTexture;
//       this.material.uniforms.pixelateAmount.value = 0.75;
      
//       setTimeout(() => {
//         this.material.uniforms.pixelateAmount.value = 0.5;
        
//         setTimeout(() => {
//           this.material.uniforms.pixelateAmount.value = 0.0;
//           // Dispose of the old texture now that it's no longer needed.
//           if (this.oldTexture) {
//             this.oldTexture.dispose();
//             this.oldTexture = null;
//           }
//         }, this.delayStep3);
        
//       }, this.delayStep2);
      
//     }, this.delayStep1);
//   }
// }