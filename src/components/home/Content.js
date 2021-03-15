import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Rectangle from '../../assets/images/Rectangle.png';

function Content() {
    const classes = useStyles();

    return (
        <div>
            <Grid container className={classes.root}>
                <Grid item xs={12} sm={6} className={classes.left}>
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
                </Grid>

                <Grid item xs={12} sm={6}>
                    <div className={classes.right}>
                        <img src={Rectangle} alt="rectangle" className={classes.rectangle} />
                        <Typography className={classes.rightText}><i>A unique knowledge sharing experience</i></Typography>
                    </div>
                    <i className={classes.inspire}>inspire</i>
                </Grid>
            </Grid>
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
        fontSize: 26,
        fontWeight: 'bold',
        width: 350,
        textShadow: '0 0 black'
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
        fontSize: 22,
        color: theme.palette.primary.main,
        fontWeight: 'bolder',
        position: 'relative',
        right: 20,
        textShadow: '0 0 black'
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
    },
    [theme.breakpoints.down('sm')]: {
        root: {
            width: '100%',
            marginTop: 20,
            flexDirection: 'column-reverse'
        },
        left: {
            alignItems: 'center',
            justifyContent: 'flex-start',
            top: -100,
            position: 'relative',
            textAlign: 'center'
        },
        leftText: {
            fontSize: 22
        },
        rightText: {
            width: 'fit-content',
            position: 'relative',
            right: 50,
            marginRight: 10
        },
        rectangle: {
            transform: 'scale(0.6)'
        }
    }
}))

export default Content
