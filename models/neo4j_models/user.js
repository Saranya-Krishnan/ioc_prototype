import _ from 'lodash';

const User = module.exports = function (_node) {
    _.extend(this, {
        'id': _node.properties['id'],
        'username': _node.properties['email'],
        'firstName': _node.properties['firstName'],
        'lastName': _node.properties['lastName'],
        'bio': _node.properties['bio'],
        'avatar': _node.properties['avatar']
    });
};

export default User;