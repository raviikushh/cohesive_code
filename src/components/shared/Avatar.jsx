import Avatar from "react-avatar";
import PropTypes from "prop-types";

const Client = ({ username, displayName = true }) => {
  return (
    <div>
      <Avatar name={username} size={50} round="14px" />
      {displayName && <span className="username">{username}</span>}
    </div>
  );
};

Client.propTypes = {
  username: PropTypes.string.isRequired,
};

export default Client;
