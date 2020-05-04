function getHolds() {
  const types = require.context(`../data/holds`, true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const holds = []
  types.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      holds.push(types(key))
    }
  })
  return holds
}

const holdTypes = getHolds()

function findType(type) {
  return holdTypes.find(hold => hold.id === type)
}

export default holdTypes
export { holdTypes, findType }
