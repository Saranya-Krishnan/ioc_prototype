const suggestionData = {
    person:{
        actions: [
            {
                actionKey:'draw',
                prompt:'Draw a portrait of %^person^%',
                schema:'person',
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
                        qualifier: ' as %&a&% %^species^%.'
                    },
                    {
                        schema:'species',
                        qualifier: ' with %&a&% %^species^%.'
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
                        qualifier: ' as %&a&% %^device^%.'
                    }
                ]
            }
        ]
    },
    place:{
        actions:[
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
    species:{
        actions:[
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
    work:{
        actions:[
            {
                actionKey: 'draw',
                prompt: 'Draw a picture of %&a&%%^work^%',
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
    topicalConcept:{
        actions:[
            {
                actionKey: 'draw',
                prompt: 'Draw a picture of %&a&%%^topicalConcept^%',
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
    timePeriod:{
        actions:[
            {
                actionKey: 'draw',
                prompt: 'Draw a picture of %&a&%%^timePeriod^%',
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
    colour:{
        actions:[
            {
                actionKey: 'draw',
                prompt: 'Draw a picture of %&a&%%^colour^%',
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
    device:{
        actions:[
            {
                actionKey: 'draw',
                prompt: 'Draw a picture of %&a&%%^device^%',
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
    event:{
        actions:[
            {
                actionKey: 'draw',
                prompt: 'Draw a picture of %&a&%%^event^%',
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
    food:{
        actions:[
            {
                actionKey: 'draw',
                prompt: 'Draw a picture of %&a&%%^food^%',
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

module.exports = {
    suggestionData:suggestionData
};