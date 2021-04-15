const app = require('./app');
const PORT = process.env.PORT || 80;
const connectDB = require('./db/mongoose');

connectDB();


app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));