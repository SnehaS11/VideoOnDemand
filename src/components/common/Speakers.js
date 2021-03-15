import React from 'react'
import { toBase64 } from '../../Utils'

function Speakers({ speakers }) {
    return (
        <div style={{marginTop: 15}}>
            {speakers.length > 0 && <b style={{ margin: 2, fontSize: 12 }}>SPEAKERS</b>}

            <div className="flex">
                {speakers.map(speaker => (
                    <Speaker speaker={speaker} />
                ))}
            </div>
        </div>
    )
}

export function Speaker({ speaker }) {
    return (
        <div className="flex" style={{marginRight: 10}} key={speaker._id}>
            <img
                src={speaker.image ? `data:image/png;base64,${toBase64(speaker.image.data.data)}` : null}
                alt="speaker"
                style={{
                    width: 50,
                    height: 50,
                    borderRadius: '50%'
                }}
            />
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                fontSize: 12,
                color: 'grey'
            }}>
                <p style={{margin: '2px 10px'}}>{speaker.name}</p>
                <p style={{margin: '2px 10px'}}>{speaker.qualification}, {speaker.institute}</p>
            </div>
        </div>
    )
}

export default Speakers
