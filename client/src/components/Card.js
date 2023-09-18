import React from 'react'
import { download } from "../assets"
import { downloadImage } from '../utils'

const Card = ({_id,name,prompt,photo}) => {
  return (
    <div><img src={photo} alt={prompt}/></div>
  )
}

export default Card