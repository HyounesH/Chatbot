import axios from "axios";
import {API_BASE_URL} from "../constants/Index";

function getResponseFromSearchQuery(searchQuery,callback){
    axios.get(API_BASE_URL+"/domain/"+searchQuery)
         .then(json=>{
             callback(json.data);
         }).catch(err=>{
             console.log(err);
         }); 
}
export {getResponseFromSearchQuery};