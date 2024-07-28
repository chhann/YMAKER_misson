import * as XLSX from 'xlsx';


export const userDownloadExcel = (userList) => {

  // 엑셀파일 다운로드
  const handleDownloadExcel = () => {
    if(userList.lenght === 0) {
      return
    }
    const excelDate = userList.map(({userId, countryId, cityId, createDate, updateDate, checked, ...rest}) => rest)

    const colWidths = [150, 100, 40, 150, 150]
    const cols = colWidths.map(width => ({ wpx: width }));

    const worksheet = XLSX.utils.json_to_sheet(excelDate);
    worksheet['!cols'] = cols;
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'my_sheet');

    XLSX.writeFile(workbook, "userInfo.xlsx");
  }


  return { handleDownloadExcel };
}