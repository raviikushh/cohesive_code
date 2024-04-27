

export const login = async (email, password) => {
  try{
    // login with email and password
    console.log(email, password)
  } catch(err) {
    console.log('Error loggin in :', err.message)
  }
}

export const signupWithEmail = async (email, password) => {
  try{
    // signup with email and password
    console.log(email,password)
  }catch(err){
    console.log('Error signing up :', err.message)
  }
}



