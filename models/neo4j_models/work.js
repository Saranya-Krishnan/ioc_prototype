import _ from 'lodash';

const Work = module.exports = function (_node) {
    _.extend(this, {
        'id': _node.properties['id'],
        'title': _node.properties['title'],
        'description': _node.properties['description']
    });
};

export default Work;