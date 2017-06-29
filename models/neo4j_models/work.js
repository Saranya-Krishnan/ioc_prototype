import _ from 'lodash';

const Work = module.exports = function (_node) {
    _.extend(this, {
        'id': _node.properties['id']
    });
};

export default Work;