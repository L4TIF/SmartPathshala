import React, { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { mockModuleExams, mockModules } from '../data/mockData'

const ModuleExamPage = () => {
    const navigate = useNavigate()
    const { moduleId } = useParams()

    const moduleInfo = useMemo(() => mockModules.find(m => m.id === moduleId) || null, [moduleId])
    const questions = mockModuleExams[moduleId] || []

    const [answers, setAnswers] = useState({})
    const [score, setScore] = useState(null)

    const handleSelect = (qid, idx) => setAnswers(prev => ({ ...prev, [qid]: idx }))

    const handleSubmit = (e) => {
        e.preventDefault()
        let s = 0
        for (const q of questions) {
            if (answers[q.id] === q.answerIndex) s += 1
        }
        setScore(s)
        try {
            const key = `moduleExamAttempted:${moduleId}`
            const payload = { score: s, total: questions.length, attemptedAt: new Date().toISOString() }
            localStorage.setItem(key, JSON.stringify(payload))
        } catch (_) { }
    }

    return (
        <section className="h-auto bg-gray-100 py-10 px-6">
            <div className="max-w-3xl mx-auto">
                <button onClick={() => navigate(-1)} className="text-indigo-600 mb-4">← Back</button>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">{moduleInfo ? `${moduleInfo.moduleName} - Module Test` : 'Module Test'}</h1>
                <p className="text-gray-600 mb-6">Answer all questions and submit to see your score.</p>

                <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-2xl shadow">
                    {questions.map((q, idx) => (
                        <div key={q.id}>
                            <p className="font-medium text-gray-800 mb-2">{idx + 1}. {q.question}</p>
                            <div className="space-y-2">
                                {q.options.map((opt, oi) => (
                                    <label key={oi} className="flex items-center gap-2 text-gray-700">
                                        <input type="radio" name={q.id} checked={answers[q.id] === oi} onChange={() => handleSelect(q.id, oi)} />
                                        <span>{opt}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}

                    <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">Submit</button>
                </form>

                {score !== null && (
                    <div className="mt-4 p-4 bg-indigo-50 border border-indigo-100 rounded-lg text-indigo-700">
                        Score: {score} / {questions.length}
                    </div>
                )}
            </div>
        </section>
    )
}

export default ModuleExamPage


