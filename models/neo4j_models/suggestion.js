import _ from 'lodash';

const Suggestion = module.exports = function (_node) {
    _.extend(this, {
        'id': _node.properties['id'],
        'prompt': _node.properties['prompt']
    });
};

export default Suggestion;