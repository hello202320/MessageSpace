
const Messages = ({props}) => {
    const {text,image,video,other,audio, fileName} = props.message
  
    return(
        <>
        {image && <img src={image} ></img>}
        {text && text.startsWith("http") ? ( 
        <div>
          <a href={text}>
            {text}
          </a>
         
        </div>
        
      ) :<div> {text} </div>}
        {other && 
          <div>
              <a href={other}><img src='./images.png'></img></a>
              <span className="reverse file"><p>{fileName}</p></span>
          </div>
        
        }
        {video && 
          <video controls loop>
            <source src={video}/>
            Your browser does not support the media tags
          </video>
        }
        {
          audio &&  
          <audio controls loop>
            <source src={audio}/>
            Your browser does not support the media tags
          </audio>
        }
      </>
    )
}

export default Messages;

