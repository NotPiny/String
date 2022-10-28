module.exports = {
    name: 'punish',
    description: 'Punish a user',
    testOnly: false,
    autoUpdate: false,

    options: [
        {
            name: 'mute',
            description: 'Mute a user',
            type: 2,
            options: [
                {
                    name: 'add',
                    description: 'Add a mute to a user',
                    type: 1,
                    options: [
                        {
                            name: 'user',
                            description: 'The user to mute',
                            type: 6,
                            required: true
                        }
                    ]
                },
                {
                    name: 'remove',
                    description: 'Remove a mute from a user',
                    type: 1,
                    options: [
                        {
                            name: 'user',
                            description: 'The user to unmute',
                            type: 6,
                            required: true
                        }
                    ]
                }
            ]
        },
        {
            name: 'timeout',
            description: 'Timeout a user',
            type: 1,
            options: [
                {
                    name: 'user',
                    description: 'The user to timeout',
                    type: 6,
                    required: true
                },
                {
                    name: 'duration',
                    description: 'The duration of the timeout (Minutes)',
                    type: 4,
                    required: true
                },
                {
                    name: 'reason',
                    description: 'The reason for the timeout',
                    type: 3,
                    required: false
                }
            ]
        },
        {
            name: 'ban',
            description: 'Ban a user',
            type: 1,
            options: [
                {
                    name: 'user',
                    description: 'The user to ban',
                    type: 6,
                    required: true
                },
                {
                    name: 'duration',
                    description: 'The duration of the ban (Days)',
                    type: 4,
                    required: true
                },
                {
                    name: 'reason',
                    description: 'The reason for the ban',
                    type: 3,
                    required: false
                }
            ]
        },
        {
            name: 'kick',
            description: 'Kick a user',
            type: 1,
            options: [
                {
                    name: 'user',
                    description: 'The user to kick',
                    type: 6,
                    required: true
                },
                {
                    name: 'reason',
                    description: 'The reason for the kick',
                    type: 3,
                    required: false
                }
            ]
        },
    ]
}