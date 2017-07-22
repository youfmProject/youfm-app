/* eslint-disable no-console */
import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../webpack.config.js';
import bodyParser from 'body-parser';
import _ from 'lodash';
import * as swaggerTools from 'swagger-tools';

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const app = express();
const options = {};
app.use(bodyParser.json());
app.use('/static', express.static(path.join(__dirname, '../static')));

if (isDeveloping) {
    console.log('Server started in development mode.');
    const compiler = webpack(config);
    const devMiddleware = webpackDevMiddleware(compiler, {
        hot: true,
        publicPath: config.output.publicPath,
        contentBase: 'app',
        // publicPath: 'static',
        stats: {
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false
        }
    });

    const hotMiddleware = webpackHotMiddleware(compiler, {
        log: console.log,
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000
    });

    app.use(devMiddleware);
    app.use(hotMiddleware);

    var getRouterMiddleware = () => {
        return (req, res, next) => {
            if ((req.originalUrl).match('/api/')) {
                return next();
            } else {
                res.write(devMiddleware.fileSystem.readFileSync(path.resolve(__dirname, '../dist/index.html')));
                res.end();
            }
        }
    }
    app.use(getRouterMiddleware());
} else {
    console.log('Server started in production mode.');
    app.use(express.static(path.join(__dirname, '../dist')));
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../dist/index.html'));
    });
}

var getAPIDoc = function(apiVersion) {
    apiVersion = apiVersion || 'v1';
    return require(path.join(__dirname, '../api/' + apiVersion + '/youfm.json'));
};

var mountAPI = function(app, swaggerDoc, options) {

    swaggerTools.initializeMiddleware(swaggerDoc, function(middleware) {

        app.use(middleware.swaggerMetadata());

        app.use(middleware.swaggerValidator({
            validateResponse: true
        }));

        app.use(middleware.swaggerRouter(options));

        app.use(errorHandler);
    });
};

var errorHandler = function(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }

    if (err.failedValidation) {
        if (res.statusCode === 400) {
            res.status(400).json({
                message: 'Validation Error',
                details: err.results,
                text: err.toString()
            });
        } else {
            res.status(500).json({
                message: 'Validation Error',
                details: err.results,
                text: err.toString()
            });
        }
    } else {
        next(err);
    }
};

_.defaults(options, {
    controllers: __dirname + '/controllers',
    useStubs: isDeveloping ? true : false,
    apis: ['v1']
});

options.apis.forEach(function(apiVersion) {
    var swaggerDoc = getAPIDoc(apiVersion);
    mountAPI(app, swaggerDoc, options);
});

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    console.info('Server running on http://localhost:%s/.', port);
});