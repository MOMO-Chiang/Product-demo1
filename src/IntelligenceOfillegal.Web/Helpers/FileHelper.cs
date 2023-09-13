using IntelligenceOfillegal.Core.Entities;
using IntelligenceOfillegal.Web.Models;
using NPOI.POIFS.Crypt.Dsig;
using NPOI.SS.Formula.Functions;
using NPOI.SS.UserModel;
using NPOI.SS.Util;
using NPOI.XSSF.UserModel;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Web;

namespace IntelligenceOfillegal.Web.Helpers
{
    public class FileHelper
    {
        public MemoryStream ExportFile<T>(List<FileColumns> columns, List<T> data)
        {
            try
            {
                IWorkbook workbook = new XSSFWorkbook();
                ISheet sheet = workbook.CreateSheet("sheet1");
                IRow headerRow = sheet.CreateRow(0);
                List<string> columnsNames = columns.Select(x => x.Name).ToList();
                for (var i = 0; i < columns.Count; i++)
                {
                    headerRow.CreateCell(i).SetCellValue(columns[i].Title);
                }
                int rowIndex = 1;
                List<int[]> mergeRange = new List<int[]>();
                foreach (var row in data)
                {
                    int intRowIndex = rowIndex;
                    IRow dataRow = sheet.CreateRow(rowIndex);
                    int cellIndex = 0;
                    var properties = row.GetType().GetProperties();
                    for (var i = 0; i < columns.Count; i++)
                    {
                        var property = properties.First(x => x.Name == columns[i].Name);
                        var value = property.GetValue(row);
                        //if (property.PropertyType.Name == "String")
                        //{
                        var valueStr = value == null ? "" : value.ToString();
                        //處理文字欄位過大
                        if (valueStr.Length > 32750)
                            valueStr = valueStr.Substring(0, 32750) + @"/n......";
                        dataRow.CreateCell(i).SetCellValue(valueStr);
                        //}


                    }

                    rowIndex++;
                }

                var stream = new MemoryStream();
                // processing the stream.
                workbook.Write(stream);

                return stream;
            }
            catch (Exception ex)
            {
                throw new NotImplementedException("檔案產生錯誤!", ex);
            }
        }


        /// <summary>
        /// 建立檔案模型
        /// </summary>
        /// <returns></returns>
        public NewFileData GenNewFileData(string originFileName)
        {
            string fileId = Guid.NewGuid().ToString();
            string newFileName = "";
            int lastDotIndex = originFileName.LastIndexOf('.');
            if (lastDotIndex >= 0)
            {
                string extension = originFileName.Substring(lastDotIndex);
                newFileName = $"{fileId}{extension}";
            }

            return new NewFileData()
            {
                FileId = fileId,
                FileName = newFileName,
                FilePath = $@"{ConfigurationManager.AppSettings["FilePath"]}\{newFileName}",
            };


        }

        /// <summary>
        /// 儲存檔案
        /// </summary>
        public void SaveFile()
        {
            
        }

    }
    public class NewFileData
    {
        public string FileId { get; set; }
        public string FileName { get; set; }
        public string FilePath { get; set; }
    }
}