import { useNavigate } from "react-router-dom";
import Icon from "../shared/Icon";
import { deleteDocument } from "../../database";

function ProjectCard({ project }) {
  const { language, name, updated_at } = project;
  const navigate = useNavigate();
  // const formatTime = (time) => {
  //   const date = new Date(time);
  //   // import dayjs and convert to relative time
  //   return date.toDateString();
  // };
const handleDelete = async () => {
    try {
      await deleteDocument("/projects", project.id);
      window.location.reload();
      toast.success("Project deleted successfully");
    } catch (error) {
      console.error(error);
    }
}


  return (
    <div
      className=" border select-none border-default-200 overflow-hidden  text-md font-light text-default-400 aspect-video flex flex-col cursor-pointer  rounded-xl hover:shadow-xl hover:bg-default-100/50 hover:text-default-500 hover:border-default-300 active:scale-95 duration-200 ease-out"
    >
      <div 
            onClick={() => {
              navigate(`/project/${project.id}`);
            }}
      className="flex-1 grid place-items-center bg-default-100/50 text-xl font-semibold uppercase">
        {language}
      </div>
      <div className="border-t text-sm border-default-200 p-2.5 flex justify-between" >
        <p className="truncate text-default-600">{name}</p>
        <Icon onClick={handleDelete} name="trash-2" size={16} />
        {/* {updated_at && (
          <p className="text-default-400 text-xs">
            Updated at: {formatTime(updated_at)}
          </p>
        )} */}
      </div>
    </div>
  );
}

export default ProjectCard;
