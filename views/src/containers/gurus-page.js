import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as NavActionCreators from '../actions/nav_actions';
import * as FooterActionCreators from '../actions/footer_actions';
import Nav from '../components/nav';
import Instructor from '../components/instructor';
import Footer from '../components/footer';
import { Container, Card} from 'semantic-ui-react';
//Temp
const instructorImage1 = require('!!url-loader!../../assets/img/instructor_1.jpg');
const instructorImage2 = require('!!url-loader!../../assets/img/instructor_2.jpg');
const instructorImage3 = require('!!url-loader!../../assets/img/instructor_3.jpg');
const instructorImage4 = require('!!url-loader!../../assets/img/instructor_4.jpg');
const instructorImage5 = require('!!url-loader!../../assets/img/instructor_5.jpg');

class GurusPage extends Component {
    static propTypes = {
        gurus: PropTypes.object.isRequired
    };
    render() {
        const { dispatch } = this.props;
        const clickMenuItem = bindActionCreators(NavActionCreators.clickMenuItem, dispatch);
        const updateUserInfo = bindActionCreators(NavActionCreators.updateUserInfo, dispatch);
        const setLoggedIn = bindActionCreators(NavActionCreators.setLoggedIn, dispatch);
        const signOut = bindActionCreators(NavActionCreators.signOut, dispatch);
        const clickFooterItem = bindActionCreators(FooterActionCreators.clickFooterItem, dispatch);
        return (
            <div>
                <Nav
                    signOut={signOut}
                    clickMenuItem={clickMenuItem}
                    updateUserInfo={updateUserInfo}
                    setLoggedIn={setLoggedIn}>
                </Nav>
                <Container>
                    <h1>Meet the Creativity Gurus</h1>
                    <p> Each instructor can offer you challenges that will improve your creativity.</p>
                    <Card.Group itemsPerRow={2}>
                        <Instructor
                            image={instructorImage1}
                            name={'Horus McCloud'}
                            subjectName={'Life Drawing'}
                            bio={'Framed in a different way, the hilding male reveals itself as a leggy glove to those who look. The kettle of a toad becomes an unwrought sociology. In ancient times a paunchy lentil is a jewel of the mind. What we don\'t know for sure is whether or not a pisces can hardly be considered a stringless screen without also being a latency.'}
                            followers={2456}
                            id={1}
                        />
                        <Instructor
                            image={instructorImage2}
                            name={'Gretta VonFloral'}
                            subjectName={'Architecture'}
                            bio={'As far as we can estimate, their trouble was, in this moment, an unscoured trial. The first quartic danger is, in its own way, a porter. Salesmen are triform chords. Nowhere is it disputed that a stubborn car is a rabbi of the mind.'}
                            followers={987}
                            id={2}
                        />
                        <Instructor
                            image={instructorImage3}
                            name={'Johnny Good'}
                            subjectName={'Productivity'}
                            bio={'Recent controversy aside, we can assume that any instance of a moon can be construed as a zillion brother. A cream is the teacher of a drill. A gated pair of shorts\'s chair comes with it the thought that the gummy windshield is an interviewer. Their nigeria was, in this moment, an upraised step-grandfather.'}
                            followers={4756}
                            id={3}
                        />
                        <Instructor
                            image={instructorImage4}
                            name={'Gordie Vicente'}
                            subjectName={'Cartooning'}
                            bio={'Authors often misinterpret the flavor as a wifely armchair, when in actuality it feels more like a chestnut organisation. A biology is a dextrorse goal. A virgate acoustic\'s authorization comes with it the thought that the gabbroid undershirt is a swim. We can assume that any instance of a lycra can be construed as a glasslike detective.'}
                            followers={5666}
                            id={4}
                        />
                        <Instructor
                            image={instructorImage5}
                            name={'Alona Mystique'}
                            subjectName={'Mindfullness'}
                            bio={'A newsprint is a peripheral from the right perspective. Shames are farfetched authors. A period is an eating skate. A sudan of the rose is assumed to be a shirty morocco.'}
                            followers={4628}
                            id={5}
                        />
                    </Card.Group>
                </Container>
                <Footer
                    clickFooterItem={clickFooterItem}>
                </Footer>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        gurus: state
    }
};

export default connect(mapStateToProps)(GurusPage);