function getHolds() {
  const types = require.context(`@/data/holds`, true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const holds = []
  types.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      holds.push(types(key))
    }
  })
  return holds
}

const holdLibraries = getHolds()

function findLibrary(library) {
  return holdLibraries.find(lib => lib.id === library.split('/')[0])
}

function findType(id) {
  let parts = id.split('/')
  return findLibrary(parts[0]).holds.find(h => h.id === parts[1])
}

export default holdLibraries
export { holdLibraries, findType, findLibrary }
