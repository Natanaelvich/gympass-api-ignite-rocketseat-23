interface Coordinates {
  latitude: number
  longitude: number
}

export default function getRandomCoordinates(
  centerLatitude: number,
  centerLongitude: number,
  maxOffset: number
): Coordinates {
  function getRandomOffset(): number {
    return (Math.random() - 0.5) * maxOffset * 2
  }

  const latitudeOffset: number = getRandomOffset()
  const longitudeOffset: number = getRandomOffset()

  const randomLatitude: number = centerLatitude + latitudeOffset
  const randomLongitude: number = centerLongitude + longitudeOffset

  return { latitude: randomLatitude, longitude: randomLongitude }
}
