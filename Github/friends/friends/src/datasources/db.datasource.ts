import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'db',
  connector: 'postgresql',
  url: 'postgres://prj3_selfdatabase_user:kaYmdLIhTBh2pRsDWlxKGagYMZ8lc1Z3@dpg-ckdfv25jhfbs73e672tg-a.frankfurt-postgres.render.com:5432/prj3_selfdatabase?ssl=true',
  //host: 'localhost',
  //port: 5432,
  //user: 'postgres',
  //password: 'mypassword',
  //database: 'postgres'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class DbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'db';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.db', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
