import uuid from 'uuid';
import Location from './neo4j_models/location';

const create = function (session) {

};

const createFromMeaning = function (session, meaningId, label, latitude, longitude) {
    const locationId = uuid.v4();
    return session.run('MATCH (l:Location {title:{title}}) RETURN location', { title:label })
        .then(results => {
            if (!_.isEmpty(results.records)) {
                return new Location(results.records[0].get('location'));
            } else {
                return session.run('CREATE (location:Location {id:{locationId}, title:{title}, latitude:{latitude}, longitude:{longitude} RETURN location', { locationId:locationId, title:label, latitude:latitude, longitude:longitude }
                ).then(results => {
                    const locationResult = results;
                    return session.run('MATCH (l:Location {id:{locationId}}) MATCH (m:Meaning {id:{meaningId}}) CREATE (m)<-[:IS_LOCATED_HERE]-(l)',{ locationId:locationId, meaningId:meaningId }
                    ).then(lResults => {
                        return new Location(locationResult.records[0].get('location'))
                    })
                })
            }
        })
};

const update = function (session) {

};

const deletion = function (session) {

};

const display = function (session, locationsId) {
    return session.run('MATCH (l:Location {id:{locationsId}}) RETURN l',{locationsId:locationsId}
    ).then(results => {
        return new Location(results.records[0].get('l'));
    })
};

module.exports = {
    create: create,
    createFromMeaning:createFromMeaning,
    update: update,
    deletion: deletion,
    display: display
};