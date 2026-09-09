import knex, { Knex } from 'knex';

export function createDb(connectionString = process.env.DATABASE_URL): Knex {
  return knex({
    client: 'pg',
    connection: connectionString,
    pool: { min: 2, max: 10 }
  });
}

export async function withTransaction<T>(db: Knex, run: (trx: Knex.Transaction) => Promise<T>): Promise<T> {
  return db.transaction(async (trx) => run(trx));
}
