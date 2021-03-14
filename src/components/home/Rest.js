import axios from 'axios';

export const fetchTags = () => {
    return axios.get("/api/tags")
}

export const fetchSpeakers = () => {
    return axios.get("/api/speakers")
}

export const fetchVideos = (filter) => {
    return axios.get(`/api/videos?${filter}`)
}
