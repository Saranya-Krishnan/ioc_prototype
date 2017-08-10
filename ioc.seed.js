const suggestionData = {
    person: {
        actions: [
            {
                actionKey: 'draw',
                prompt: 'Draw a portrait of %^person^%',
                schema: 'person',
                qualifiers: [
                    {
                        schema: 'person',
                        qualifier: ' in the style or from the perspective of %^person^%.'
                    },
                    {
                        schema: 'person',
                        qualifier: ' and %^person^%.'
                    },
                    {
                        schema: 'place',
                        qualifier: ' in %^place^%.'
                    },
                    {
                        schema: 'species',
                        qualifier: ' as %&a&% %^species^%.'
                    },
                    {
                        schema: 'species',
                        qualifier: ' with %&a&% %^species^%.'
                    },
                    {
                        schema: 'work',
                        qualifier: ' in the style of %^work^%.'
                    },
                    {
                        schema: 'timePeriod',
                        qualifier: ' in the %^timePeriod^%.'
                    },
                    {
                        schema: 'colour',
                        qualifier: ' using lots of %^colour^%.'
                    },
                    {
                        schema: 'colour',
                        qualifier: ' using only %^colour^% and %^colour^%.'
                    },
                    {
                        schema: 'colour',
                        qualifier: ' using only %^colour^%, %^colour^% and %^colour^%.'
                    },
                    {
                        schema: 'colour',
                        qualifier: ' using only %^colour^%, %^colour^%, %^colour^% and %^colour^%.'
                    },
                    {
                        schema: 'device',
                        qualifier: ' holding %&a&% %^device^%.'
                    },
                    {
                        schema: 'device',
                        qualifier: ' using %&a&% %^device^%.'
                    },
                    {
                        schema: 'device',
                        qualifier: ' as %&a&% %^device^%.'
                    }
                ]
            }
        ]
    },
    place: {
        actions: [
            {
                actionKey: 'draw',
                prompt: 'Draw a picture of %&a&% %^place^%',
                schema: 'place',
                qualifiers: [
                    {
                        schema: 'person',
                        qualifier: ' in the style or from the perspective of %^person^%.'
                    },
                ]
            }
        ]
    },
    species: {
        actions: [
            {
                actionKey: 'draw',
                prompt: 'Draw a picture of %&a&% %^species^%',
                schema: 'species',
                qualifiers: [
                    {
                        schema: 'person',
                        qualifier: ' in the style or from the perspective of %^person^%.'
                    },
                ]
            }
        ]
    },
    work: {
        actions: [
            {
                actionKey: 'draw',
                prompt: 'Draw your interpretation of %^work^%',
                schema: 'work',
                qualifiers: [
                    {
                        schema: 'person',
                        qualifier: ' in the style or from the perspective of %^person^%.'
                    },
                ]
            }
        ]
    },
    topicalConcept: {
        actions: [
            {
                actionKey: 'draw',
                prompt: 'What would %^topicalConcept^% look like if it were a person? Draw it!',
                schema: 'topicalConcept',
                qualifiers: [
                    {
                        schema: 'person',
                        qualifier: ' in the style or from the perspective of %^person^%.'
                    },
                ]
            }
        ]
    },
    timePeriod: {
        actions: [
            {
                actionKey: 'draw',
                prompt: 'Imagine your self in the  %&a&% %^timePeriod^%. Write what your breakfast would be like if you lived then.',
                schema: 'timePeriod',
                qualifiers: [
                    {
                        schema: 'person',
                        qualifier: ' in the style or from the perspective of %^person^%.'
                    },
                ]
            }
        ]
    },
    colour: {
        actions: [
            {
                actionKey: 'draw',
                prompt: 'Draw a picture using a lot of %^colour^%',
                schema: 'colour',
                qualifiers: [
                    {
                        schema: 'person',
                        qualifier: ' in the style or from the perspective of %^person^%.'
                    },
                ]
            }
        ]
    },
    device: {
        actions: [
            {
                actionKey: 'draw',
                prompt: 'Draw a picture of %&a&% %^device^%',
                schema: 'device',
                qualifiers: [
                    {
                        schema: 'person',
                        qualifier: ' in the style or from the perspective of %^person^%.'
                    },
                ]
            }
        ]
    },
    event: {
        actions: [
            {
                actionKey: 'draw',
                prompt: 'Draw a picture of %&a& %^event^%',
                schema: 'event',
                qualifiers: [
                    {
                        schema: 'person',
                        qualifier: ' in the style or from the perspective of %^person^%.'
                    },
                ]
            }
        ]
    },
    food: {
        actions: [
            {
                actionKey: 'draw',
                prompt: 'Draw a picture of %&a&% %^food^%',
                schema: 'food',
                qualifiers: [
                    {
                        schema: 'person',
                        qualifier: ' in the style or from the perspective of %^person^%.'
                    },
                ]
            }
        ]
    }
};


