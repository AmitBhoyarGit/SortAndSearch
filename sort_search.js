function getData(data,sortByKey,searchValue,sortVariant){
    var self = this;
    self.books=[]
    var sortVariant = sortVariant?sortVariant.toLowerCase() :'asc';

    self.getFlatFiltredArray = function(allBooks,key,value,sortVar){
        var flatArray = [];
        var result =[]
        allBooks.agency.forEach(function(item){
           Array.prototype.push.apply(flatArray, item.books);
        })
        Array.prototype.push.apply(flatArray, allBooks.single);
        if(value){
        flatArray.forEach(function(item,index){
            if(item[key]==value){
                result.push(item);
            }
         });
         return result;
        }
        else{
        return flatArray;
        }
    }

    self.getByVariant = function(operator,b1,b2,key){
        switch (operator) {
            case 'ascending':
            case 'asc':
            case 'less':
                return b1[key] > b2[key];
                break;
            case 'descending':
            case 'des':
            case 'more':
                return b1[key] < b2[key];
                break;
            default:
                return b1[key] > b2[key];
                break;
        }
    }

    self.books = self.getFlatFiltredArray(data,sortByKey,searchValue);
    self.books.sort(function(b1, b2){
        return self.getByVariant(sortVariant,b1,b2,sortByKey);
    });

    return self.books;
}
