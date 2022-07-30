let base = `http://localhost:8080`
module.exports.base = base

let originList = {
  "Manual": {
    "Getting Started": {
      "Creating a scene": "manual/en/introduction/Creating-a-scene",
      "Installation": "manual/en/introduction/Installation",
      "Browser support": "manual/en/introduction/Browser-support",
      "WebGL compatibility check": "manual/en/introduction/WebGL-compatibility-check",
      "How to run things locally": "manual/en/introduction/How-to-run-things-locally",
      "Typescript setup": "manual/en/introduction/Typescript-setup",
      // "Drawing lines": "manual/en/introduction/Drawing-lines",
      "Creating text": "manual/en/introduction/Creating-text",
      "Loading 3D models": "manual/en/introduction/Loading-3D-models",
      "FAQ": "manual/en/introduction/FAQ",
      "Useful links": "manual/en/introduction/Useful-links"
    },
    "Next Steps": {
      "How to update things": "manual/en/introduction/How-to-update-things",
      "How to dispose of objects": "manual/en/introduction/How-to-dispose-of-objects",
      "How to create VR content": "manual/en/introduction/How-to-create-VR-content",
      "How to use post-processing": "manual/en/introduction/How-to-use-post-processing",
      // "Matrix transformations": "manual/en/introduction/Matrix-transformations",
      // "Animation system": "manual/en/introduction/Animation-system"
    },

    "Build Tools": {
      // "Testing with NPM": "manual/en/buildTools/Testing-with-NPM"
    }

  },
  "Reference": {

    "Animation": {
      // "AnimationAction": "api/en/animation/AnimationAction",
      // "AnimationClip": "api/en/animation/AnimationClip",
      // "AnimationMixer": "api/en/animation/AnimationMixer",
      // "AnimationObjectGroup": "api/en/animation/AnimationObjectGroup",
      // "AnimationUtils": "api/en/animation/AnimationUtils",
      // "KeyframeTrack": "api/en/animation/KeyframeTrack",
      // "PropertyBinding": "api/en/animation/PropertyBinding",
      // "PropertyMixer": "api/en/animation/PropertyMixer"
    },

    "Animation / Tracks": {
      // "BooleanKeyframeTrack": "api/en/animation/tracks/BooleanKeyframeTrack",
      // "ColorKeyframeTrack": "api/en/animation/tracks/ColorKeyframeTrack",
      // "NumberKeyframeTrack": "api/en/animation/tracks/NumberKeyframeTrack",
      // "QuaternionKeyframeTrack": "api/en/animation/tracks/QuaternionKeyframeTrack",
      // "StringKeyframeTrack": "api/en/animation/tracks/StringKeyframeTrack",
      // "VectorKeyframeTrack": "api/en/animation/tracks/VectorKeyframeTrack"
    },

    "Audio": {
      // "Audio": "api/en/audio/Audio",
      // "AudioAnalyser": "api/en/audio/AudioAnalyser",
      // "AudioContext": "api/en/audio/AudioContext",
      // "AudioListener": "api/en/audio/AudioListener",
      // "PositionalAudio": "api/en/audio/PositionalAudio"
    },

    "Cameras": {
      "ArrayCamera": "api/en/cameras/ArrayCamera",
      "Camera": "api/en/cameras/Camera",
      "CubeCamera": "api/en/cameras/CubeCamera",
      "OrthographicCamera": "api/en/cameras/OrthographicCamera",
      "PerspectiveCamera": "api/en/cameras/PerspectiveCamera",
      "StereoCamera": "api/en/cameras/StereoCamera"
    },

    "Constants": {
      "Animation": "api/en/constants/Animation",
      "Core": "api/en/constants/Core",
      "CustomBlendingEquation": "api/en/constants/CustomBlendingEquations",
      "Materials": "api/en/constants/Materials",
      "Renderer": "api/en/constants/Renderer",
      "Textures": "api/en/constants/Textures"
    },

    "Core": {
      // "BufferAttribute": "api/en/core/BufferAttribute",
      // "BufferGeometry": "api/en/core/BufferGeometry",
      // "Clock": "api/en/core/Clock",
      // "DirectGeometry": "api/en/core/DirectGeometry",
      // "EventDispatcher": "api/en/core/EventDispatcher",
      // "Face3": "api/en/core/Face3",
      // "Geometry": "api/en/core/Geometry",
      // "GLBufferAttribute": "api/en/core/GLBufferAttribute",
      // "InstancedBufferAttribute": "api/en/core/InstancedBufferAttribute",
      // "InstancedBufferGeometry": "api/en/core/InstancedBufferGeometry",
      // "InstancedInterleavedBuffer": "api/en/core/InstancedInterleavedBuffer",
      // "InterleavedBuffer": "api/en/core/InterleavedBuffer",
      // "InterleavedBufferAttribute": "api/en/core/InterleavedBufferAttribute",
      // "Layers": "api/en/core/Layers",
      "Object3D": "api/en/core/Object3D",
      "Raycaster": "api/en/core/Raycaster",
      // "Uniform": "api/en/core/Uniform"
    },

    "Core / BufferAttributes": {
      // "BufferAttribute Types": "api/en/core/bufferAttributeTypes/BufferAttributeTypes"
    },

    "Extras": {
      // "Earcut": "api/en/extras/Earcut",
      // "ImageUtils": "api/en/extras/ImageUtils",
      // "PMREMGenerator": "api/en/extras/PMREMGenerator",
      // "ShapeUtils": "api/en/extras/ShapeUtils",
    },

    "Extras / Core": {
      // "Curve": "api/en/extras/core/Curve",
      "CurvePath": "api/en/extras/core/CurvePath",
      "Font": "api/en/extras/core/Font",
      "Interpolations": "api/en/extras/core/Interpolations",
      "Path": "api/en/extras/core/Path",
      "Shape": "api/en/extras/core/Shape",
      "ShapePath": "api/en/extras/core/ShapePath"
    },

    "Extras / Curves": {
      "ArcCurve": "api/en/extras/curves/ArcCurve",
      "CatmullRomCurve3": "api/en/extras/curves/CatmullRomCurve3",
      "CubicBezierCurve": "api/en/extras/curves/CubicBezierCurve",
      "CubicBezierCurve3": "api/en/extras/curves/CubicBezierCurve3",
      "EllipseCurve": "api/en/extras/curves/EllipseCurve",
      "LineCurve": "api/en/extras/curves/LineCurve",
      "LineCurve3": "api/en/extras/curves/LineCurve3",
      "QuadraticBezierCurve": "api/en/extras/curves/QuadraticBezierCurve",
      "QuadraticBezierCurve3": "api/en/extras/curves/QuadraticBezierCurve3",
      "SplineCurve": "api/en/extras/curves/SplineCurve"
    },

    "Extras / Objects": {
      // "ImmediateRenderObject": "api/en/extras/objects/ImmediateRenderObject",
    },

    "Geometries": {
      "BoxBufferGeometry": "api/en/geometries/BoxBufferGeometry",
      "BoxGeometry": "api/en/geometries/BoxGeometry",
      "CircleBufferGeometry": "api/en/geometries/CircleBufferGeometry",
      "CircleGeometry": "api/en/geometries/CircleGeometry",
      "ConeBufferGeometry": "api/en/geometries/ConeBufferGeometry",
      "ConeGeometry": "api/en/geometries/ConeGeometry",
      "CylinderBufferGeometry": "api/en/geometries/CylinderBufferGeometry",
      "CylinderGeometry": "api/en/geometries/CylinderGeometry",
      "DodecahedronBufferGeometry": "api/en/geometries/DodecahedronBufferGeometry",
      "DodecahedronGeometry": "api/en/geometries/DodecahedronGeometry",
      "EdgesGeometry": "api/en/geometries/EdgesGeometry",
      "ExtrudeBufferGeometry": "api/en/geometries/ExtrudeBufferGeometry",
      "ExtrudeGeometry": "api/en/geometries/ExtrudeGeometry",
      "IcosahedronBufferGeometry": "api/en/geometries/IcosahedronBufferGeometry",
      "IcosahedronGeometry": "api/en/geometries/IcosahedronGeometry",
      "LatheBufferGeometry": "api/en/geometries/LatheBufferGeometry",
      "LatheGeometry": "api/en/geometries/LatheGeometry",
      "OctahedronBufferGeometry": "api/en/geometries/OctahedronBufferGeometry",
      "OctahedronGeometry": "api/en/geometries/OctahedronGeometry",
      "ParametricBufferGeometry": "api/en/geometries/ParametricBufferGeometry",
      "ParametricGeometry": "api/en/geometries/ParametricGeometry",
      "PlaneBufferGeometry": "api/en/geometries/PlaneBufferGeometry",
      "PlaneGeometry": "api/en/geometries/PlaneGeometry",
      "PolyhedronBufferGeometry": "api/en/geometries/PolyhedronBufferGeometry",
      "PolyhedronGeometry": "api/en/geometries/PolyhedronGeometry",
      "RingBufferGeometry": "api/en/geometries/RingBufferGeometry",
      "RingGeometry": "api/en/geometries/RingGeometry",
      "ShapeBufferGeometry": "api/en/geometries/ShapeBufferGeometry",
      "ShapeGeometry": "api/en/geometries/ShapeGeometry",
      "SphereBufferGeometry": "api/en/geometries/SphereBufferGeometry",
      "SphereGeometry": "api/en/geometries/SphereGeometry",
      "TetrahedronBufferGeometry": "api/en/geometries/TetrahedronBufferGeometry",
      "TetrahedronGeometry": "api/en/geometries/TetrahedronGeometry",
      "TextBufferGeometry": "api/en/geometries/TextBufferGeometry",
      "TextGeometry": "api/en/geometries/TextGeometry",
      "TorusBufferGeometry": "api/en/geometries/TorusBufferGeometry",
      "TorusGeometry": "api/en/geometries/TorusGeometry",
      "TorusKnotBufferGeometry": "api/en/geometries/TorusKnotBufferGeometry",
      "TorusKnotGeometry": "api/en/geometries/TorusKnotGeometry",
      "TubeBufferGeometry": "api/en/geometries/TubeBufferGeometry",
      "TubeGeometry": "api/en/geometries/TubeGeometry",
      "WireframeGeometry": "api/en/geometries/WireframeGeometry"
    },

    "Helpers": {
      // "ArrowHelper": "api/en/helpers/ArrowHelper",
      // "AxesHelper": "api/en/helpers/AxesHelper",
      // "BoxHelper": "api/en/helpers/BoxHelper",
      // "Box3Helper": "api/en/helpers/Box3Helper",
      // "CameraHelper": "api/en/helpers/CameraHelper",
      // "DirectionalLightHelper": "api/en/helpers/DirectionalLightHelper",
      // "GridHelper": "api/en/helpers/GridHelper",
      // "PolarGridHelper": "api/en/helpers/PolarGridHelper",
      // "HemisphereLightHelper": "api/en/helpers/HemisphereLightHelper",
      // "PlaneHelper": "api/en/helpers/PlaneHelper",
      // "PointLightHelper": "api/en/helpers/PointLightHelper",
      // "SkeletonHelper": "api/en/helpers/SkeletonHelper",
      // "SpotLightHelper": "api/en/helpers/SpotLightHelper"
    },

    "Lights": {
      "AmbientLight": "api/en/lights/AmbientLight",
      "AmbientLightProbe": "api/en/lights/AmbientLightProbe",
      "DirectionalLight": "api/en/lights/DirectionalLight",
      "HemisphereLight": "api/en/lights/HemisphereLight",
      "HemisphereLightProbe": "api/en/lights/HemisphereLightProbe",
      "Light": "api/en/lights/Light",
      "LightProbe": "api/en/lights/LightProbe",
      "PointLight": "api/en/lights/PointLight",
      "RectAreaLight": "api/en/lights/RectAreaLight",
      "SpotLight": "api/en/lights/SpotLight"
    },

    "Lights / Shadows": {
      // "LightShadow": "api/en/lights/shadows/LightShadow",
      // "PointLightShadow": "api/en/lights/shadows/PointLightShadow",
      // "DirectionalLightShadow": "api/en/lights/shadows/DirectionalLightShadow",
      // "SpotLightShadow": "api/en/lights/shadows/SpotLightShadow"
    },

    "Loaders": {
      // "AnimationLoader": "api/en/loaders/AnimationLoader",
      // "AudioLoader": "api/en/loaders/AudioLoader",
      // "BufferGeometryLoader": "api/en/loaders/BufferGeometryLoader",
      // "Cache": "api/en/loaders/Cache",
      // "CompressedTextureLoader": "api/en/loaders/CompressedTextureLoader",
      // "CubeTextureLoader": "api/en/loaders/CubeTextureLoader",
      // "DataTextureLoader": "api/en/loaders/DataTextureLoader",
      "FileLoader": "api/en/loaders/FileLoader",
      "FontLoader": "api/en/loaders/FontLoader",
      "ImageBitmapLoader": "api/en/loaders/ImageBitmapLoader",
      // "ImageLoader": "api/en/loaders/ImageLoader",
      "Loader": "api/en/loaders/Loader",
      // "LoaderUtils": "api/en/loaders/LoaderUtils",
      "MaterialLoader": "api/en/loaders/MaterialLoader",
      "ObjectLoader": "api/en/loaders/ObjectLoader",
      "TextureLoader": "api/en/loaders/TextureLoader"
    },

    "Loaders / Managers": {
      // "DefaultLoadingManager": "api/en/loaders/managers/DefaultLoadingManager",
      // "LoadingManager": "api/en/loaders/managers/LoadingManager"
    },

    "Materials": {
      "LineBasicMaterial": "api/en/materials/LineBasicMaterial",
      "LineDashedMaterial": "api/en/materials/LineDashedMaterial",
      "Material": "api/en/materials/Material",
      "MeshBasicMaterial": "api/en/materials/MeshBasicMaterial",
      "MeshDepthMaterial": "api/en/materials/MeshDepthMaterial",
      "MeshDistanceMaterial": "api/en/materials/MeshDistanceMaterial",
      "MeshLambertMaterial": "api/en/materials/MeshLambertMaterial",
      "MeshMatcapMaterial": "api/en/materials/MeshMatcapMaterial",
      "MeshNormalMaterial": "api/en/materials/MeshNormalMaterial",
      "MeshPhongMaterial": "api/en/materials/MeshPhongMaterial",
      "MeshPhysicalMaterial": "api/en/materials/MeshPhysicalMaterial",
      "MeshStandardMaterial": "api/en/materials/MeshStandardMaterial",
      "MeshToonMaterial": "api/en/materials/MeshToonMaterial",
      "PointsMaterial": "api/en/materials/PointsMaterial",
      "RawShaderMaterial": "api/en/materials/RawShaderMaterial",
      "ShaderMaterial": "api/en/materials/ShaderMaterial",
      "ShadowMaterial": "api/en/materials/ShadowMaterial",
      "SpriteMaterial": "api/en/materials/SpriteMaterial"
    },

    "Math": {
      "Box2": "api/en/math/Box2",
      "Box3": "api/en/math/Box3",
      "Color": "api/en/math/Color",
      "Cylindrical": "api/en/math/Cylindrical",
      "Euler": "api/en/math/Euler",
      "Frustum": "api/en/math/Frustum",
      // "Interpolant": "api/en/math/Interpolant",
      "Line3": "api/en/math/Line3",
      "MathUtils": "api/en/math/MathUtils",
      "Matrix3": "api/en/math/Matrix3",
      "Matrix4": "api/en/math/Matrix4",
      "Plane": "api/en/math/Plane",
      "Quaternion": "api/en/math/Quaternion",
      "Ray": "api/en/math/Ray",
      "Sphere": "api/en/math/Sphere",
      "Spherical": "api/en/math/Spherical",
      // "SphericalHarmonics3": "api/en/math/SphericalHarmonics3",
      "Triangle": "api/en/math/Triangle",
      "Vector2": "api/en/math/Vector2",
      "Vector3": "api/en/math/Vector3",
      "Vector4": "api/en/math/Vector4"
    },

    "Math / Interpolants": {
      // "CubicInterpolant": "api/en/math/interpolants/CubicInterpolant",
      // "DiscreteInterpolant": "api/en/math/interpolants/DiscreteInterpolant",
      // "LinearInterpolant": "api/en/math/interpolants/LinearInterpolant",
      // "QuaternionLinearInterpolant": "api/en/math/interpolants/QuaternionLinearInterpolant"
    },

    "Objects": {
      "Bone": "api/en/objects/Bone",
      "Group": "api/en/objects/Group",
      "InstancedMesh": "api/en/objects/InstancedMesh",
      "Line": "api/en/objects/Line",
      "LineLoop": "api/en/objects/LineLoop",
      "LineSegments": "api/en/objects/LineSegments",
      "LOD": "api/en/objects/LOD",
      "Mesh": "api/en/objects/Mesh",
      "Points": "api/en/objects/Points",
      "Skeleton": "api/en/objects/Skeleton",
      "SkinnedMesh": "api/en/objects/SkinnedMesh",
      "Sprite": "api/en/objects/Sprite"
    },

    "Renderers": {
      // "WebGLMultisampleRenderTarget": "api/en/renderers/WebGLMultisampleRenderTarget",
      // "WebGLRenderer": "api/en/renderers/WebGLRenderer",
      // "WebGL1Renderer": "api/en/renderers/WebGL1Renderer",
      // "WebGLRenderTarget": "api/en/renderers/WebGLRenderTarget",
      // "WebGLCubeRenderTarget": "api/en/renderers/WebGLCubeRenderTarget"
    },

    "Renderers / Shaders": {
      // "ShaderChunk": "api/en/renderers/shaders/ShaderChunk",
      // "ShaderLib": "api/en/renderers/shaders/ShaderLib",
      // "UniformsLib": "api/en/renderers/shaders/UniformsLib",
      // "UniformsUtils": "api/en/renderers/shaders/UniformsUtils"
    },

    "Renderers / WebXR": {
      // "WebXRManager": "api/en/renderers/webxr/WebXRManager"
    },

    "Scenes": {
      "Fog": "api/en/scenes/Fog",
      "FogExp2": "api/en/scenes/FogExp2",
      "Scene": "api/en/scenes/Scene"
    },

    "Textures": {
      "CanvasTexture": "api/en/textures/CanvasTexture",
      "CompressedTexture": "api/en/textures/CompressedTexture",
      "CubeTexture": "api/en/textures/CubeTexture",
      // "DataTexture": "api/en/textures/DataTexture",
      // "DataTexture2DArray": "api/en/textures/DataTexture2DArray",
      // "DataTexture3D": "api/en/textures/DataTexture3D",
      "DepthTexture": "api/en/textures/DepthTexture",
      "Texture": "api/en/textures/Texture",
      "VideoTexture": "api/en/textures/VideoTexture"
    }

  },
  "Examples": {

    "Animations": {
      // "CCDIKSolver": "examples/en/animations/CCDIKSolver",
      // "MMDAnimationHelper": "examples/en/animations/MMDAnimationHelper",
      // "MMDPhysics": "examples/en/animations/MMDPhysics"
    },

    "Controls": {
      "DeviceOrientationControls": "examples/en/controls/DeviceOrientationControls",
      "DragControls": "examples/en/controls/DragControls",
      "FirstPersonControls": "examples/en/controls/FirstPersonControls",
      "FlyControls": "examples/en/controls/FlyControls",
      "OrbitControls": "examples/en/controls/OrbitControls",
      "PointerLockControls": "examples/en/controls/PointerLockControls",
      "TrackballControls": "examples/en/controls/TrackballControls",
      "TransformControls": "examples/en/controls/TransformControls"
    },

    "Geometries": {
      "ConvexBufferGeometry": "examples/en/geometries/ConvexBufferGeometry",
      "ConvexGeometry": "examples/en/geometries/ConvexGeometry",
      "DecalGeometry": "examples/en/geometries/DecalGeometry"
    },

    "Helpers": {
      // "FaceNormalsHelper": "examples/en/helpers/FaceNormalsHelper",
      // "LightProbeHelper": "examples/en/helpers/LightProbeHelper",
      // "PositionalAudioHelper": "examples/en/helpers/PositionalAudioHelper",
      // "RectAreaLightHelper": "examples/en/helpers/RectAreaLightHelper",
      // "VertexNormalsHelper": "examples/en/helpers/VertexNormalsHelper",
      // "VertexTangentsHelper": "examples/en/helpers/VertexTangentsHelper"
    },

    "Lights": {
      // "LightProbeGenerator": "examples/en/lights/LightProbeGenerator"
    },

    "Loaders": {
      // "BasisTextureLoader": "examples/en/loaders/BasisTextureLoader",
      // "DRACOLoader": "examples/en/loaders/DRACOLoader",
      "GLTFLoader": "examples/en/loaders/GLTFLoader",
      "MMDLoader": "examples/en/loaders/MMDLoader",
      // "MTLLoader": "examples/en/loaders/MTLLoader",
      // "OBJLoader": "examples/en/loaders/OBJLoader",
      // "OBJLoader2": "examples/en/loaders/OBJLoader2",
      // "OBJLoader2Parallel": "examples/en/loaders/OBJLoader2Parallel",
      // "PCDLoader": "examples/en/loaders/PCDLoader",
      // "PDBLoader": "examples/en/loaders/PDBLoader",
      // "PRWMLoader": "examples/en/loaders/PRWMLoader",
      // "SVGLoader": "examples/en/loaders/SVGLoader",
      // "TGALoader": "examples/en/loaders/TGALoader"
    },

    "Objects": {
      "Lensflare": "examples/en/objects/Lensflare",
    },

    "Post-Processing": {
      "EffectComposer": "examples/en/postprocessing/EffectComposer"
    },

    "Exporters": {
      // "GLTFExporter": "examples/en/exporters/GLTFExporter",
      // "PLYExporter": "examples/en/exporters/PLYExporter",
      // "ColladaExporter": "examples/en/exporters/ColladaExporter"
    },

    "Math": {
      // "LookupTable": "examples/en/math/Lut",
      // "MeshSurfaceSampler": "examples/en/math/MeshSurfaceSampler",
    },

    "ConvexHull": {
      // "Face": "examples/en/math/convexhull/Face",
      // "HalfEdge": "examples/en/math/convexhull/HalfEdge",
      // "ConvexHull": "examples/en/math/convexhull/ConvexHull",
      // "VertexNode": "examples/en/math/convexhull/VertexNode",
      // "VertexList": "examples/en/math/convexhull/VertexList"
    },

    "Renderers": {
      "CSS2DRenderer": "examples/en/renderers/CSS2DRenderer",
      "CSS3DRenderer": "examples/en/renderers/CSS3DRenderer",
      "SVGRenderer": "examples/en/renderers/SVGRenderer"

    },

    "Utils": {
      // "BufferGeometryUtils": "examples/en/utils/BufferGeometryUtils",
      // "SceneUtils": "examples/en/utils/SceneUtils",
      // "SkeletonUtils": "examples/en/utils/SkeletonUtils"
    }

  },
  "Developer Reference": {

    "Polyfills": {
      // "Polyfills": "api/en/Polyfills"
    },

    "WebGLRenderer": {
      // "WebGLProgram": "api/en/renderers/webgl/WebGLProgram",
      // "WebGLShader": "api/en/renderers/webgl/WebGLShader",
      // "WebGLState": "api/en/renderers/webgl/WebGLState"
    }

  }
} 

let traveOriginListToGetFlattenList = (root) => {
  let urlList = []

  let innerLoop = (root) => {
    Object.values(root).forEach(item => {
      if (typeof item === 'string') {
        urlList.push(
          base
          + '/docs/'
          + item
          + '.html'
        )
      } else {
        innerLoop(item)
      }
    })
  }
  innerLoop(root)

  return urlList
}

let newList = traveOriginListToGetFlattenList(originList)
// console.log(newList)
module.exports.list = newList