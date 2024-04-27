import { supabaseClient } from "../supabase";

export const createProject = async ({
  name,
  language,
}) => {
  try {
    // create project
    console.log(name, language)
    const { data, error } = await supabaseClient
      .from('projects')
      .insert([
        { name, language }
      ]).select().single()
    console.log(data,error)
    return data;
  } catch (err) {
    console.log('Error creating project :', err.message)
  }
}

export const getProjects = async (userId) => {
  try {
    // get projects
    const {data,error} = await supabaseClient.from('projects').select('*').eq('created_by', userId);

    console.log(data,error)

    return data
  } catch (err) {
    console.log('Error getting projects :', err.message)
  }
}

