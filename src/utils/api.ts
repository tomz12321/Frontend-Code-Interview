import axios from 'axios';

//Function to dataFetch
const getData = async () => {
  return await axios.get('/api/maze');
};

export default getData;
