import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/home/navbar'
import Footer from '../components/home/Footer'
import { mockModules } from '../data/mockData'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSubmodules } from '../store/slices/modulesSlice'
import StudentDoubtModal from './StudentDoubtModal'

const LessonPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()
  const { moduleId } = useParams()
  const dispatch = useDispatch()
  const subModules = useSelector((s) => s.modules.submodulesByModuleId[moduleId] || [])
  const [moduleInfo, setModuleInfo] = useState(null)

  useEffect(() => {
    const mockMod = mockModules.find(m => m.id === moduleId) || null
    setModuleInfo(mockMod)
    dispatch(fetchSubmodules(moduleId))
  }, [moduleId, dispatch])

  const handleDownload = (subModule) => {
    const blob = new Blob([subModule.content || ''], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = subModule.resourceName || `${subModule.title}.txt`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <div><Navbar /></div>
      <section className="h-auto bg-gray-100 py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 flex items-start justify-between gap-4">
            <h1 className="text-3xl font-bold text-gray-800">
              {moduleInfo ? moduleInfo.moduleName : 'Module'}
            </h1>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(`/lesson/${moduleId}/test`)}
                className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm"
              >
                Attempt Module Test
              </button>

              <button
                onClick={() => setIsOpen(true)}
                className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm"
              >
                Ask a Doubt
              </button>
            </div>
            {
              isOpen && <StudentDoubtModal setIsOpen={setIsOpen} />
            }
          </div>
          {moduleInfo && (
            <p className="text-gray-600 -mt-4 mb-6">{moduleInfo.description}</p>
          )}
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">Lessons</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {subModules.map((subModule) => {
            const attemptedKey = `examAttempted:${moduleId}:${subModule.id}`
            let attempted = false
            try {
              attempted = !!localStorage.getItem(attemptedKey)
            } catch (_) { }
            return (
              <div key={subModule.id} className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition duration-300 ease-in-out h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-1 text-gray-800">{subModule.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-3">{subModule.content}</p>
                  {attempted && (
                    <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 border border-green-200">Exam Attempted</span>
                  )}
                </div>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="text-sm text-gray-500">{subModule.resourceName}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate(`/lesson/${moduleId}/sub/${subModule.id}`)}
                      className="px-3 py-1.5 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition text-sm"
                    >
                      Open
                    </button>
                    <button
                      onClick={() => navigate(`/lesson/${moduleId}/exam/${subModule.id}`)}
                      className={`px-3 py-1.5 rounded-lg transition text-sm ${attempted ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                      disabled={attempted}
                    >
                      {attempted ? 'Attempted' : 'Attempt Exam'}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section >


    </>
  )
}

export default LessonPage