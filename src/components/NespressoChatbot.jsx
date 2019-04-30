import React, { Component } from "react";
import {addResponseMessage, addUserMessage, Widget} from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import {getResponseFromSearchQuery} from "../service/ClassificationNaiveBayesService";

class NespressoChatbot extends Component {
    constructor(props) {
        super(props);
        this.state={
            domain:'',
            keyword:''
        }
        
    }
    componentDidMount(){
        addResponseMessage("Welcome to nespresso chatbot!");
        addResponseMessage("What are you searching for !?");
    }
    getResponseFromSearchQuery(searchQuery){
        getResponseFromSearchQuery(searchQuery,(data)=>{
            console.log("our data");
            console.log(data);
            this.setState({domain:data.domain,keyword:data.keyword});
        })
    }

    handleNewUserMessage = (searchQuery) => {
    this.getResponseFromSearchQuery(searchQuery);
    }
    addMessage=(domain,keyword)=>{
    if(domain.includes("None")) addResponseMessage("Which domain do you searching for ?")
    else if(keyword.includes("None")) addResponseMessage("Wich "+domain+" do you exactly looking for ?");
    else addResponseMessage("domain : "+domain+", keyword :"+keyword);
    }
    
    render() {
        const {domain,keyword}=this.state
        if(domain!=='' && keyword!=='')
        this.addMessage(domain,keyword);
        return (
            <Widget handleNewUserMessage={this.handleNewUserMessage} />
        )
    }
}
export default NespressoChatbot;