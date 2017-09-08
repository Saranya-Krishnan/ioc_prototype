import _ from 'lodash';

const Location = module.exports = function (_node) {
    _.extend(this, {
        'id': _node.properties['id'],
        'latitude': _node.properties['latitude'],
        'longitude': _node.properties['longitude'],
        'title': _node.properties['title']
    });
};

export default Location;