import _ from 'lodash';

const Journey = module.exports = function (_node) {
    _.extend(this, {
        'id': _node.properties['id']
    });
};

export default Journey;