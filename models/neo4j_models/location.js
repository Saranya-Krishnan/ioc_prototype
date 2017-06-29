import _ from 'lodash';

const Location = module.exports = function (_node) {
    _.extend(this, {
        'id': _node.properties['id']
    });
};

export default Location;