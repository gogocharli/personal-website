precision highp float;

varying vec2 vUv;
uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_seed;
uniform sampler2D u_texture;

#define NUM_OCTAVES 5

vec3 rgb2hsv(vec3 c) {
  vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
  vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
  vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

  float d = q.x - min(q.w, q.y);
  float e = 1.0e-10;
  return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float rand(vec2 n) {
  return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

mat2 rotation2d(float _angle) {
  return mat2(cos(_angle), -sin(_angle), sin(_angle), cos(_angle));
}

float noise(vec2 p) {
  vec2 ip = floor(p);
  vec2 u = fract(p);
  u = u * u * (3.0 - 2.0 * u);

  float res = mix(mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x), mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x), u.y);
  return res * res;
}

float fbm(vec2 x) {
  float v = 0.0;
  float a = 0.5;
  vec2 shift = vec2(100);
	// Rotate to reduce axial bias
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
  for(int i = 0; i < NUM_OCTAVES; ++i) {
    v += a * noise(x);
    x = rot * x * 2.0 + shift;
    a *= 0.5;
  }
  return v;
}

/**
 * Adjusts UV coordinates to fit a texture onto a canvas while preserving the texture's aspect ratio.
 * The function crops the texture from the center if the aspect ratios do not match, ensuring no stretching occurs.
 *
 * @param uv - The original UV coordinates (range [0, 1]).
 * @param textureAspectRatio - The aspect ratio (width/height) of the texture.
 * @param canvasAspectRatio - The aspect ratio (width/height) of the canvas.
 * @return The adjusted UV coordinates, mapped to preserve the texture's aspect ratio.
 */
vec2 fitToAspect(vec2 uv, float textureAspectRatio, float canvasAspectRatio) {
  float ratioX = canvasAspectRatio / textureAspectRatio;
  float ratioY = 1. / ratioX;

  // Crop the image instead of stretching it
  uv.x *= min(ratioX, 1.);
  uv.y *= min(ratioY, 1.);

  // Transform the origin to the image's center
  uv.x += max(0., (1. - ratioX) / 2.);
  uv.y += max(0., (1. - ratioY) / 2.);

  return uv;
}

void main(void) {
  vec2 uv = vUv;
  vec2 mouse = u_mouse / u_resolution;
  // uv.x *= u_resolution.x / u_resolution.y;

  float hue = u_seed + u_time * 0.01;

  vec3 hsv1 = vec3(hue, .0, .85);
  vec3 hsv2 = vec3(0., 1., .85);

  vec3 rgb1 = hsv2rgb(hsv1);
  vec3 rgb2 = hsv2rgb(hsv2);

  vec4 color1 = vec4(rgb1, 1.);
  vec4 color2 = vec4(rgb2, 1.);

  float mouse_distance = distance(uv, mouse);
  float mouse_strength = smoothstep(0.5, 0., mouse_distance);

  float grain = noise(10. * uv) * mix(0.2, 0.01, mouse_strength);

  // make movement for film
  vec2 movement = vec2(abs(sin(u_time * .01 + grain)), abs(cos(u_time * .01)));
  movement *= rotation2d(u_time * .05);

  float easing = fbm(uv.xy * movement + u_seed);
  easing *= 10.;
  easing += grain;
  easing += u_time * .02;
  easing = fract(easing * 10.);

  float mixer = smoothstep(0., .01, easing) - smoothstep(1. - .01, 1., easing);

  vec2 coords = fitToAspect(uv, 4531. / 4536., u_resolution.x / u_resolution.y);

  vec4 image = texture2D(u_texture, coords + easing * .01);

  vec4 color = mix(color1, image, mixer);
  color += movement.x * .001;

  gl_FragColor = mix(color, image, .5);
}