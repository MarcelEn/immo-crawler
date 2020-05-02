export interface IRunResult {
    lastID: number;
    changes: number;
}

export abstract class AbstractDB {
    abstract run(query: string, ...args: any[]): Promise<IRunResult>;
    abstract get<T>(query: string, ...args: any[]): Promise<T>;
    abstract each<T>(query: string, ...args: any[]): Promise<T[]>;
}