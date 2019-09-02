import {
  AggregationCursor,
  CollectionAggregationOptions,
  CollectionInsertManyOptions,
  CommonOptions,
  Cursor,
  Db,
  DeleteWriteOpResultObject,
  FindOneOptions,
  InsertWriteOpResult,
  MongoClient,
  MongoClientCommonOption,
  MongoClientOptions,
  MongoCountPreferences,
  UpdateManyOptions,
  UpdateWriteOpResult,
} from 'mongodb';

class MongoManager {
  public static async connect(mongoUri: string, dbName: string, mongoClientOptions?: MongoClientOptions, dbOptions?: MongoClientCommonOption): Promise<MongoManager> {
    const mongo = new MongoManager(mongoUri, dbName, mongoClientOptions, dbOptions);
    mongo.client = await MongoClient.connect(mongoUri, mongoClientOptions);
    return mongo;
  }

  private client?: MongoClient;

  constructor(
    private mongoUri: string,
    private dbName: string,
    private mongoClientOptions?: MongoClientOptions,
    private dbOptions?: MongoClientCommonOption,
  ) {}

  public async insert(collection: string, data: any[], options?: CollectionInsertManyOptions): Promise<InsertWriteOpResult> {
    const db = await this.getDb();
    return await db
      .collection(collection)
      .insertMany(data, options);
  }

  public async find(collection: string, filter?: any, options?: FindOneOptions): Promise<Cursor> {
    const db = await this.getDb();
    return await db
      .collection(collection)
      .find(filter, options);
  }

  public async aggregate(collection: string, pipeline: any[], options?: CollectionAggregationOptions): Promise<AggregationCursor> {
    const db = await this.getDb();
    return await db
      .collection(collection)
      .aggregate(pipeline, options);
  }

  public async distinct(collection: string, key: string, filter?: any, options?: any): Promise<any> {
    const db = await this.getDb();
    return await db
      .collection(collection)
      .distinct(key, filter, options);
  }

  public async count(collection: string, filter?: any, options?: MongoCountPreferences): Promise<number> {
    const db = await this.getDb();
    return await db
      .collection(collection)
      .count(filter, options);
  }

  public async update(collection: string, update: any, filter?: any, options?: UpdateManyOptions): Promise<UpdateWriteOpResult> {
    const db = await this.getDb();
    return await db
      .collection(collection)
      .updateMany(filter, update, options);
  }

  public async delete(collection: string, filter?: any, options?: CommonOptions): Promise<DeleteWriteOpResultObject> {
    const db = await this.getDb();
    return await db
      .collection(collection)
      .deleteMany(filter, options);
  }

  private async getDb(): Promise<Db> {
    if (!this.client || !this.client.isConnected()) {
      this.client = await MongoClient.connect(this.mongoUri, this.mongoClientOptions);
    }
    return this.client.db(this.dbName, this.dbOptions);
  }
}

export { MongoManager };
