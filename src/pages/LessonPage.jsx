import React, { useState, useEffect } from 'react'
import { getSubModules } from '../appwrite/db'
import { useParams } from 'react-router-dom'
const LessonPage = () => {
  const { moduleId } = useParams()
  const [subModules, setSubModules] = useState([])
  useEffect(() => {
    getSubModules(moduleId).then((res) => {
      setSubModules(res)
      console.log(res)
    })
  }, [moduleId])
  return (
    <div>
      {subModules.map((subModule) => (
        <div key={subModule.$id}>{subModule.title}</div>
      ))}
    </div>
  )
}

export default LessonPage