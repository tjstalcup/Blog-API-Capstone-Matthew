exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/blog-app';
exports.PORT = process.env.port || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET || 'Liam';
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '5d';