import axios from "axios";
import {API_BASE_URL} from "../constants/Index";

function getResponseFromSearchQuery(searchQuery,callback){
    axios.get(API_BASE_URL+"/domain/"+searchQuery)
         .then((json)=>{
             callback(json.data);
         }).catch(err=>{
             console.log(err);
         }); 
}
function writeDomainIfDoesntExist(NoExistDomainRequest,callback){
    axios.post(API_BASE_URL+"/write/domain",NoExistDomainRequest)
         .then(res=>{
             callback(res.data);
         }).catch(err=>{
             console.log(err);
         });
}
function writeKeywordIfDoesntExist(NoExistKeywordRequest,callback){
    axios.post(API_BASE_URL+"/write/keyword",NoExistKeywordRequest)
    .then(res=>{
        callback(res.data);
    }).catch(err=>{
        console.log(err);
    });
}
export {getResponseFromSearchQuery,writeDomainIfDoesntExist,writeKeywordIfDoesntExist};