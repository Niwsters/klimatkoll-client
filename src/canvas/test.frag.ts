const shader = `
precision mediump float;

uniform sampler2D u_texture;
uniform bool u_selected;

varying vec2 v_texcoord;

vec2 CARD_SIZE = vec2(445, 656);
vec2 TEXTURE_SIZE = vec2(1024, 1024);

void main() {
  vec4 color = texture2D(u_texture, v_texcoord);

  vec2 uv = v_texcoord * TEXTURE_SIZE;

  if (u_selected == true) {
    if (uv.x < 19.0 || uv.x > CARD_SIZE.x - 11.0 ||
        uv.y < 19.0 || uv.y > CARD_SIZE.y - 11.0)
    {
      color = vec4(1.0, 0.0, 0.0, color.a);
    }
  }

  gl_FragColor = color;
}
`

export default shader
