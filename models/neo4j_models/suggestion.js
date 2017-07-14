import _ from 'lodash';

const Suggestion = module.exports = function (_node) {
    _.extend(this, {
        'id': _node.properties['id'],
        'meaningId': _node.properties['meaningId'],
        'prompt': _node.properties['prompt']
    });
};

export default Suggestion;