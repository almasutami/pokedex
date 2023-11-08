const correctImagePath = (path: string) => {
  let correctPath = path
  if (path.includes('master/https://raw.githubusercontent.com/')) {
    correctPath = path.replace('https://raw.githubusercontent.com/PokeAPI/sprites/master/', '')
  }
  return correctPath
}

export default correctImagePath
