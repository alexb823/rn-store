import axios from 'axios';

export default axios.create({
  baseURL:
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDzUttjjGlJOOrRHirzWVH6epPekgqhjeo',
});
