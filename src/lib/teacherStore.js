const MODULES_KEY = 'teacherModules'
const SUBMODULES_KEY_PREFIX = 'teacherSubmodules:' // + moduleId

export function loadTeacherModules() {
    try {
        const raw = localStorage.getItem(MODULES_KEY)
        return raw ? JSON.parse(raw) : []
    } catch (_) {
        return []
    }
}

export function saveTeacherModules(modules) {
    localStorage.setItem(MODULES_KEY, JSON.stringify(modules))
}

export function loadTeacherSubmodules(moduleId) {
    try {
        const raw = localStorage.getItem(SUBMODULES_KEY_PREFIX + moduleId)
        return raw ? JSON.parse(raw) : []
    } catch (_) {
        return []
    }
}

export function saveTeacherSubmodules(moduleId, submodules) {
    localStorage.setItem(SUBMODULES_KEY_PREFIX + moduleId, JSON.stringify(submodules))
}

export function createTeacherModule({ title, description }) {
    const modules = loadTeacherModules()
    const id = `tmod-${Date.now()}`
    const newModule = { id, moduleName: title, description }
    modules.push(newModule)
    saveTeacherModules(modules)
    return newModule
}

export function createTeacherSubmodule(moduleId, { title, content, imageUrl, codeSnippet }) {
    const list = loadTeacherSubmodules(moduleId)
    const id = `tsub-${Date.now()}`
    const sub = { id, title, content, resourceName: `${title}.html`, imageUrl, codeSnippet }
    list.push(sub)
    saveTeacherSubmodules(moduleId, list)
    return sub
}


