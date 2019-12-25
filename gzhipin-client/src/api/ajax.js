/*
* 封装ajax请求
* */
import axios from 'axios'

export default function ajax(url='',data={},type='GET') {

    if (type==='GET'){
        let paramString = '';
        Object.keys(data).forEach(key=>{
            paramString+=key+'='+data[key]+'&';
        })
        if(paramString){
            paramString = paramString.substring(0,paramString.length-1);
        }
        url = url+'?'+ paramString
        return axios.get(url)
    } else{
        //axios.defaults.baseURL = '/api';
        return axios.post(url,data)
    }

}