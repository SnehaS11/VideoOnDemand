import axios from 'axios';

export function createVideo(data) {
    return axios.post('/api/videos', data, { headers: { 'Content-Type': 'multipart/form-data' }})
}

export function createSpeaker(data) {
    return axios.post('/api/speakers', data, { headers: { 'Content-Type': 'multipart/form-data' }})
}
