import _ from 'lodash';

const Suggestion = module.exports = function (_node) {
    _.extend(this, {
        'id': _node.properties['id']
    });
};

export default Suggestion;