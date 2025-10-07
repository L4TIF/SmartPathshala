import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getModules, getSubModules } from '../../appwrite/db'
import { mockModules, mockSubmodulesByModuleId } from '../../data/mockData'

export const fetchModules = createAsyncThunk('modules/fetchModules', async () => {
    try {
        const docs = await getModules()
        const mapped = docs.map(m => ({ id: m.$id, moduleName: m.moduleName, description: m.description, coverImage: m.coverImage, teacherName: m.teacher }))
        return [...mockModules.filter(m => m.id === 'mod-python'), ...mapped]
    } catch {
        return mockModules.filter(m => m.id === 'mod-python')
    }
})

export const fetchSubmodules = createAsyncThunk('modules/fetchSubmodules', async (moduleId) => {
    try {
        const docs = await getSubModules(moduleId)
        const mapped = docs.map(s => ({ id: s.$id, title: s.title, content: s.content, resourceName: s.resourceName, imageUrl: s.image, codeSnippet: s.codeSnippets }))
        return { moduleId, submodules: [...(mockSubmodulesByModuleId[moduleId] || []), ...mapped] }
    } catch {
        return { moduleId, submodules: (mockSubmodulesByModuleId[moduleId] || []) }
    }
})

const modulesSlice = createSlice({
    name: 'modules',
    initialState: { modules: [], submodulesByModuleId: {}, loading: false, error: '' },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchModules.pending, (state) => { state.loading = true; state.error = '' })
            .addCase(fetchModules.fulfilled, (state, action) => { state.loading = false; state.modules = action.payload })
            .addCase(fetchModules.rejected, (state, action) => { state.loading = false; state.error = action.error?.message || 'Failed to fetch modules' })
            .addCase(fetchSubmodules.pending, (state) => { state.loading = true; state.error = '' })
            .addCase(fetchSubmodules.fulfilled, (state, action) => { state.loading = false; state.submodulesByModuleId[action.payload.moduleId] = action.payload.submodules })
            .addCase(fetchSubmodules.rejected, (state, action) => { state.loading = false; state.error = action.error?.message || 'Failed to fetch submodules' })
    }
})

export default modulesSlice.reducer


