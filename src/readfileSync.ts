import { throws } from 'assert';
import { PathLike } from 'fs';
import { readFile } from 'fs/promises';

export async function try_catch_file_sync(path: PathLike) {
    try {
        const controller = new AbortController();
        const { signal } = controller;
        const promise = readFile(path, { signal: signal,encoding: 'utf-8', flag: 'r' });
      
        // controller.abort();

        let data = await promise;
        return JSON.parse(data);
    } catch (err) {
        // When a request is aborted - err is an AbortError
        console.error("Error: ", err);
        throw(err);
    }
};