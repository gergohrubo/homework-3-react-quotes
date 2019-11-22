import React from 'react'

export default function Quote(props) {
  return (
    <div>
      <p>{props.text}</p>
      <p>By: {props.author}</p>
    </div>
  )
}