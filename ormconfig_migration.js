const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
    synchronize: false,
    migrations: ['migrations/*.js'],
    type: 'sqlite',
    database: 'db.sqlite',
    entities: ['**/*.entity.js'],
    cli: {
        migrationsDir: 'migrations'
    }
});

AppDataSource.initialize();

module.exports = { AppDataSource };

