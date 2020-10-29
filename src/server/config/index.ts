import { join } from 'path';
import { extend } from 'lodash';

let config = {
    staticDir: join(__dirname, '../../../', 'dist', 'assets'),
    port: 3000
};

if (process.env.NODE_ENV === 'development') {
    let localConfig = {
        port: 3000
    };
    config = extend(config, localConfig);
}
if (process.env.NODE_ENV === 'production') {
    let prodConfig = {
        port: 8080
    };
    config = extend(config, prodConfig);
}

export default config;