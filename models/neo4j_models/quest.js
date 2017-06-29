import _ from 'lodash';

const Quest = module.exports = function (_node) {
    _.extend(this, {
        'id': _node.properties['id']
    });
};

export default Quest;