const ContentSeed = {
    users: [
        {
            id: "27ee8d58-7df2-11e7-bb31-be2e44b06b34",
            first_name: "Kelila",
            last_name: "Plumridege",
            email: "kplumridege0@comsenz.com",
            neo4jRelationships: [
                {
                    associationType: "UPLOADED",
                    pairType: "image",
                    pairId: "27eec534-7df2-11e7-bb31-be2e44b06b34"
                },
                {
                    associationType: "IS_PARTICIPATING_IN",
                    pairType: "quest",
                    pairId: "27eed11e-7df2-11e7-bb31-be2e44b06b34"
                },
                {
                    associationType: "CREATED",
                    pairType: "work",
                    pairId: "27eed5e2-7df2-11e7-bb31-be2e44b06b34"
                },
                {
                    associationType: "IS_ON_A_QUEST_FROM",
                    pairType: "suggestion",
                    pairId: ""
                },
                {
                    associationType: "OWNS_THIS_BOOK",
                    pairType: "notebook",
                    pairId: ""
                }
            ]
        },
        {
            id: "27ee9320-7df2-11e7-bb31-be2e44b06b34",
            first_name: "Trumann",
            last_name: "Vain",
            email: "tvain1@printfriendly.com"
        },
        {
            id: "27ee94c4-7df2-11e7-bb31-be2e44b06b34",
            first_name: "Bernhard",
            last_name: "Calderwood",
            email: "bcalderwood2@apple.com"
        },
        {
            id: "27ee9686-7df2-11e7-bb31-be2e44b06b34",
            first_name: "Tedda",
            last_name: "Spyby",
            email: "tspyby3@cnn.com"
        },
        {
            id: "27ee98ca-7df2-11e7-bb31-be2e44b06b34",
            first_name: "Moina",
            last_name: "Grube",
            email: "mgrube4@4shared.com"
        },
        {
            id: "27ee9a64-7df2-11e7-bb31-be2e44b06b34",
            first_name: "Christy",
            last_name: "Dance",
            email: "cdance5@weebly.com"
        },
        {
            id: "27eea108-7df2-11e7-bb31-be2e44b06b34",
            first_name: "Karlens",
            last_name: "Vlasenkov",
            email: "kvlasenkov6@usatoday.com"
        },
        {
            id: "27eea356-7df2-11e7-bb31-be2e44b06b34",
            first_name: "Addy",
            last_name: "Digwood",
            email: "adigwood7@reuters.com"
        },
        {
            id: "27eea540-7df2-11e7-bb31-be2e44b06b34",
            first_name: "Aila",
            last_name: "Drysdall",
            email: "adrysdall8@cmu.edu"
        },
        {
            id: "27eea702-7df2-11e7-bb31-be2e44b06b34",
            first_name: "Tobit",
            last_name: "Woodhead",
            email: "twoodhead9@berkeley.edu"
        },
        {
            id: "27eea8b0-7df2-11e7-bb31-be2e44b06b34",
            first_name: "Timmie",
            last_name: "Sprason",
            email: "tsprasona@earthlink.net"
        },
        {
            id: "27eeaa68-7df2-11e7-bb31-be2e44b06b34",
            first_name: "George",
            last_name: "Benson",
            email: "gbensonb@people.com.cn"
        },
        {
            id: "27eeac2a-7df2-11e7-bb31-be2e44b06b34",
            first_name: "Eve",
            last_name: "Dandie",
            email: "edandiec@chronoengine.com"
        },
        {
            id: "27eeb2b0-7df2-11e7-bb31-be2e44b06b34",
            first_name: "Max",
            last_name: "Eskriet",
            email: "meskrietd@salon.com"
        },
        {
            id: "27eeb2b0-7df2-11e7-bb31-be2e44b06b34",
            first_name: "Melanie",
            last_name: "Guinness",
            email: "mguinnesse@unesco.org"
        },
        {
            id: "27eeb4c2-7df2-11e7-bb31-be2e44b06b34",
            first_name: "West",
            last_name: "Pfeffel",
            email: "wpfeffelf@feedburner.com"
        },
        {
            id: "27eeb634-7df2-11e7-bb31-be2e44b06b34",
            first_name: "Vale",
            last_name: "Gniewosz",
            email: "vgniewoszg@blog.com"
        },
        {
            id: "27eeb76a-7df2-11e7-bb31-be2e44b06b34",
            first_name: "Bambie",
            last_name: "Philler",
            email: "bphillerh@google.com.br"
        },
        {
            id: "27eeb8b4-7df2-11e7-bb31-be2e44b06b34",
            first_name: "Josie",
            last_name: "Heinke",
            email: "jheinkei@sogou.com"
        },
        {
            id: "27eeba08-7df2-11e7-bb31-be2e44b06b34",
            first_name: "Joane",
            last_name: "Igonet",
            email: "jigonetj@issuu.com"
        },
        {
            id: "27eebb7a-7df2-11e7-bb31-be2e44b06b34",
            first_name: "Thomasine",
            last_name: "Prydden",
            email: "tpryddenk@clickbank.net"
        },
        {
            id: "27eec1ba-7df2-11e7-bb31-be2e44b06b34",
            first_name: "Pattie",
            last_name: "Harteley",
            email: "pharteleyl@scientificamerican.com"
        },
        {
            id: "27eec3c2-7df2-11e7-bb31-be2e44b06b34",
            first_name: "Yehudi",
            last_name: "Annion",
            email: "yannionm@cnbc.com"
        }
    ],
    images: [
        {
            id: "27eec534-7df2-11e7-bb31-be2e44b06b34",
            signature: '',
            width: '',
            height: '',
            format: '',
            url: '',
            secure_url:'',
            JFIFVersion: '',
            colors: '',
            predominant:'',
            phash: '',
            illustration_score: '',
            grayscale: '',
            original_filename:'',
            classification:'',
            neo4jRelationships: [
                {
                    associationType: "ASSOCIATED_WITH",
                    pairType: "tag",
                    pairId: ""
                }
            ]
        }
    ],
    meanings: [
        {
            id: "27eec96c-7df2-11e7-bb31-be2e44b06b34",
            label:'',
            description:'',
            sourceURI: '',
            schemaName: '',
            lastUpdate: '',
            neo4jRelationships: [
                {
                    associationType: "DERIVED_FROM",
                    pairType: "tag",
                    pairId: ""
                }
            ]
        }

    ],
    notebooks: [
        {
            id: "27eecf52-7df2-11e7-bb31-be2e44b06b34",
            when:'',
            how: '',
            what: '',
            name1: '',
            name2:'',
            name3:'',
            userId: '',
            neo4jRelationships: [
                {
                    associationType: "CURRENT_NOTEBOOK_OF",
                    pairType: "user",
                    pairId: ""
                }
            ]
        }
    ],
    quests:[
        {
            id: '27eed11e-7df2-11e7-bb31-be2e44b06b34',
            startDate: '',
            goalDate: '',
            completed: '',
            hidden: '',
            statement: '',
            neo4jRelationships: [
                {
                    associationType: "SUGGESTED_BY",
                    pairType: "suggestion",
                    pairId: ""
                }
            ]
        }
    ],
    suggestions: [
        {
            id: '27eed2f4-7df2-11e7-bb31-be2e44b06b34',
            prompt: '',
            neo4jRelationships: [
                {
                    associationType: "CAME_FROM_THIS_MEANING",
                    pairType: "meaning",
                    pairId: ""
                }
            ]
        }

    ],
    tags: [
        {
            id: '27eed47a-7df2-11e7-bb31-be2e44b06b34',
            word: '',
            ontology: ''
        }
    ],
    works: [
        {
            id: '27eed5e2-7df2-11e7-bb31-be2e44b06b34',
            neo4jRelationships: [
                {
                    associationType: "ASSOCIATED_WITH",
                    pairType: "tag",
                    pairId: ""
                }
            ]
        }
    ]
    };

    module.exports = {
        suggestionData: suggestionData
    };




