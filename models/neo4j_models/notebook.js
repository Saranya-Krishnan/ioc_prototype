import _ from 'lodash';

const Notebook = module.exports = function (_node) {
    _.extend(this, {
        'id': _node.properties['id'],
        'when': _node.properties['when'],
        'how': _node.properties['how'],
        'what': _node.properties['what'],
        'name1': _node.properties['name1'],
        'name2': _node.properties['name2'],
        'name3': _node.properties['name3'],
        'userId': _node.properties['userId']
    });
};

export default Notebook;