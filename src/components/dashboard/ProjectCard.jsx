import PropTypes from "prop-types";

function ProjectCard({ project }) {
  const { language, name, updated_at } = project;

  const formatTime = (time) => {
    const date = new Date(time);
    // import dayjs and convert to relative time
    return date.toDateString();
  };

  return (
    <div className=" border select-none border-default-200 overflow-hidden  text-md font-light text-default-400 aspect-video flex flex-col cursor-pointer  rounded-xl hover:shadow-xl hover:bg-default-100/50 hover:text-default-500 hover:border-default-300 active:scale-95 duration-200 ease-out">
      <div className="flex-1 grid place-items-center bg-default-100/50 text-xl font-semibold uppercase">
        {language}
      </div>
      <div className="border-t text-sm border-default-200 p-2.5">
        <p className="truncate">{name}</p>
        {updated_at && (
          <p className="text-default-400 text-xs">
            Updated at: {formatTime(updated_at)}
          </p>
        )}
      </div>
    </div>
  );
}

export default ProjectCard;
