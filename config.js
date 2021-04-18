const config = {
    dbUrl: process.env.DB_URL || 'mongodb://db_user_platzivideos:MuKVgdeU7tMLf54@cluster0-shard-00-00.iqlpf.mongodb.net:27017,cluster0-shard-00-01.iqlpf.mongodb.net:27017,cluster0-shard-00-02.iqlpf.mongodb.net:27017/telegram?ssl=true&replicaSet=atlas-7fx82y-shard-0&authSource=admin&retryWrites=true&w=majority',
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'http://localhost',
    publicRoute: process.env.PUBLIC_ROUTE || '/app',
    filesRoute: process.env.FILES_ROUTE || '/files',
}

module.exports = config;