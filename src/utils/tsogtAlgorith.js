import { sortData } from "./sort";

export const tsogtAlgorithm = (groupCount, list) => {
    list = [...sortData(list)];
  
    let ans = []; // initialize answer array
    for (let i = 0; i < groupCount; i++) {
      ans.push([]);
    }
  
    //grouping part
    let ind = -1;
    for (let i = 0; i < list.length; i++) {
      if (i % groupCount === 0) {
        ind++;
      }
  
      let j = i - ind * groupCount;
  
      if (ind % 2 === 0) {
        j = groupCount - j - 1;
      }
  
      ans[j].push(list[i].name);
    }
  
    return ans;
  };