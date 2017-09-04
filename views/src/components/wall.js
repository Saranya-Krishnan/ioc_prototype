import React from 'react'
import { Header, Feed } from 'semantic-ui-react'
import FontAwesome from 'react-fontawesome';
const SamplePanda = require('!!url-loader!../../assets/img/sample_panda.jpg');
const SampleOwl = require('!!url-loader!../../assets/img/sample_owl.jpg');

const Avatar1 = require('!!url-loader!../../assets/img/profile_user_1.jpg');
const Avatar2 = require('!!url-loader!../../assets/img/profile_user_2.jpg');


const Wall = () => (
    <div>
        <Header content="Recent Activity"/>
        <Feed size='large'>
            <Feed.Event>
                <Feed.Label image={Avatar1}/>
                <Feed.Content>
                    <Feed.Summary>
                        <Feed.User>Elliot Fine</Feed.User> added you as a friend
                        <Feed.Date>1 Hour Ago</Feed.Date>
                    </Feed.Summary>
                    <Feed.Meta>
                        <Feed.Like>
                            <FontAwesome name='like' />
                            4 Likes</Feed.Like>
                    </Feed.Meta>
                </Feed.Content>
            </Feed.Event>

            <Feed.Event>
                <FontAwesome name='pencil' className="wall-icon"/>
                <Feed.Content>
                    <Feed.Summary>
                        You submitted a new post to the <em>Draw a portrait of Stephen Colbert</em>
                        <Feed.Date>3 days ago</Feed.Date>
                    </Feed.Summary>
                    <Feed.Extra text>
                       I think the glasses are looking good now.
                    </Feed.Extra>
                    <Feed.Meta>
                        <Feed.Like>11 Likes</Feed.Like>
                    </Feed.Meta>
                </Feed.Content>
            </Feed.Event>

            <Feed.Event>
                <Feed.Label image={Avatar2}/>
                <Feed.Content>
                    <Feed.Date>4 days ago</Feed.Date>
                    <Feed.Summary>
                        <a>Helen Troy</a> added <a>2 new illustrations</a>
                    </Feed.Summary>

                    <Feed.Extra images>
                        <a><img src={SampleOwl} /></a>
                        <a><img src={SamplePanda} /></a>
                    </Feed.Extra>

                    <Feed.Meta like='1 Like' />
                </Feed.Content>
            </Feed.Event>
        </Feed>
        <strong className="poc-text">This is placeholder.</strong>
    </div>
);

export default Wall