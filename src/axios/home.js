import axios from 'axios';
export function getName(data){
    axios.get('xxxxx',data);
}

export function getUser(){
    return axios.get('/api/getUsers');
}
export function getTabList(data){
    return axios.post('xxxxx',data)
}
