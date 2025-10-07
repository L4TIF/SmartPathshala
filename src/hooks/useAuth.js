import { useSelector, useDispatch } from 'react-redux'
import { setAuthenticated, setLoggedOut } from '../store/slices/authSlice'

export const useAuth = () => {
    const dispatch = useDispatch()
    const isAuthenticated = useSelector((s) => s.auth.isAuthenticated)
    const user = useSelector((s) => s.auth.user)

    const login = (user) => dispatch(setAuthenticated(user))
    const logout = () => dispatch(setLoggedOut())

    return { isAuthenticated, user, login, logout }
}

export default useAuth


