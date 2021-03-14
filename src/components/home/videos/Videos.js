import React from 'react'
import Typography from '@material-ui/core/Typography';
import VideoCard from './VideoCard';

function Videos(props) {
    const { videos } = props;

    return (
        <div>
            {Object.entries(videos).map(([key, value], index)=> (
                <div key={index}>
                    <Typography color='primary' style={{fontSize: 14}}>{key}</Typography><br/>
                    <div className="flex" style={{
                        overflowX: 'scroll'
                    }}>
                        {value.length > 0 && value.map((video) => (
                            <VideoCard video={video} onClickVideo={props.onClickVideo}/>
                        ))}
                    </div>
                </div>
            ))}

        </div>
    )
}

export default Videos
