/*
 * @Author: Hunter
 * @Date: 2022-03-06 22:33:02
 * @LastEditTime: 2022-03-14 16:40:27
 * @LastEditors: Hunter
 * @Description: 
 * @FilePath: \import_export_excel\src\utils\excel.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import { WorkBook, ParsingOptions, read, write } from 'xlsx'
import type { UploadFile } from "element-plus/es/components/upload/src/upload.type";
export interface ExcelInterface {
    importExcel: (file: UploadFile, opt: ParsingOptions) => Promise<void>
    exportExcel: (workbook: WorkBook, opt: ParsingOptions) => Promise<void>
    downloadFile: (blob: Blob, name: string) => void
    stringToArrayBuffer: (str: string) => Uint8Array
}

export class Excel implements ExcelInterface {
    importExcel(file: UploadFile, opt: ParsingOptions) {
        return new Promise((resolve: (val: any) => void) => {
            const fileReader = new FileReader();
            fileReader.onload = function (e: any) {
                const data = e.target.result;
                const workbook = read(data, opt);
                resolve(workbook)
            };
            fileReader.readAsBinaryString(file.raw);
        })
    }
    exportExcel(workbook: WorkBook, opt: ParsingOptions) {
        return new Promise((resolve: (val: any) => void) => {
            const file = write(workbook, opt);
            const blob = new Blob([this.stringToArrayBuffer(file)], { type: "application/octet-stream" });
            resolve(blob)
        })

    }

    stringToArrayBuffer(str: string) {
        const arrayBuffer = new ArrayBuffer(str.length);
        let uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0, strLen = str.length; i < strLen; i++) {
            uint8Array[i] = str.charCodeAt(i) & 0xFF;
        }
        return uint8Array;
    }
    downloadFile(blob: Blob, name: string = 'file.txt') {
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = name
        const _evt = new MouseEvent('click')
        link.dispatchEvent(_evt)
    }
}