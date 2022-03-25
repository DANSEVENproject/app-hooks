import {useCallback, useReducer} from 'react';
import { CLEAR_USERS, GET_REPOS, GET_USER, SEARCH_USERS, SET_LOADING } from '../types';
import { GithubContext } from './githubContext';
import axios from 'axios';
import { githubReducer } from './githubReducer';
import {REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET} from '../../localKey'

export const GithubState = ({children}) => {
    const initialState = {
        user: {},
        users: [],
        loading: false,
        repos: []
    }
    const [state, dispatch] = useReducer(githubReducer, initialState)

    const search = useCallback(async value => {
        setLoading()
        const response = await axios.get(
            `https://api.github.com/search/users?q=${value}&client_id=${REACT_APP_CLIENT_ID}&client_secret=${REACT_APP_CLIENT_SECRET}`
        )
        dispatch({
            type: SEARCH_USERS,
            payload: response.data.items
        })
    }, [children])

    
    const getUser = useCallback(async name => {
        setLoading()
        const response = await axios.get(
            `https://api.github.com/users/${name}?client_id=${REACT_APP_CLIENT_ID}&client_secret=${REACT_APP_CLIENT_SECRET}`
        )
        dispatch({
            type: GET_USER,
            payload: response.data
        })
    }, [children])

    const getRepos = useCallback(async name => {
        setLoading()
        const response = await axios.get(
            `https://api.github.com/users/${name}/repos?per_page=5&client_id=${REACT_APP_CLIENT_ID}&client_secret=${REACT_APP_CLIENT_SECRET}`
        )
        dispatch({
            type: GET_REPOS,
            payload: response.data
        })
    }, [children])
    
    const clearUsers = () => dispatch({type: CLEAR_USERS})

    const setLoading = () => dispatch({type: SET_LOADING})

    const {user, users, repos, loading} = state

    return (
        <GithubContext.Provider value={{
            user, users, repos, loading,
            setLoading, search, getRepos, getUser, clearUsers
        }}>
            {children}
        </GithubContext.Provider>
    )
}