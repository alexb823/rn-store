import axios from 'axios';
import {fbKey} from '../variables.config'


export default axios.create({
  baseURL:
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${fbKey}`,
});
