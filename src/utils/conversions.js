// degreesToRadians converts an angle in degrees into radians.
// This function serves to have a common unit in the editor, degrees,
// while staying compatible with the Three.js library that works with radians.
function degreesToRadians(angle) {
  return Math.PI * angle / 180
}

export { degreesToRadians }
