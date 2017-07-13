import _ from 'lodash';

const Schema = module.exports = function (_node) {
    _.extend(this, {
        'id': _node.properties['id'],
        'schemaName': _node.properties['schemaName'],
    });
};

export default Schema;