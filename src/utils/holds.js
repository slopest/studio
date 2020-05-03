const holdTypes = [
  {
    name: 'Screw',
    id: 'screw',
    model: 'screw.3mf',
    props: {},
    color: '#8a8a8a',
    icon: 'mdi-circle-medium'
  },
  {
    name: 'Sloper',
    id: 'sloper',
    model: 'sloper.3mf',
    props: {},
    color: '#B71C1C',
    icon: 'mdi-circle'
  },
  {
    name: 'Pocket',
    id: 'pocket',
    model: 'pocket.3mf',
    props: {},
    color: '#F700B3',
    icon: 'mdi-circle-double'
  },
]

function findType(type) {
  return holdTypes.find(hold => hold.id === type)
}

export default holdTypes
export { holdTypes, findType }
