// Zustand store for user 

import {create} from 'zustand'

const initialState = {
  user:null,
  state:'loading',// loading , loaded , error
  errorMessage:'',
}

export const useUserStore = create((set) => ({
  ...initialState,
  fetchUser: () => {},
  setError: (message) => {
    set({errorMessage:message,state:'error'})
  },
  reset: () => {set({...initialState})}
}))