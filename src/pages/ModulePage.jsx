import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/home/navbar'
import Footer from '../components/home/Footer'
import { mockModules } from '../data/mockData'

const ModulePage = () => {
  const [modules, setModules] = useState([])

  useEffect(() => {
    setModules(mockModules.filter(m => m.id === 'mod-python'))
  }, [])

  return (
    <>
      <div><Navbar /></div>
      <section className="h-auto bg-gray-100 py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-left mb-6 text-gray-800">Available Modules</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => (
              <Link key={module.id} to={`/lesson/${module.id}`} className="block">
                <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition duration-300 ease-in-out h-full">
                  <div className="flex items-start gap-4">
                    <img
                      src={'https://cdn-icons-png.flaticon.com/512/4359/4359963.png'}
                      alt={module.moduleName}
                      className="w-16 h-16 object-contain"
                    />
                    <div>
                      <h3 className="text-lg font-semibold mb-1 text-gray-800">{module.moduleName}</h3>
                      <p className="text-gray-600 text-sm">{module.description}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="inline-block text-indigo-600 text-sm font-medium">View Lessons →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <div><Footer /></div>
    </>
  )
}

export default ModulePage