const shader = `
attribute vec2 a_position;
attribute vec2 a_texcoord;

uniform vec2 u_resolution;
uniform vec2 u_translation;
varying vec2 v_texcoord;

void main() {
  vec2 position = a_position + u_translation;

  vec2 zeroToOne = position / u_resolution;

  vec2 zeroToTwo = zeroToOne * 2.0;

  vec2 clipSpace = zeroToTwo - 1.0;

  gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
  v_texcoord = a_texcoord;
}
`

export default shader
