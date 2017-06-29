import _ from 'lodash';

const Tag = module.exports = function (_node) {
    _.extend(this, {
        'id': _node.properties['id']
    });
};

export default Tag;