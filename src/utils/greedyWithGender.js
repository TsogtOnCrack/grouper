import { sortData } from "./sort";

// 
// 
// 
// 
// 
// 

// const sortData = (d) => {
//     //sorts based on skill
//     // data = [{name: String, skill: Num}, ...]
//     let data = [...d]
//     for (var i = 0; i < data.length; i++) {
//       for (var j = 0; j < data.length - i - 1; j++) {
//         if (Number(data[j].skill) < Number(data[j + 1].skill)) {
//           var temp = data[j];
//           data[j] = data[j + 1];
//           data[j + 1] = temp;
//         }
//       }
//     }
//     return data;
//   };

//
// 
// 
// 
// 
// 

const sum = (arr) => {
    let s = 0;
    arr.map((el) => {
      s = s + el;
    });
  
    return s;
  };
  
export const greedyWithGender = (groupCount, list) => {


    



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

    const addToAns = (arr) =>{
    arr.map((el) => {
        const smallestSumArray = findSmallest(ansNum);
    
        for (let j = 0; j < ansNum.length; j++) {
          if (ansNum[j] === smallestSumArray) {
            ansNum[j].push(el.skill);
            ans[j].push(el.name);
            break;
          }
        }
      });
    }
    const findAV = (arr) =>{
        let sum = 0
        arr.map((person)=>{
            sum = sum + Number(person.skill)
        })
        return sum / arr.length
    }
  
    let ansNum = []; // initialize answer array
    for (let i = 0; i < groupCount; i++) {
      ansNum.push([]);
    }
  
    let ans = []; // initialize answer array
    for (let i = 0; i < groupCount; i++) {
      ans.push([]);
    }



    //split via gender:
    let FList = []
    let MList = []
    list.map((person)=>{
        if(person.gender === 'F'){
            FList.push(person)
        }
        if(person.gender === 'M'){
            MList.push(person)
        }
    })

    let FAV = findAV(FList)
    let MAV = findAV(MList)

    if(FAV > MAV){
        addToAns(FList)
        addToAns(MList)
    }else{
        addToAns(MList)
        addToAns(FList)
    }
    
    
    return ans
    // console.log(ans)

    // ans.map((team, i)=>{
    //     console.log(i+1)
    //     console.log()
    //     team.map((person)=>{
    //         targetPerson = list.find((a)=> a.name === person)
    //         console.log(targetPerson.name, targetPerson.gender)
    //         // process.stdout.write(person.name, String( targetPerson.gender))
    //     })
        
    // })
  };

//   const DATA = [
//     { name: "Tsogt", skill: 42, team: -1, gender:"F" },
//     { name: "Tsogt2", skill: 69, team: -1, gender:"M" },
//     { name: "Tsogt3", skill: 42, team: -1, gender:"F" },
//     { name: "Tsogt4", skill: 42, team: -1, gender:"F" },
//     { name: "Tsogt5", skill: 69, team: -1, gender:"F" },
//     { name: "Tsogt6", skill: 69, team: -1, gender:"M" },
//     { name: "Tsogt12", skill: 42, team: -1, gender:"F" },
//     { name: "Tsogt13", skill: 69, team: -1, gender:"M" },
//     { name: "Tsogt14", skill: 42, team: -1, gender:"F" },
//     { name: "Tsogt15", skill: 42, team: -1, gender:"M" },
//     { name: "Tsogt16", skill: 69, team: -1, gender:"F" },
//     { name: "Tsogt17", skill: 69, team: -1, gender:"F" },
//   ];

// greedyAlgorithm(3, DATA)