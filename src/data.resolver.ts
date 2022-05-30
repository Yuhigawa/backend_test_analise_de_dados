import { Resolver, Query, ObjectType, Arg } from "type-graphql";
import { Compras, Vendas, Total } from "./data.module";

import { try_catch_file_sync } from './readfileSync';

let compras_data: any, vendas_data: any = "";
let total_data: Total[] = [];

function sum_data(json_data: any, data_key: any): Number {
    let sum: Number = 0;

    for( let _t of json_data )
        sum += _t[data_key]

    return sum;
}

(async() => {
    let object_data: any = {};
    const controller = new AbortController();

    await try_catch_file_sync('./src/data/compras.json').then((data) => {
        compras_data = data;

        object_data['compras'] = sum_data(data, 'total');;
        object_data['ICMS'] = sum_data(data, 'ICMS');
        object_data['ST'] = sum_data(data, 'ST');
    }).catch( err => {
        console.log("Error: ", err);
        controller.abort();
    });

    await try_catch_file_sync('./src/data/vendas.json').then( (data) => {
        vendas_data = data;

        object_data['vendas'] = sum_data(data, 'total');
        total_data.push(object_data);
    }).catch( err => {
        console.log("Error: ", err);
        controller.abort();
    });
})();


@Resolver()
export class DataResolver {

    // async compras( @Arg('cod', { nullable: true }) cod: string ) {
    @Query( returns => [Compras] )
    async compras() {
        return compras_data;
    }

    @Query( returns => [Vendas] )
    async vendas() {
        return vendas_data;
    }

    @Query( returns => [Total] )
    async total() {
        return total_data;
    }
}