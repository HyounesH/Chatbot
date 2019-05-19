import React, { Component } from "react";
import { addResponseMessage, Widget } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import { getResponseFromSearchQuery,writeDomainIfDoesntExist,writeKeywordIfDoesntExist } from "../service/ClassificationNaiveBayesService";

class NespressoChatbot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            domain: '',
            keyword: [],
            clientDomain: '',
            clientKeyword: '',
            searchQuery: '',
            domainExist: true,
            keywordExist: true,

        }

    }
    componentDidMount() {
        addResponseMessage("Welcome to nespresso chatbot!");
        addResponseMessage("What are you searching for !?");
    }
    getResponseFromSearchQuery(searchQuery) {
        getResponseFromSearchQuery(searchQuery, (data) => {
          let domainExist=true;
          let keywordExist=true;
          if(data.domain.includes("None")) domainExist=false;
          else if(!data.keyword.indexOf("None")>-1) keywordExist=false;
            this.setState({ domain: data.domain, keyword: data.keyword,domainExist:domainExist,keywordExist,keywordExist });
        })
    }
    writeDomainIfDoesntExist(NoExistDomainRequest){
        writeDomainIfDoesntExist(NoExistDomainRequest,(data)=>{
          this.setState({domain:data,domainExist:true})
        });
    }
    writeKeywordIfDoesntExist(NoExistKeywordRequest){
        writeKeywordIfDoesntExist(NoExistKeywordRequest,(data)=>{
            this.setState({keyword:data,keywordExist:true});
        })
    }

    handleNewUserMessage = (query) => {
        const {domainExist,keywordExist,searchQuery}=this.state;
        if(domainExist && keywordExist){
        this.getResponseFromSearchQuery(query);
        this.setState({searchQuery:query});
        }
        else if(!domainExist){
            this.writeDomainIfDoesntExist({searchQuery:searchQuery,clientDomain:query});
        }
        else if(!keywordExist){
            this.writeKeywordIfDoesntExist({
                searchQuery:searchQuery,
                clientKeyword:query
            })
        }
    }
    addMessage = (domain, keyword) => {
        if (domain.includes("None")) {
            addResponseMessage("Which domain do you searching for ?")
            
        }
        else if (keyword.includes("None")) {
            addResponseMessage("Wich " + domain + " do you exactly looking for ?");
            
        }
        else {
            addResponseMessage("domain : " + domain + ", keyword :" + keyword);
            
        }
    }

    render() {
        const { domain, keyword } = this.state
        if (domain !== '' && keyword !== '')
            this.addMessage(domain, keyword);
        return (
            <Widget handleNewUserMessage={this.handleNewUserMessage} />
        )
    }
}
export default NespressoChatbot;
