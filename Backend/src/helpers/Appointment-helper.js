const comp1=(d1,d2)=>{
      const parts1 = d1.dateofappointment.split('-');
      const parts2 = d2.dateofappointment.split('-');
      let latest = -1;
      if (parseInt(parts1[0]) > parseInt(parts2[0])) 
      {
            latest = 1;
      } 
      else if (parseInt(parts1[0]) == parseInt(parts2[0])) 
      {
            if (parseInt(parts1[1]) > parseInt(parts2[1])) 
            {
                  latest = 1;
            } 
            else if (parseInt(parts1[1]) == parseInt(parts2[1])) 
            {
                  if (parseInt(parts1[2]) >= parseInt(parts2[2])) 
                  {
                        latest = 1;
                  } 
            }
      }
      return latest;
}

const comparedatecurr=(d1)=>{
      const date=new Date(d1);
      const date2=new Date();
      if (date2.getFullYear()>date.getFullYear()){
            return 1;
      }else if (date2.getFullYear()==date.getFullYear()){
            if (date2.getMonth()>date.getMonth()){
                  return 1;
            }
            else if (date2.getMonth()==date.getMonth()){
                  if (date2.getDate()>date.getDate()){
                        return 1;
                  }
            }
      }
      return 0;
}

const comparedatecurr1=(d1)=>{
      const date=new Date(d1);
      const date2=new Date();
      if (date2.getFullYear()>date.getFullYear()){
            return 1;
      }else if (date2.getFullYear()==date.getFullYear()){
            if (date2.getMonth()>date.getMonth()){
                  return 1;
            }
            else if (date2.getMonth()==date.getMonth()){
                  if (date2.getDate()>=date.getDate()){
                        return 1;
                  }
            }
      }
      return 0;
}

const arrange=(data)=>{
      let data1=[];
      for(let i=0;i<data.length;i++){
            if (comparedatecurr(data[i].dateofappointment)==1){
                  data1.push(data[i]);
            }
      }
      data1.sort(comp1);
      return data1;
}

const arrange1=(data)=>{
      let data1=[];
      for(let i=0;i<data.length;i++){
            if (new Date().getDate()==new Date(data[i].dateofappointment).getDate() && new Date().getMonth()==new Date(data[i].dateofappointment).getMonth() && new Date().getFullYear()==new Date(data[i].dateofappointment).getFullYear()){
                  data1.push(data[i]);
            }
      }
      data1.sort(comp1);
      return data1;
}

const arrange2=(data)=>{
      let data1=[];
      for(let i=0;i<data.length;i++){

      }
}

module.exports={arrange,comparedatecurr,arrange1,comparedatecurr1};