import React from 'react'
import { useColor } from './contextProvider'
function ComponentB() {
     const {colorToggler}= useColor()
  return (
    <div className='style.color'>
        <h2>Component B</h2>
        <h1>color is {color}</h1>
    </div>
  )
}

export default ComponentB