import axios from 'axios';

export default axios.create({
  baseURL: 'https://rn-shop-8832f.firebaseio.com',
  // headers: { 'Content-Type': 'application/json' },
});
