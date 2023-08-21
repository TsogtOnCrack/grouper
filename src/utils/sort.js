export const sortData = (d) => {
    //sorts based on skill
    // data = [{name: String, skill: Num}, ...]
    
    let data = [...d]
    

    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data.length - i - 1; j++) {
        if (Number(data[j].skill) < Number(data[j + 1].skill)) {
          var temp = data[j];
          data[j] = data[j + 1];
          data[j + 1] = temp;
        }
      }
    }
  
    return data;
  };