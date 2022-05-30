import { try_catch_file_sync } from './src/readfileSync';

(async() => {
    let compras_data = await try_catch_file_sync('./src/data/compras.json');
    let vendas_data = await try_catch_file_sync('./src/data/vendas.json');

    console.log( 'foi' );
    console.log( vendas_data );
})();