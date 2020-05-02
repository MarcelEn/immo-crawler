import { AbstractDB, IRunResult } from "./AbstractDB";
import { Database } from "sqlite3";

export default class AbstractDBImpl extends AbstractDB {
    constructor(private db: Database) {
        super();
    }

    run(query: string, ...args: any[]) {
        return new Promise<IRunResult>((resolve, reject) => {
            try {
                this.db.run(query, ...args, function (this: IRunResult, error: Error | null) {
                    if (!!error) {
                        reject(error);
                    } else {
                        resolve(this)
                    }
                });
            } catch (error) {
                reject(error);
            }
        })
    }

    get<T>(query: string, ...args: any[]) {
        return new Promise<T>((resolve, reject) => {
            try {
                this.db.get(query, ...args, function (error: Error | null, result: T) {
                    if (!!error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    each<T>(query: string, ...args: any[]) {
        return new Promise<T[]>((resolve, reject) => {
            try {
                let hasErrors = false;
                const results: T[] = [];
                this.db.each(query, ...args,
                    function (error: Error | null, result: T) {
                        if (!!error) {
                            hasErrors = true;
                        } else {
                            results.push(result);
                        }
                    },
                    function (error: Error | null) {
                        if (!!error || hasErrors) {
                            reject(error);
                        } else {
                            resolve(results);
                        }
                    });
            } catch (error) {
                reject(error);
            }
        });
    }
}