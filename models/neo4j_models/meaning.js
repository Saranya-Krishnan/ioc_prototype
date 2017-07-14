import _ from 'lodash';

const Meaning = module.exports = function (_node) {
    _.extend(this, {
        'id': _node.properties['id'],
        'label': _node.properties['label'],
        'description': _node.properties['description'],
        'sourceURI': _node.properties['sourceURI'],
        'schemaName': _node.properties['schemaName'],
        'lastUpdate': _node.properties['lastUpdate'],
    });
};

export default Meaning;