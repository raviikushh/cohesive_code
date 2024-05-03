import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@nextui-org/react';
import { setDocument } from '../hooks/database';

const Dashboard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectLanguage, setNewProjectLanguage] = useState('');

  // Adding data in database


  const handleCreateProject = async (e) => {
    if (newProjectName && newProjectLanguage) {
      const newProject = {
        id: projects.length + 1,
        name: newProjectName,
        language: newProjectLanguage,
      };

      setProjects([...projects, newProject]);

      setShowModal(false);
      setNewProjectName('');
      setNewProjectLanguage('');
      //   navigate(`/editor/${newProject.id}`);
    }
    e.prevenetDefault()
    const data ={
      name: newProjectName,
      language: newProjectLanguage
    };
    try{
      await setDocument('users', data)
    }
    catch(error){
      console.log(error)
    }
  };

  return (
      <div className="container mx-auto py-8"> 
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="flex justify-end mb-4">
        <Button
        size="lg"
          color="secondary"
          onClick={() => setShowModal(true)}
        >
          Add Project
        </Button>
      </div>

      <h2 className="text-2xl font-bold mb-4">Created By You</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8 ">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-slate-500 shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => navigate(`/editor/${project.id}`)}
          >
            <h2 className="text-xl text-black font-bold mb-2">{project.name}</h2>
            <p className="text-black">Language: {project.language}</p>
          </div>
        ))}
      </div>
      <h2 className="text-2xl font-bold mb-4">Shared Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div className="bg-slate-500 shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                    <h2 className="text-xl text-black font-bold mb-2">Project Name</h2>
                    <p className="text-black">Language</p>
                </div>
        </div>        

      {showModal ? (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-slate-700 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Create New Project</h2>
            <div className="mb-4">
              <label htmlFor="projectName" className="block font-bold mb-2">
                Project Name
              </label>
              <input
                type="text"
                id="projectName"
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="projectLanguage" className="block font-bold mb-2">
                Language
              </label>
              <select
                id="projectLanguage"
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                value={newProjectLanguage}
                onChange={(e) => setNewProjectLanguage(e.target.value)}
              >
                <option value="">Select Language</option>
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
              </select>
            </div>
            <div className="flex justify-end gap-4">
              <Button
                color="secondary"
                type="submit"
                size="lg "
                onClick={handleCreateProject}
              >
                Create Project
              </Button>
              <Button
                color="primary"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Dashboard;