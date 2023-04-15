const allowedOrigins=require('./allowedOrigins')

const corsOptions={
    origin:"https://lovely-griffin-6978bb.netlify.app",
    optionsSuccessStatus:200,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['X-PINGOTHER', 'Content-Type',"Authorization","Origin", 'HEAD', 'OPTIONS',"Accept","Cache-Control",'Cookie','X-Requested-With'],
    credentials: true
}

module.exports = corsOptions;
