import _ from 'lodash';

const Tag = module.exports = function (_node) {
    _.extend(this, {
        'id': _node.properties['id'],
        'word': _node.properties['word'],
        'ontology': _node.properties['ontology'],
    });
};

export default Tag;