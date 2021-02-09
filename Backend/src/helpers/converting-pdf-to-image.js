const convertapi=require('convertapi')('4MzxFJeQO8ZUb7vj');
convertapi.convert('jpg',{
      File:'../../../../Kathgodam train ticket.pdf'
},'pdf').then((res)=>{
      res.saveFiles('../../../Conversion-api-testing');
});
//to be continued