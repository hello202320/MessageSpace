import { FaPaperPlane } from "react-icons/fa";
function Form({ sendMessage, handleFileChange, handleChange, handleKeyDown, formValue, file, fileInputRef, textAreaRef }) {
  
    return (
    <form className="form-content">
        <div className="input-section">
          <label htmlFor="file-input" className="file-label">
            <div className="circle">
              <span className="plus">+</span>
            </div>
          </label>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            disabled={file !== null}
            id="file-input"
            hidden
          />
        </div>
        <div className="textarea-section">
          <textarea
            value={formValue}
            ref={textAreaRef}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder='Send a message.'
            className="flex-grow"
          />
        
        </div>
        <button onClick={(e) => sendMessage(e)}><FaPaperPlane/></button>
    </form>
    );
  }
  
  export default Form;