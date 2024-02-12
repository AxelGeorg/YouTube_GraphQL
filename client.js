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
            query {
                channels {
                    idChannel
                    name
                    playlists {
                        description
                        videos {
                            title
                        }
                    }
                }
            }
        `
    });
})();
