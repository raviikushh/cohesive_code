
import PropTypes from 'prop-types';

const Output = ({ editorRef, language }) => {
    const runCode = () => {
        const code = editorRef.current.getValue();
        if (!code) return;
    };
    return (
        <div className="flex flex-col flex-wrap items-center">
            <div className="btn border-2 rounded-md border-slate-300 cursor-pointer p-1 flex w-28 mb-2 justify-around mt-2 hover:bg-green-700 bg-green-500">Run Code</div>
            <div className="showoutput">
                <div className="output h-32 w-[75vw] border-2 rounded-md border-slate-500"></div>
            </div>
        </div>
    );
};

Output.propTypes = {
    editorRef: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
};

export default Output;