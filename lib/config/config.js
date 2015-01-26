module.exports = {
	port: process.env.PORT || 3000,
    db: process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://admin:admin@ds029801.mongolab.com:29801/lif'
}