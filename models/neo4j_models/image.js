import _ from 'lodash';

const Image = module.exports = function (_node) {
    _.extend(this, {
        'id': _node.properties['id'],
        'signature': _node.properties['signature'],
        'width': _node.properties['width'],
        'height': _node.properties['height'],
        'format': _node.properties['format'],
        'url': _node.properties['url'],
        'secure_url': _node.properties['secure_url'],
        'JFIFVersion': _node.properties['JFIFVersion'],
        'colors': _node.properties['colors'],
        'predominant': _node.properties['predominant'],
        'phash': _node.properties['phash'],
        'illustration_score': _node.properties['illustration_score'],
        'grayscale': _node.properties['grayscale'],
        'original_filename': _node.properties['original_filename'],
        'classification': _node.properties['classification']
    });
};

export default Image;