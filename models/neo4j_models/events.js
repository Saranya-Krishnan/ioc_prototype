import _ from 'lodash';

const Event = module.exports = function (_node) {
    _.extend(this, {
        'id': _node.properties['id'],
        'startDate': _node.properties['startDate'],
        'endDate': _node.properties['endDate'],
        'description': _node.properties['description'],
        'link': _node.properties['link']
    });
};

export default Event;