import axios from 'axios';

const instance = axios.create( { 
    baseURL: 'https://react-my-first-project-1679c.firebaseio.com/'
} );

export default instance;