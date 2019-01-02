import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
//import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
//import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Divider} from '@material-ui/core';
import NumberFormat from 'react-number-format';

const styles = theme => ({
    card: {
        width: '100%',
        marginTop: 15,
        marginLeft: 'auto'
    },
    media: {
        paddingTop: '55%',
        overflow: 'hidden'
    },
    imageCard: {
        width: 500,
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
        [theme.breakpoints.up('sm')]: {
            marginRight: -8,
        },
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    }
});

class RecipeReviewCard extends React.Component {
    state = {expanded: false};

    handleExpandClick = () => {
        this.setState(state => ({expanded: !state.expanded}));
    };

    render() {
        const {classes} = this.props,
            {car} = this.props;

        return (
            <Card className={classes.card}>
                <div style={{display: 'flex'}}>
                    <Card className={classes.imageCard}>
                        <CardMedia
                            className={classes.media}
                            image={(car.image !== "") ? car.image : 'https://cdn4.iconfinder.com/data/icons/car-silhouettes/1000/sedan-512.png'}
                            title={car.make}
                        />
                    </Card>
                    <div style={{display: 'flex', flexDirection: 'column', flexGrow: 2}}>
                        <div style={{flexGrow: 1}}>
                            <CardHeader
                                action={
                                    <IconButton>
                                        <MoreVertIcon/>
                                    </IconButton>
                                }
                                title={car.make + " " + car.model}
                                subheader=<NumberFormat value={car.created} displayType={'text'} format="####/##/##"
                                renderText={value => <p style={{margin: 0}}>{value}</p>}/>
                            />
                        </div>
                        <div style={{flexGrow: 2}}>
                            <CardContent>
                                <NumberFormat
                                    value={car.price}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={'Price: $'} suffix={',-'}
                                    renderText={value => <Typography variant="title"
                                                                     gutterBottom>{value}</Typography>}/>
                                <NumberFormat
                                    value={car.mileage}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={'Mileage: '} suffix={' mi'}
                                    renderText={value => <Typography variant="title"
                                                                     gutterBottom>{value}</Typography>}/>
                            </CardContent>
                        </div>
                        <div style={{flexGrow: 1}}>
                            <CardActions className={classes.actions} disableActionSpacing>
                                <IconButton aria-label="Add to favorites">
                                    <FavoriteIcon/>
                                </IconButton>
                                <IconButton aria-label="Share">
                                    <ShareIcon/>
                                </IconButton>
                                <IconButton
                                    className={classnames(classes.expand, {
                                        [classes.expandOpen]: this.state.expanded,
                                    })}
                                    onClick={this.handleExpandClick}
                                    aria-expanded={this.state.expanded}
                                    aria-label="Show more"
                                >
                                    <ExpandMoreIcon/>
                                </IconButton>
                            </CardActions>
                        </div>
                    </div>
                </div>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography variant={"title"} paragraph>Description will come here</Typography>
                        <Typography paragraph>
                            Sed vulputate, suspendisse vulputate in pede lacinia, urna sem morbi dapibus consectetuer
                            dolor, diam dui tristique amet in quis justo. Libero lacinia felis, leo sem in, id pede sit
                            nascetur, dolor wisi risus in, vel vitae turpis felis. Ut quisque elit egestas mi, ut nibh
                            aliquet elementum velit, mauris eu nam risus.
                        </Typography>
                        <Typography paragraph>
                            Lorem ipsum dolor sit amet, sed id diam donec suspendisse diam aenean, arcu nulla tortor
                            fusce, suscipit arcu consequat in eu, dictum orci et metus odio. Adipiscing augue dignissim
                            pede, ut tortor, justo ut, lorem justo tincidunt sed et integer. Convallis et phasellus
                            tellus adipiscing, gravida ac donec turpis nisl aenean, proin et a sed vestibulum, in dolor,
                            volutpat rerum. Est vel nam at ridiculus convallis vitae. Ipsum ut, duis sagittis integer ut
                            nec ullamcorper, tellus aliquam nobis, eget velit luctus libero curabitur tortor vitae.
                            Phasellus urna dui, ultricies dignissim est pretium, pretium adipiscing odio a, vel lorem
                            pellentesque, mauris mauris mauris velit ligula leo.
                        </Typography>
                        <Typography paragraph>
                            Nec libero nisl ante massa, lectus varius amet, nullam per quis, malesuada dui ipsum eget
                            sagittis, venenatis ut commodo adipiscing neque amet. Felis pellentesque ipsum vestibulum
                            nunc malesuada commodo, nec consectetuer, dictum natoque vitae amet sit elit habitant,
                            egestas tellus, aenean lorem dolor cras. Egestas proin elementum aliquet, eu dui cras turpis
                            ligula, tortor nunc amet quis, ridiculus dui.
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        );
    }
}

RecipeReviewCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeReviewCard);