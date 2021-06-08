import { execSync } from 'child_process';
import * as dotenv from 'dotenv';
import * as path from 'path';

export const init = () => {
    dotenv.config({
        path: path.join(__dirname, ".env")
    });
    process.env.DATABASE = process.env.DATABASE + "_test";
    // execSync('echo "hello world"')
    execSync(`mysql --host=${process.env.HOST} -u${process.env.USERNAME} --password=${process.env.PASSWORD} <  ${__dirname}/startup.sql`)
}


