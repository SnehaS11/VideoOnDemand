import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Rectangle from '../../assets/images/Rectangle.png';

function Content() {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.root}>
                <div className={classes.left}>
                    <Typography className={classes.leftText}>
                        Diagnosis &amp; Monitoring of airway diseases in the Era of Social Distancing
                    </Typography>

                    <Button
                        color="primary"
                        variant="contained"
                        className={classes.button}
                    >
                        Watch now
                    </Button>
                </div>

                <div>
                    <div className={classes.right}>
                        <img src={Rectangle} alt="rectangle" className={classes.rectangle} />
                        <Typography className={classes.rightText}><i>A unique knowledge sharing experience</i></Typography>
                    </div>
                    <i className={classes.inspire}>inspire</i>
                </div>
            </div>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        alignSelf: 'center',
        margin: 'auto',
        justifyContent: 'space-around',
        width: "80%"
    },
    left: {
        display: 'flex',
        flexDirection: 'column',
        color: 'white'
    },
    leftText: {
        fontSize: 22,
        fontWeight: 'bold',
        width: 350
    },
    button: {
        marginTop: 10,
        width: 150
    },
    right: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    rightText: {
        width: 170,
        fontSize: 18,
        color: theme.palette.primary.main,
        fontWeight: 'bold'
    },
    rectangle: {
        transform: 'scale(0.8)'
    },
    inspire: {
        position: 'relative',
        bottom: 120,
        left: 80,
        alignSelf: 'center',
        fontSize: 50,
        fontFamily: 'fantasy'
    }
}))

export default Content
