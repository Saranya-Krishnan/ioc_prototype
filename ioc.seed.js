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
    topicalConcept:{
        actions:[
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
    timePeriod:{
        actions:[
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
    colour:{
        actions:[
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
    device:{
        actions:[
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
    event:{
        actions:[
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
    food:{
        actions:[
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

module.exports = {
    suggestionData:suggestionData
};