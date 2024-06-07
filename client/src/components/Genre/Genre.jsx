import React from 'react'

function Genre({ name, styleGenre={} }) {
  return (
    <div style={styleGenre}>
      {name}
    </div>
  )
}

export default Genre
