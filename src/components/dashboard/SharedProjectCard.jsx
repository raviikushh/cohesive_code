import useAuthState from "../../hooks/useAuthState";
import { useNavigate } from "react-router-dom";

function SharedProjectCard({ project }) {
  const { language, name, created_by } = project;
 
  const {user} = useAuthState();
  const navigate = useNavigate();


  // const formatTime = (time) => {
  //   const date = new Date(time);
  //   // import dayjs and convert to relative time
  //   return date.toDateString();
  // };


  return (
    <div className=" border select-none border-default-200 overflow-hidden  text-md font-light text-default-400 aspect-video flex flex-col cursor-pointer  rounded-xl hover:shadow-xl hover:bg-default-100/50 hover:text-default-500 hover:border-default-300 active:scale-95 duration-200 ease-out">
      <div className="flex-1 grid place-items-center bg-default-100/50 text-xl font-semibold uppercase"
                  onClick={() => {
                    navigate(`/project/${project.id}`);
                  }}
      >
        {language}
      </div>
      <div className="border-t text-sm border-default-200 p-2.5">
        <p className="truncate text-default-600">{name}</p>
        <div className="text-default-400 text-xs flex items-center gap-1 ">
          Shared by:
          <div className="rounded-full bg-primary-500 text-white text-xs text-semibold w-4 h-4 flex items-center justify-center">
            {created_by[0].toUpperCase()}
          </div>
          <span className="text-secondary-500 ">{created_by}</span>
        </div>
        {/* {updated_at && (
          <p className="text-default-400 text-xs">
            Updated at: {formatTime(updated_at)}
          </p>
        )} */}
      </div>
    </div>
  );
}

export default SharedProjectCard;