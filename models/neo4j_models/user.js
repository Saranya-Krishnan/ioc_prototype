import _ from 'lodash';

const User = module.exports = function (_node) {
    _.extend(this, {
        'id': _node.properties['id'],
        'username': _node.properties['email'],
        'firstName': _node.properties['firstName'],
        'lastName': _node.properties['lastName']
    });
};

export default User;