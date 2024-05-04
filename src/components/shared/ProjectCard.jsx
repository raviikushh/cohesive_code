import PropTypes from "prop-types";

function ProjectCard({ language, name }) {
  return (
    <div className=" border select-none border-default-200 overflow-hidden  text-md font-light text-default-400 aspect-video flex flex-col cursor-pointer  rounded-xl hover:shadow-xl hover:bg-default-100/50 hover:text-default-500 hover:border-default-300 active:scale-95 duration-200 ease-out">
      <div className="flex-1 grid place-items-center bg-default-100/50 text-xl font-semibold uppercase">
        {language}
      </div>
      <div className="border-t text-sm border-default-200 p-2.5">
        <p className="truncate">{name}</p>
      </div>
    </div>
  );
}

ProjectCard.propTypes = {
  language: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default ProjectCard;
