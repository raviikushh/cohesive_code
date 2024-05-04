import { lazy, Suspense } from "react";
import PropTypes from "prop-types";
import dynamicIconImports from "lucide-react/dynamicIconImports";

const fallback = <div style={{ background: "#ddd", width: 24, height: 24 }} />;

const Icon = ({ name, ...props }) => {
  const LucideIcon = lazy(dynamicIconImports[name]);

  return (
    <Suspense fallback={fallback}>
      <LucideIcon {...props} />
    </Suspense>
  );
};

// FIx prop validation error
Icon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Icon;
