import { Mesh, Object3D, Scene } from "three";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { GLTF, GLTFLoader } from "three/examples/jsm/Addons.js";
// import { GLTF } from "three/examples/jsm/loaders/GLTFLoader"

type LoadGLTFOptions = {
  receiveShadow?: boolean;
  castShadow?: boolean;
};

export function loadGLTFModel(
  scene: Scene,
  glbPath: string,
  options: LoadGLTFOptions = { receiveShadow: true, castShadow: true },
): Promise<Object3D> {
  const { receiveShadow = true, castShadow = true } = options;

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderConfig({ type: "js" });
  dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");

  const loader = new GLTFLoader();
  loader.setDRACOLoader(dracoLoader);

  return new Promise((resolve, reject) => {
    loader.load(
      glbPath,
      (gltf: GLTF) => {
        const obj = gltf.scene;
        obj.name = "dog";
        obj.position.set(0, 0, 0);
        obj.receiveShadow = receiveShadow;
        obj.castShadow = castShadow;

        obj.traverse((child) => {
          if ((child as Mesh).isMesh) {
            const mesh = child as Mesh;
            mesh.castShadow = castShadow;
            mesh.receiveShadow = receiveShadow;
          }
        });

        scene.add(obj);
        resolve(obj);
      },
      undefined,
      (error) => reject(error),
    );
  });
}
