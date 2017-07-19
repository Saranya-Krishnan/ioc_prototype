import _ from 'lodash';

const Quest = module.exports = function (_node) {
    _.extend(this, {
        'id': _node.properties['id'],
        'startDate': _node.properties['startDate'],
        'goalDate': _node.properties['goalDate'],
        'completed': _node.properties['completed'],
        'hidden': _node.properties['hidden'],
        'statement': _node.properties['statement']
    });
};

export default Quest;