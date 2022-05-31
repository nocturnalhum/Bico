import { Link } from 'react-router-dom';
import './error.css';

const Error = () => {
  return (
    <section className='error-screen'>
      <div className='redirect-message'>
        <h2 className='not-found-text'>404</h2>
        <p className='not-found-text'>Page Not Found</p>
        <Link className='not-found-text' to='/'>
          Back home
        </Link>
      </div>
    </section>
  );
};
export default Error;
