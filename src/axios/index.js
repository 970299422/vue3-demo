import axios from 'axios';
axios.defaults.timeout = 50000
//环境配置
if(import.meta.env.VITE_MODE_NAME === 'development'){
  axios.defaults.baseURL = '/';
}else{
}

axios.interceptors.request.use(
    (config) => {
      return config
    },
    (error) => {

      return error
    }
  )
  axios.interceptors.response.use(
    (res) => {
        return Promise.resolve(res.data);
    },
    (error) => {
      return error
    }
  );