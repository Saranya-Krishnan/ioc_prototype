import _ from 'lodash';

const Image = module.exports = function (_node) {
    _.extend(this, {
        'id': _node.properties['id'],
        'url': _node.properties['url']
    });
};

export default Image;