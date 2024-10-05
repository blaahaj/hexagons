/*
Z-rotation around right vertex:
  transition-property: transform;
  transition-duration: 2s;
  transform: translate(calc(+1 * var(--hex-long-radius) * var(--hexagon-spacing)), 0)
             rotateZ(0deg)
             translate(calc(-1 * var(--hex-long-radius) * var(--hexagon-spacing)), 0);

Z-rotation around center of top edge:
  transition-property: transform;
  transition-duration: 2s;
  transform: translate(0, calc(-1 * var(--hex-short-radius) * var(--hexagon-spacing)))
             rotateZ(180deg)
             translate(0, calc(+1 * var(--hex-short-radius) * var(--hexagon-spacing)));

Flip around top edge:
  transition-property: transform;
  transition-duration: 2s;
  transform: translate(0, calc(-1 * var(--hex-short-radius) * var(--hexagon-spacing)))
             rotateX(180deg)
             translate(0, calc(+1 * var(--hex-short-radius) * var(--hexagon-spacing)));

Flip around 10-o'clock edge:
  transition-property: transform;
  transition-duration: 2s;
  transform: rotateZ(-60deg)
             translate(0, calc(-1 * var(--hex-short-radius) * var(--hexagon-spacing)))
             rotateX(180deg)
             translate(0, calc(+1 * var(--hex-short-radius) * var(--hexagon-spacing)))
             rotateZ(+60deg);

Rotation around the hexagon above:
  transition-property: transform;
  transition-duration: 2s;
  transform: translate(0, calc(-2 * var(--hex-short-radius) * var(--hexagon-spacing)))
             rotateZ(120deg)
             translate(0, calc(+2 * var(--hex-short-radius) * var(--hexagon-spacing)));
*/

// 2-adjacent could flip 180 around their shared edge
// 3-adjacent could rotate 120n around their shared vertex
// a ring of 6 could rotate 60n around their center hexagon
// a group of 4 could do:

//       bbb
//      bbbbb
//   aaa bbb ddd
//  aaaaa   ddddd
//   aaa ccc ddd
//      ccccc
//       ccc

// b rotates left 60 around 7 o'clock
// a rotates left 120 around 3 o'clock (or flips 180 around the kl.4 edge)
// c rotates left 60 around 1 o'clock
// d rotates left 120 around 9 o'clock (or flips 180 around the kl.10 edge)
