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
