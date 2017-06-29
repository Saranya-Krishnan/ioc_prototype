import _ from 'lodash';

const Notebook = module.exports = function (_node) {
    _.extend(this, {
        'id': _node.properties['id']
    });
};

export default Notebook;