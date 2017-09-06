import _ from 'lodash';

const Location = module.exports = function (_node) {
    _.extend(this, {
        'id': _node.properties['id'],
        'lat': _node.properties['lat'],
        'long': _node.properties['long'],
        'keywords': _node.properties['long'],
        'title': _node.properties['title']
    });
};

export default Location;