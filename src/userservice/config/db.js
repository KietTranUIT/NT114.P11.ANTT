const Sequelize = require('sequelize');
const chalk = require('chalk');
const keys = require('./key');

const { database } = keys;

module.exports.sequelize = new Sequelize(
    database.dbname,
    database.user,
    database.password,
    {
        host: database.host,
        dialect: 'postgres',
        dialectOptions: {
            useUTC: true,
            ssl: {
                require: false,
            }
        }
    }
)

module.exports.connect = async (sequelize) => {
    await sequelize.authenticate()
        .then(() => {
            console.log(
                `[${chalk.green('✓')}] ${chalk.blue('Database connection has been established successfully.')}`
            )
        })
        .catch((error) => {
            console.log(
                `[${chalk.red('x')}] ${chalk.blue(`Unable to connect to database, err = ${error.message}`)}`
            )
        })
}