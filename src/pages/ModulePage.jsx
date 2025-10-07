import React, { useState, useEffect } from 'react'
import { getModules } from '../appwrite/db'
import { Link } from 'react-router-dom'

const ModulePage = () => {
  const [modules, setModules] = useState([])
  useEffect(() => {
    getModules().then((res) => {
      setModules(res)
      console.log(res)
    })
  }, [])
  return (
    <div>
      {modules.map((module) => (
        <div key={module.$id}>Module: <Link to={`/lesson/${module.submodules.$id}`}> {module.moduleName}</Link></div>
      ))}
    </div>
  )
}

export default ModulePage