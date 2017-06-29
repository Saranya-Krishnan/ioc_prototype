import _ from 'lodash';

const Page = module.exports = function (_node) {
    _.extend(this, {
        'id': _node.properties['id']
    });
};

export default Page;