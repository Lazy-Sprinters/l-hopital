const comp1=(d1,d2)=>{
      const parts1 = d1.date.split('-');
      const parts2 = d2.date.split('-');
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

const arrange=(data)=>{
      //data is a array of appointments
      let data1=[];
      for(let i=0;i<data.length;i++)
      {
            if (new Date().getTime()>new Date(data[i].dateofappointment)){
                  data1.push(data[i]);
            }
            else if (new Date().getTime()==new Date(data[i].dateofappointment)){

            }
      }
}

console.log(new Date().getHours());

module.exports={arrange}