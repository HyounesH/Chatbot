import React, { Component } from "react";
import { addResponseMessage, addUserMessage, Widget } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import { getResponseFromSearchQuery,writeDomainIfDoesntExist,writeKeywordIfDoesntExist } from "../service/ClassificationNaiveBayesService";
import NespressoWidget from "./NespressoWidget";
class NespressoChatbot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            domain: '',
            keyword: '',
            clientDomain: '',
            clientKeyword: '',
            searchQuery: ''

        }

    }
    getResponseFromSearchQuery=(searchQuery)=> {
        getResponseFromSearchQuery(searchQuery, (data) => {
            this.setState({ domain: data.domain, keyword: data.keyword });
        })
    }
    writeDomainIfDoesntExist=(NoExistDomainRequest)=>{
        this.writeDomainIfDoesntExist(NoExistDomainRequest,(data)=>{
          this.setState({domain:data})
        });
    }
    writeKeywordIfDoesntExist=(NoExistKeywordRequest)=>{
        this.writeKeywordIfDoesntExist(NoExistKeywordRequest,(data)=>{
            this.setState({keyword:data});
        })
    }

    render() {
        const {domain,keyword,searchQuery,clientDomain,clientKeyword} =this.state;
      return(
        <NespressoWidget  
        domain={domain}
        keyword={keyword}
        searchQuery={searchQuery}
        clientDomain={clientDomain}
        clientKeyword={clientKeyword}
        getResponseFromSearchQuery={this.getResponseFromSearchQuery}
        writeDomainIfDoesntExist={this.writeDomainIfDoesntExist}
        writeKeywordIfDoesntExist={this.writeKeywordIfDoesntExist}
/>
      )
    }
}
export default NespressoChatbot;
