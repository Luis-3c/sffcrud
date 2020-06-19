import axios from 'axios';

/* const ENDPOINT = 'https://superflyfitnessapi.herokuapp.com'; */
const ENDPOINT = 'https://superflyfitnessapi.herokuapp.com/';

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
};


const api = {
    videos: {
      list() {
         return axios.get(ENDPOINT + '/admin/videos');
      },
      create(video){
        return axios.post(ENDPOINT + '/admin/savevideo', video, config);
      },
      update(video){
        return axios.post(ENDPOINT + '/admin/updatevideo', video, config);
      },
      delete(videoid){
        return axios.delete(ENDPOINT + '/admin/deletevideo/' + videoid, config);
      }
    }
}

export default api;

