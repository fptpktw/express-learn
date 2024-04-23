
const queryStringSelector = {
    listOfACItem: {
        bodyQuery: `select row_number()over (order by a.ACItemCode) as [key],(select top 1 [ACItemDesc] from [dbo].[HQACItem] ac where ac.ACItemCode =  a.ACItemCode) as [ACItemDesc] ,
        RTRIM(LTRIM(a.ACItemCode)) as ACItemCode ,ProductCode,ProductDetail
        ,case when a.IsActive   = 'Y' then 'ใช้งาน' else 'ยกเลิก' end as flg
        from Epro_Product a
        where a.IsActive   = 'Y'`,
      },
}

module.exports = {
    queryStringSelector,
  };