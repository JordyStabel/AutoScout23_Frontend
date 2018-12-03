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

let carImages = [
    'https://prod.pictures.autoscout24.net/listing-images/ce184541-babb-44cd-8d71-f460dbf9ba7e_a0d8cc41-443e-46bf-bf6e-34f5c6bd49a2.jpg/640x480.jpg',
    'https://prod.pictures.autoscout24.net/listing-images/2133f5ee-2295-45ad-ae91-46846feba27e_6ce45211-b719-47b4-ad4a-80c084777f8e.jpg/640x480.jpg',
    'https://prod.pictures.autoscout24.net/listing-images/0fe28954-0450-4102-94cf-3bdd5cfb06cf_218b5601-c902-4dec-9a5c-39936e264e1d.jpg/640x480.jpg',
    'https://prod.pictures.autoscout24.net/listing-images/9b6409e1-dfe7-4a68-94a6-5835a45f1302_1ed0e002-f411-4998-b972-b786ac5bddf4.jpg/640x480.jpg',
    'https://prod.pictures.autoscout24.net/listing-images/8f435f6f-4df6-48ba-9f8e-05c6bdfce30e_e57e8bbe-7908-472c-9e2a-d13471d7fef9.jpg/640x480.jpg',
    'https://prod.pictures.autoscout24.net/listing-images/b04f616f-32b6-41f4-b6e4-fe582be1400c_493b9ffd-4e97-47b5-ab8d-61816f5fd2c6.jpg/640x480.jpg'];

const styles = theme => ({
    card: {
        width: '100%',
        marginTop: 15,
        marginLeft: 'auto',
    },
    media: {
        paddingTop: '62.5%',
        overflow: 'hidden'
    },
    imageCard: {
        marginLeft: 10,
        width: 450,
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

        let random = Math.floor(Math.random() * 5);

        return (
            <Card className={classes.card}>
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
                <div style={{display: 'flex'}}>
                    <Card className={classes.imageCard}>
                        <CardMedia
                            className={classes.media}
                            image={carImages[random]}
                            title={car.make}
                        />
                    </Card>
                    <CardContent>
                        <NumberFormat
                            value={car.price}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'Price: $'} suffix={',-'}
                            renderText={value => <Typography variant="title" gutterBottom>{value}</Typography>}/>
                        <Divider/>
                        <NumberFormat
                            value={car.mileage}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'Mileage: '} suffix={' mi'}
                            renderText={value => <Typography variant="title" gutterBottom>{value}</Typography>}/>
                        <Divider/>
                    </CardContent>
                </div>
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
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography variant={"title"} paragraph>Description will come here</Typography>
                        <Typography paragraph>
                            Sed vulputate, suspendisse vulputate in pede lacinia, urna sem morbi dapibus consectetuer
                            dolor, diam dui tristique amet in quis justo. Libero lacinia felis, leo sem in, id pede sit
                            nascetur, dolor wisi risus in, vel vitae turpis felis. Ut quisque elit egestas mi, ut nibh
                            aliquet elementum velit, mauris eu nam risus. Ipsum lacus eros viverra tempus, etiam integer
                            amet vestibulum fringilla vitae consequat, montes libero erat est. Nunc cum ligula, ornare
                            morbi dolorem, tincidunt vestibulum. Elementum eget morbi at vehicula vitae ac, praesent
                            volutpat libero aenean. Non interdum. Tempus ultricies malesuada curabitur elit vivamus
                            morbi, eu pulvinar wisi at nobis, nullam ultrices fusce tellus mi ornare. Lacus dignissim mi
                            felis donec, et vitae. Ultricies scelerisque.
                        </Typography>
                        <Typography paragraph>
                            Lorem ipsum dolor sit amet, sed id diam donec suspendisse diam aenean, arcu nulla tortor
                            fusce, suscipit arcu consequat in eu, dictum orci et metus odio. Adipiscing augue dignissim
                            pede, ut tortor, justo ut, lorem justo tincidunt sed et integer. Convallis et phasellus
                            tellus adipiscing, gravida ac donec turpis nisl aenean, proin et a sed vestibulum, in dolor,
                            volutpat rerum. Est vel nam at ridiculus convallis vitae. Ipsum ut, duis sagittis integer ut
                            nec ullamcorper, tellus aliquam nobis, eget velit luctus libero curabitur tortor vitae.
                            Phasellus urna dui, ultricies dignissim est pretium, pretium adipiscing odio a, vel lorem
                            pellentesque, mauris mauris mauris velit ligula leo. Eu suspendisse amet sagittis
                            scelerisque, a sit malesuada quam libero nam, accumsan officia vel leo in, vestibulum sed
                            varius felis, velit quis ipsum ipsum tellus imperdiet. Sit accumsan rhoncus mauris quisque
                            diam, justo dolor eleifend tempor sed nonummy, mollis donec, maecenas a ante sodales wisi
                            dolor egestas. Sagittis augue magna libero enim. Libero risus sapien lorem ut sapien
                            fringilla, magnis diam libero dui ut, arcu nunc felis etiam potenti erat ultricies, eros et
                            libero mi mi sit. Vehicula risus pellentesque risus dolor rhoncus, metus est facilisis
                            pellentesque blandit eros ac.
                        </Typography>
                        <Typography paragraph>
                            Nec libero nisl ante massa, lectus varius amet, nullam per quis, malesuada dui ipsum eget
                            sagittis, venenatis ut commodo adipiscing neque amet. Felis pellentesque ipsum vestibulum
                            nunc malesuada commodo, nec consectetuer, dictum natoque vitae amet sit elit habitant,
                            egestas tellus, aenean lorem dolor cras. Egestas proin elementum aliquet, eu dui cras turpis
                            ligula, tortor nunc amet quis, ridiculus dui. Curabitur eu maecenas nec eu leo ipsum,
                            molestiae nec nec tellus suspendisse purus. Nonummy tortor, sapien dui nunc etiam. Duis quis
                            posuere nec. Pede aliquam neque vulputate, metus sed, tempus hymenaeos eu faucibus pede
                            nunc, lectus id fusce nullam. Sollicitudin venenatis, blandit rutrum fermentum congue, nec
                            mi lacinia nunc facilisis tempus, per integer nulla, elit arcu adipiscing et. Elit varius
                            risus aenean, et arcu metus, leo nullam, in urna vestibulum luctus. Interdum orci sit
                            aliquam vestibulum hac.
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