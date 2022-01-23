const fs = require('fs');
TOP = 10 //Number of top words to return can be change easly

class fileDB{
    constructor(){
        var context = [];
    }
    read(fileName){
        var text = fs.readFileSync(fileName,'utf-8')
        text = text.split(/\r?\n/);
        text.shift();
        this.context = text.map(element => {
            return element.split(',')
        });
        this.context.sort()
    }
    write(fileName){
        fs.writeFileSync(fileName,this.context,'utf-8')
    }
        
        // The sort method should occurs once only
        // Here should invoke some write method to file

    Suggest(startingWith){
        var top = [];
        var position = binSearch(this.context,startingWith,0,this.context.length)
        while(this.context[position] && this.context[position][0].startsWith(startingWith)){
            top.push(this.context[position++])
        }
        position=position-top.length
        while(this.context[position] && this.context[position][0].startsWith(startingWith)){
            top.push(this.context[position--])
        }
        top.sort((a, b) => (a[1] < b[1]) ? 1 : -1)
        top = top.slice(0,TOP);
        top.map((line,index)=>{top[index] =  line[0]})
        console.log(top);
    }

}

let binSearch = function (arr, x, start, end) {   //Time complexity O(logn)
    if (start > end) return false;
    let mid = Math.floor((start + end)/2);
    if (arr[mid][0].startsWith(x)) return mid;    
    if(arr[mid][0] > x)
        return binSearch(arr, x, start, mid-1);
    else
        return binSearch(arr, x, mid+1, end);
}

const myfile = new fileDB();
myfile.read('SearchTermsDB.csv') // read and sort the file

//myfile.write('SearchTermsDBSorted.text') // This function can be uncomment

/**
 * The purpose is to sort the file only once after reading the file 
 * After the first reading we should write the sorted context to file
 * Future manipulation will occur on that file
 */

myfile.Suggest('ad')
