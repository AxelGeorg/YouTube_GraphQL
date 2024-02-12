const { ApolloServer } = require('apollo-server');

const typeDefs = `
    type Channel {
        idChannel: Int,
        name: String,
        playlists: [Playlist]
    }

    type Playlist {
        idPlaylist: Int,
        idChannel: Int,
        description: String,
        videos: [Video]
    }

    type Video {
        idVideo: Int,
        title: String,
    }

    type Query {
        channels: [Channel]
    }
`;

const channels = [
    { idChannel: 1, name: 'Axel GG' },
    { idChannel: 2, name: 'FullCycle' }
];

const playlists = [
    { idPlaylist: 1, idChannel: 1, description: 'JavaScript' },
    { idPlaylist: 2, idChannel: 1, description: 'Node.js' },
    { idPlaylist: 3, idChannel: 2, description: 'Arquitetura de Software' }
];

const videos = [
    { idVideo: 1, idPlaylist: 1, title: 'introdução a javascript' },
    { idVideo: 2, idPlaylist: 1, title: 'Tipos de dados' },
    { idVideo: 3, idPlaylist: 3, title: 'DDD' }
];

const resolvers = {
    Query: {
        channels(obj, args) {
            return channels;
        }
    },
    Channel: {
        playlists(obj, args) {
            const idChannel = obj.idChannel;
            return playlists.filter((playlist) => playlist.idChannel === idChannel);
        }
    },
    Playlist: {
        videos(obj, args) {
            const idPlaylist = obj.idPlaylist;
            return videos.filter((video) => video.idPlaylist === idPlaylist);
        }
    }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen(4001);