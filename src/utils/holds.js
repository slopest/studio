const holdTypes = [
  {
    name: 'Screw',
    id: 'screw',
    model: {
      path: 'screw.3mf',
      props: {},
    },
    editor: {
      color: '#8a8a8a',
      icon: 'mdi-circle-medium'
    }
  },
  {
    name: 'Sloper',
    id: 'sloper',
    model: {
      path: 'sloper.3mf',
      props: {},
    },
    editor: {
      color: '#B71C1C',
      icon: 'mdi-circle'
    }
  },
  {
    name: 'Pocket',
    id: 'pocket',
    model: {
      path: 'pocket.3mf',
      props: {},
    },
    editor: {
      color: '#F700B3',
      icon: 'mdi-circle-double'
    }
  },
]

function findType(type) {
  return holdTypes.find(hold => hold.id === type)
}

export default holdTypes
export { holdTypes, findType }
