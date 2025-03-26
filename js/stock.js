function leerStock(id, cantidad_por_defecto) {
    var stock = localStorage.getItem('stock');
    if (!stock) {
        stock = {id: cantidad_por_defecto};
        localStorage.setItem('stock', JSON.stringify(stock));
    } else {
        stock = JSON.parse(stock);
    }
    if(!stock[id]) {
        stock[id] = cantidad_por_defecto;
        localStorage.setItem('stock', JSON.stringify(stock));
    }
    return stock[id];
}


function actualizarStock(id, cantidad) {
    var stock = JSON.parse(localStorage.getItem('stock'));
    if (!stock) {
        stock = {id: cantidad};
    } else {
        stock[id] = cantidad;
    }
    localStorage.setItem('stock', JSON.stringify(stock));
}


export { leerStock, actualizarStock };