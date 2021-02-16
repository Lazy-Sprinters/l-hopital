const daysarr=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const formatdate=(curr)=>{
      let month=curr.getMonth();
      month++;
      month=month.toString();
      if (month.length==1)
      {
            month="0"+month;
      }
      let date=curr.getDate();
      date=date.toString();
      if (date.length==1)
      {
            date="0"+date;
      }
      return curr.getFullYear()+'-'+month+'-'+date;
}

const extracthr=(time)=>{
      if (time.length==7)
      {
            return (parseInt(time[0]));
      }
      return parseInt(time[0]+time[1]);
}

const extractmin=(time)=>{
      if (time.length==7)
      {
            return (parseInt(time[2]+time[3]));
      }
      return parseInt(time[3]+time[4]);
}

const extracttz=(time)=>{
      if (time.length==7)
      {
            return time[5]+time[6];
      }
      return time[6]+time[7];
}

const formatmin=(min)=>{
      if (min<10)
      {
            return "0"+min.toString();
      }
      return min.toString();
}     

const helper=(starttime,endtime)=>{
      let hs=extracthr(starttime);
      let ms=extractmin(starttime);
      let he=extracthr(endtime);
      let me=extractmin(endtime);
      let st=extracttz(starttime);
      let et=extracttz(endtime);
      let arr=[];
      if (st==et)
      {
            while ((hs!=he) || (ms!=me))
            {
                  let tbp=hs.toString()+':'+formatmin(ms)+' '+st+" - ";
                  if (ms==30)
                  {
                        ms=0;
                        hs+=1;
                  }
                  else
                  {
                        ms+=30;
                  }
                  tbp+=(hs.toString()+':'+formatmin(ms)+' '+st);
                  arr.push(tbp);
            }
      }
      else
      {
            while ((hs!=12) || (ms!=0))
            {
                  let tbp=hs.toString()+':'+formatmin(ms)+' '+st+" - ";
                  if (ms==30)
                  {
                        ms=0;
                        hs+=1;
                  }
                  else
                  {
                        ms+=30;
                  }
                  if (hs==12)
                  {
                        tbp+=(hs.toString()+':'+formatmin(ms)+' '+et);      
                  }
                  else
                  {
                        tbp+=(hs.toString()+':'+formatmin(ms)+' '+st);
                  }
                  arr.push(tbp);
            }
            he+=12;
            while ((hs!=he) || (ms!=me))
            {
                  let ths1=hs;
                  if (ths1!=12)
                  {
                        ths1-=12;
                  }
                  let tbp=ths1.toString()+':'+formatmin(ms)+' '+et+"-";
                  if (ms==30)
                  {
                        ms=0;
                        hs+=1;
                  }
                  else
                  {
                        ms+=30;
                  }
                  let ths=hs;
                  if (ths!=12)
                  {
                        ths-=12;
                  }
                  tbp+=((ths).toString()+':'+formatmin(ms)+' '+et);
                  arr.push(tbp);
            }
      }
      return arr;
}

// starttime,endtime
const listofnextsevendays=(blockeddays,date1,cap,starttime,endtime)=>{
      let curr=new Date(date1);
      curr.setDate(curr.getDate()+1);
      let ret=[];
      const intervals=helper(starttime,endtime);
      while (ret.length<7)
      {
            const currday=daysarr[curr.getDay()];
            const found=blockeddays.find(element=>element==currday);
            if (found==undefined)
            {
                  const date2=formatdate(curr);
                  let arr=[];
                  for(let i=0;i<intervals.length;i++)
                  {
                        const flag1={
                              det1:intervals[i],
                              det2:cap
                        }
                        arr.push(flag1);
                  }
                  const obj1={
                        date:date2,
                        slotinfo:arr
                  }
                  ret.push(obj1);
            }
            curr.setDate(curr.getDate()+1);
      }
      return ret;
}

// const finaldata=listofnextsevendays(["Tuesday","Thursday"],"2021-02-15",4,"11:00 AM","4:30 PM");
// finaldata.forEach(element => {
//       console.log(element);
// });

module.exports={listofnextsevendays,formatdate};