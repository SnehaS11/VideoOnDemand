import { withStyles } from '@material-ui/core';
import React, { Component } from 'react'

import { fetchSpeakers, fetchTags, fetchVideos } from "../Rest";
import Filters from './Filters';
import Videos from './Videos';
import VideoStream from './VideoStream';
import Typography from '@material-ui/core/Typography';

export class VideosContainer extends Component {

    state = {
        topics: [],
        speakers: [],
        allVideos: [],
        filteredVideos: [],
        selectedVideo: null,
        relatedVideos: [],
        openVideo: false,
        selectedSpeakers: [],
        selectedTags: []
    }

    componentDidMount() {
        this.fetchTopics();
        this.fetchSpeakers();
        this.fetchVideos();
    }

    fetchTopics = async () => {
        try {
            const response = await fetchTags();
            this.setState({
                topics: response.data
            })
        } catch (err) {
            console.log('error fetching topics', err)
        }
    }

    fetchSpeakers = async () => {
        try {
            const response = await fetchSpeakers();
            this.setState({
                speakers: response.data
            })
        } catch (err) {
            console.log('error fetching topics', err)
        }
    }

    fetchVideos = async () => {
        try {
            let filter = '';
            const { selectedSpeakers, selectedTags } = this.state;
            if (selectedSpeakers.length > 0) {
                filter += `speakers=${selectedSpeakers.join(',')}&`
            }
            if (selectedTags.length > 0) {
                filter += `tags=${selectedTags.join(',')}`
            }
            const response = await fetchVideos(filter);

            //Show videos topic wise
            let topics = {};
            let videos = response.data;
            videos.forEach(v => {
                v.tags.forEach(tag => {
                    if(topics[tag]) {
                        topics[tag].push(v)
                    } else {
                        topics[tag] = [v];
                    }
                })
            })

            this.setState({
                filteredVideos: topics,
            })
        } catch (err) {
            console.log('error fetching topics', err)
        }
    }

    onClickVideo = (video) => {
        //Fetch other videos by the speaker
        let selectedSpeakers = video.speakers.map(s => s._id);
        let selectedTags = video.tags.map(t => t);

        this.setState({
            selectedVideo: video,
            openVideo: true,
            selectedSpeakers,
            selectedTags
        }, () => {
            this.fetchMoreVideos();
        })
    }

    fetchMoreVideos = () => {
        const { selectedVideo, selectedSpeakers, selectedTags } = this.state;
        let calls = [];
        if(selectedSpeakers) {
            calls.push(fetchVideos(`speakers=${selectedSpeakers.join(',')}`))
        }
        if(selectedTags) {
            calls.push(fetchVideos(`tags=${selectedTags.join(',')}`));
        }

        Promise.all(calls)
        .then(resp => {
            let relatedVideos = [
                ...resp[0].data,
                ...resp[1].data
            ]
            //Remove current video from related video
            relatedVideos = relatedVideos.filter(v => v._id !== selectedVideo._id)

            this.setState({
                relatedVideos
            })
        })
        .catch(err => {
            console.log('error getting related videos', err)
        })

    }

    onSelectSpeaker = (id) => {
        let { selectedSpeakers } = this.state;
        let filtered = [...selectedSpeakers]
        let idIndex = selectedSpeakers.findIndex(s => s === id);

        if (idIndex === -1) {
            filtered.push(id)
        } else {
            filtered.splice(idIndex, 1)
        }
        this.setState({
            selectedSpeakers: filtered
        }, () => this.fetchVideos())
    }

    onSelectTopic = (name) => {
        let { selectedTags } = this.state;
        let filtered = [...selectedTags]
        let idIndex = selectedTags.findIndex(t => t === name);

        if (idIndex === -1) {
            filtered.push(name)
        } else {
            filtered.splice(idIndex, 1)
        }
        this.setState({
            selectedTags: filtered
        }, () => this.fetchVideos())
    }

    handleCloseVideo = () => this.setState({ openVideo: false, selectedVideo: null })

    render() {
        const { topics, speakers, filteredVideos, selectedVideo, openVideo, relatedVideos, selectedSpeakers, selectedTags } = this.state;
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Filters
                    topics={topics}
                    speakers={speakers}
                    selectedSpeakers={selectedSpeakers}
                    selectedTags={selectedTags}
                    onSelectSpeaker={this.onSelectSpeaker}
                    onSelectTopic={this.onSelectTopic}
                />
                <br />
                <br />

                <Typography color='primary' style={{ fontSize: 14 }}>Recommended Videos</Typography><br />

                <Videos
                    topic="Recommended Videos"
                    videos={filteredVideos}
                    onClickVideo={this.onClickVideo}
                />

                {selectedVideo &&
                    <VideoStream
                        open={openVideo}
                        video={selectedVideo}
                        speakers={speakers}
                        relatedVideos={relatedVideos}
                        handleClose={this.handleCloseVideo}
                    />}
            </div>
        )
    }
}

const styles = (theme) => ({
    root: {
        margin: '0 60px'
    }
})

export default withStyles(styles)(VideosContainer)
