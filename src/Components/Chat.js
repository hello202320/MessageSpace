
import { format } from 'date-fns';
import { auth } from '../firebase';
import Messages from './Messages';

function Chat(props) {
  if (!auth.currentUser || !props.message.createdAt) return null;

  const { uid, photoURL, createdAt, userName } = props.message;
  const createdAtDate = createdAt.toDate(); // Convert timestamp to Date object
  const formattedCreatedAt = format(createdAtDate, 'MMM dd, yyyy HH:mma'); // Format the Date object

  return (
    uid === auth.currentUser.uid ? (
      <div className='message-content'>
        <div className='sent'>
          <div className='center'>
            <span className='username'>{userName}</span>
            <span className='date'>{formattedCreatedAt}</span>
          </div>
          <Messages props={props} />
        </div>
        <div className='profile-img'>
          <img src={photoURL} alt='Profile' />
        </div>
      </div>
    ) : (
      <div className='message-content-recieved'>
        <div className='recieved'>
          <div className='center'>
            <span className='username'>{userName}</span>
            <span className='date'>{formattedCreatedAt}</span>
          </div>
          <Messages props={props} />
        </div>
        <div className='profile-img'>
          <img src={photoURL} alt='Profile' />
        </div>
      </div>
    )
  );
}

export default Chat;
