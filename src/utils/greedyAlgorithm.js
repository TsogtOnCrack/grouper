import { sortData } from "./sort";

const sum = (arr) => {
    let s = 0;
    arr.map((el) => {
      s = s + el;
    });
  
    return s;
  };
  
 export const greedyAlgorithm = (groupCount, list) => {
    list = [...sortData(list)]
  
    const findSmallest = (arr) => {
      let min = [999];
  
      arr.map((el) => {
        if (sum(el) < sum(min)) {
          min = el;
        }
      });
  
      return min;
    };
  
    let ansNum = []; // initialize answer array
    for (let i = 0; i < groupCount; i++) {
      ansNum.push([]);
    }
  
    let ans = []; // initialize answer array
    for (let i = 0; i < groupCount; i++) {
      ans.push([]);
    }
  
    list.map((el) => {
      const smallestSumArray = findSmallest(ansNum);
  
      for (let j = 0; j < ansNum.length; j++) {
        if (ansNum[j] === smallestSumArray) {
          ansNum[j].push(el.skill);
          ans[j].push(el.name);
          break;
        }
      }
    });
  
    return ans;
  };