// 27eed74a-7df2-11e7-bb31-be2e44b06b34
// 27eedcfe-7df2-11e7-bb31-be2e44b06b34
// 27eedefc-7df2-11e7-bb31-be2e44b06b34
// 27eee08c-7df2-11e7-bb31-be2e44b06b34
// 27eee1f4-7df2-11e7-bb31-be2e44b06b34
// 27eee3d4-7df2-11e7-bb31-be2e44b06b34
// 27eee55a-7df2-11e7-bb31-be2e44b06b34
// 27eee6b8-7df2-11e7-bb31-be2e44b06b34
// 27eeeece-7df2-11e7-bb31-be2e44b06b34
// 27eef108-7df2-11e7-bb31-be2e44b06b34
// 27eef266-7df2-11e7-bb31-be2e44b06b34
// 27eef3c4-7df2-11e7-bb31-be2e44b06b34
// 27eef518-7df2-11e7-bb31-be2e44b06b34
// 27eef694-7df2-11e7-bb31-be2e44b06b34
// 27eef810-7df2-11e7-bb31-be2e44b06b34
// 27eefe00-7df2-11e7-bb31-be2e44b06b34
// 27ef004e-7df2-11e7-bb31-be2e44b06b34
// 27ef0198-7df2-11e7-bb31-be2e44b06b34
// 27ef02ec-7df2-11e7-bb31-be2e44b06b34
// 27ef042c-7df2-11e7-bb31-be2e44b06b34
// 27ef0580-7df2-11e7-bb31-be2e44b06b34
// 27ef06d4-7df2-11e7-bb31-be2e44b06b34
// 27ef0c2e-7df2-11e7-bb31-be2e44b06b34
// 27ef0e18-7df2-11e7-bb31-be2e44b06b34
// 27ef0f76-7df2-11e7-bb31-be2e44b06b34
// 27ef10de-7df2-11e7-bb31-be2e44b06b34
// 27ef1278-7df2-11e7-bb31-be2e44b06b34
// 27ef13ea-7df2-11e7-bb31-be2e44b06b34
// 27ef1548-7df2-11e7-bb31-be2e44b06b34
// 27ef1bf6-7df2-11e7-bb31-be2e44b06b34
// 27ef1dae-7df2-11e7-bb31-be2e44b06b34
// 27ef1f2a-7df2-11e7-bb31-be2e44b06b34
// 27ef207e-7df2-11e7-bb31-be2e44b06b34
// 27ef21d2-7df2-11e7-bb31-be2e44b06b34
// 27ef2326-7df2-11e7-bb31-be2e44b06b34
// 27ef27f4-7df2-11e7-bb31-be2e44b06b34
// 27ef29e8-7df2-11e7-bb31-be2e44b06b34
// 27ef2b46-7df2-11e7-bb31-be2e44b06b34
// 27ef2ca4-7df2-11e7-bb31-be2e44b06b34
// 27ef2e02-7df2-11e7-bb31-be2e44b06b34
// 27ef2f56-7df2-11e7-bb31-be2e44b06b34
// 27ef30aa-7df2-11e7-bb31-be2e44b06b34
// 27ef3654-7df2-11e7-bb31-be2e44b06b34
// 27ef385c-7df2-11e7-bb31-be2e44b06b34
// 27ef39ba-7df2-11e7-bb31-be2e44b06b34
// 27ef3b22-7df2-11e7-bb31-be2e44b06b34
// 27ef3c80-7df2-11e7-bb31-be2e44b06b34
// 27ef3de8-7df2-11e7-bb31-be2e44b06b34
// 27ef4324-7df2-11e7-bb31-be2e44b06b34
// 27ef4522-7df2-11e7-bb31-be2e44b06b34
// 27ef469e-7df2-11e7-bb31-be2e44b06b34
// 27ef47de-7df2-11e7-bb31-be2e44b06b34
// 27ef4932-7df2-11e7-bb31-be2e44b06b34
// 27ef4a9a-7df2-11e7-bb31-be2e44b06b34
// 27ef4bee-7df2-11e7-bb31-be2e44b06b34
// 27ef5e4a-7df2-11e7-bb31-be2e44b06b34
// 27ef608e-7df2-11e7-bb31-be2e44b06b34
// 27ef6214-7df2-11e7-bb31-be2e44b06b34
// 27ef6386-7df2-11e7-bb31-be2e44b06b34
// 27ef64ee-7df2-11e7-bb31-be2e44b06b34
// 27ef6660-7df2-11e7-bb31-be2e44b06b34
// 27ef67c8-7df2-11e7-bb31-be2e44b06b34
// 27ef7092-7df2-11e7-bb31-be2e44b06b34
// 27ef7308-7df2-11e7-bb31-be2e44b06b34
// 27ef74ac-7df2-11e7-bb31-be2e44b06b34
// 27ef7600-7df2-11e7-bb31-be2e44b06b34
// 27ef7768-7df2-11e7-bb31-be2e44b06b34
// 27ef78e4-7df2-11e7-bb31-be2e44b06b34
// 27ef7a4c-7df2-11e7-bb31-be2e44b06b34
