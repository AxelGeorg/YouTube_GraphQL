const axios = require('axios');

const execute = async function (data){
    try {
        const response = await axios({
            url: 'http://localhost:4001/',
            method: 'post',
            data
        });

        const result = response.data;
        console.log(JSON.stringify(result, undefined, '  '));
    } catch (e) {
        console.log(e.response.data);
    }
};

(async function() {
    await execute({
        query: `
            mutation ($channelX: ChannelInput) {
                saveChannel (channel: $channelX) {
                    idChannel
                    name
                }
            }
        `,
        variables: {
            channelX: {
                idChannel: 3,
                name: "RocketSeat"
            }
        }
    });
    await execute({
        query: `
            mutation {
                saveChannel (channel: { idChannel: 4, name: "Fabrisio Veronez" }) {
                    idChannel
                    name
                }
            }
        `
    });
    await execute({
        query: `
            query {
                channels {
                    idChannel
                    name
                    playlists {
                        description
                        videos {
                            idVideo
                            title
                        }
                    }
                }
            }
        `
    });
})();
