import React, { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/home/navbar'
import Footer from '../components/home/Footer'
import { mockSubmodulesByModuleId, mockModules } from '../data/mockData'
import { getSubModules, getModules } from '../appwrite/db'

const SubmodulePage = () => {
    const navigate = useNavigate()
    const { moduleId, subId } = useParams()

    const [moduleInfo, setModuleInfo] = React.useState(null)
    const [subModule, setSubModule] = React.useState(null)

    React.useEffect(() => {
        (async () => {
            const mockMod = mockModules.find(m => m.id === moduleId) || null
            try {
                const mods = await getModules()
                const mappedMods = mods.map(m => ({ id: m.$id, moduleName: m.moduleName, description: m.description }))
                const found = [...mappedMods, ...mockModules].find(m => m.id === moduleId) || null
                setModuleInfo(found || mockMod)
            } catch (_) {
                setModuleInfo(mockMod)
            }

            try {
                const subs = await getSubModules(moduleId)
                const mappedSubs = subs.map(s => ({ id: s.$id, title: s.title, content: s.content, resourceName: s.resourceName, imageUrl: s.imageUrl, codeSnippet: s.codeSnippet }))
                const list = [
                    ...((mockSubmodulesByModuleId[moduleId]) || []),
                    ...mappedSubs,
                ]
                setSubModule(list.find(s => s.id === subId) || null)
            } catch (_) {
                const list = ((mockSubmodulesByModuleId[moduleId]) || [])
                setSubModule(list.find(s => s.id === subId) || null)
            }
        })()
    }, [moduleId, subId])

    const handleDownloadAll = () => {
        const title = subModule?.title || 'Submodule'
        const content = subModule?.content || ''
        const code = subModule?.codeSnippet || ''
        const imageUrl = subModule?.imageUrl || ''

        const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>${title}</title>
<style>body{font-family:ui-sans-serif,system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;padding:24px;max-width:800px;margin:auto;}pre{background:#0f172a;color:#e2e8f0;padding:12px;border-radius:8px;overflow:auto;}img{max-width:100%;height:auto;border-radius:8px;margin:12px 0;}h1{margin-bottom:12px;}</style>
</head><body>
<h1>${title}</h1>
${imageUrl ? `<img src="${imageUrl}" alt="${title}" />` : ''}
<section><h2>Content</h2><p>${content.replace(/\n/g, '<br/>')}</p></section>
<section><h2>Code Snippet</h2><pre><code>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre></section>
</body></html>`

        const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${title.replace(/\s+/g, '_').toLowerCase()}.html`
        document.body.appendChild(a)
        a.click()
        a.remove()
        URL.revokeObjectURL(url)
    }

    return (
        <>
            
            <section className="h-auto bg-gray-100 py-10 px-6">
                <div className="max-w-4xl mx-auto">
                    <button onClick={() => navigate(-1)} className="text-indigo-600 mb-4">← Back</button>
                    <h1 className="text-3xl font-bold text-gray-800 mb-1">{subModule ? subModule.title : 'Submodule'}</h1>
                    {moduleInfo && <p className="text-gray-500 mb-6">Module: {moduleInfo.moduleName}</p>}

                    {subModule?.imageUrl && (
                        <img
                            src={subModule.imageUrl}
                            alt={subModule.title}
                            className="rounded-2xl shadow mb-6 mx-auto w-full max-w-md h-48 object-contain bg-white"
                        />
                    )}

                    <div className="bg-white rounded-2xl shadow p-6 mb-6">
                        <h2 className="text-xl font-semibold mb-2 text-gray-800">Content</h2>
                        <p className="text-gray-700 whitespace-pre-line">{subModule?.content}</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow p-6">
                        <h2 className="text-xl font-semibold mb-2 text-gray-800">Code Snippet</h2>
                        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-auto"><code>{subModule?.codeSnippet}</code></pre>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <button onClick={() => navigate(`/lesson/${moduleId}/exam/${subId}`)} className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition">Attempt Exam</button>
                        <button onClick={handleDownloadAll} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">Download All</button>
                    </div>
                </div>
            </section>
            
        </>
    )
}

export default SubmodulePage


