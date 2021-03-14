import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';

function Filters(props) {
    const { topics, speakers, selectedSpeakers, selectedTags } = props;
    const classes = useStyles();

    const isTopicSelected = (name) => {
        return selectedTags.find(t => t===name)
    }

    const isSpeakerSelected = (id) => {
        return selectedSpeakers.find(s => s===id)
    }

    return (
        <div className={classes.root}>
            <div className="flex">
                <Typography color="secondary" className={classes.heading}>Topics:</Typography>
                <div className="flex">
                    {topics.map(topic => (
                        <div
                            className={`${classes.tag} cursor ${isTopicSelected(topic.name) ? classes.selected : null}`}
                            key={topic._id}
                            onClick={() => props.onSelectTopic(topic.name)}
                        >
                            {topic.name}
                        </div>
                    ))}
                </div>
            </div>
            <br />
            <div className="flex">
                <Typography color="secondary" className={classes.heading}>Speakers:</Typography>
                <div className="flex">
                    {speakers.map(speaker => (
                        <div
                            className={`${classes.tag} cursor ${isSpeakerSelected(speaker._id) ? classes.selected : null}`}
                            key={speaker._id}
                            onClick={() => props.onSelectSpeaker(speaker._id)}
                        >
                            {speaker.name}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        margin: '0 100px'
    },
    list: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    tag: {
        padding: 5,
        border: `1px solid ${theme.palette.secondary.main}`,
        color: theme.palette.secondary.main,
        borderRadius: 10,
        fontSize: 12,
        marginRight: 20
    },
    heading: {
        fontSize: 12,
        width: 100
    },
    selected: {
        background: theme.palette.primary.main,
        color: 'white'
    }
}))

export default Filters
