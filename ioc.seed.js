const suggestionData = {
    person:{
        actions:[
            {
                actionKey:'draw',
                prompt:'Draw a portrait of %^person^%',
                qualifiers:[
                    {
                        schema:'person',
                        qualifier: ' in the style or from the perspective of %^person^%.'
                    },
                    {
                        schema:'person',
                        qualifier: ' and %^person^%.'
                    },
                    {
                        schema:'place',
                        qualifier: ' in %^place^%.'
                    },
                    {
                        schema:'species',
                        qualifier: ' as a %^species^%.'
                    },
                    {
                        schema:'species',
                        qualifier: ' with a %^species^%.'
                    },
                    {
                        schema:'work',
                        qualifier: ' in the style of %^work^%.'
                    },
                    {
                        schema:'timePeriod',
                        qualifier: ' in the %^timePeriod^%.'
                    },
                    {
                        schema:'colour',
                        qualifier: ' using lots of %^colour^%.'
                    },
                    {
                        schema:'colour',
                        qualifier: ' using only %^colour^% and %^colour^%.'
                    },
                    {
                        schema:'colour',
                        qualifier: ' using only %^colour^%, %^colour^% and %^colour^%.'
                    },
                    {
                        schema:'colour',
                        qualifier: ' using only %^colour^%, %^colour^%, %^colour^% and %^colour^%.'
                    },
                    {
                        schema:'device',
                        qualifier: ' holding %&a&% %^device^%.'
                    },
                    {
                        schema:'device',
                        qualifier: ' using %&a&% %^device^%.'
                    },
                    {
                        schema:'device',
                        qualifier: ' as a %&a&% %^device^%.'
                    }
                ]
            },
            {
                actionKey:'write',
                prompt:'In the style of %person^'
            },
        ]
    },
    place:{

    },
    species:{

    },
    work:{

    },
    topicalConcept:{

    },
    timePeriod:{

    },
    colour:{

    },
    device:{

    },
    event:{

    },
    food:{

    }
};

module.exports = {
    suggestionData:suggestionData
};