
// Zustand store  in react 

import {create} from 'zustand'

const initialState = {
  projects:null,
  state:'loading',// loading , loaded , error
  errorMesage:'',
}

export const useProjectStore = create((set) => ({
  ...initialState,
  fetchProjects: () => {},
  setError: (message) => set({errorMessage:message,state:'error'}),
  reset: () => set({...initialState})
}))