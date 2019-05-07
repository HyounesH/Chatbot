import React, { Component } from "react";
import { addResponseMessage, addUserMessage, Widget } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import { getResponseFromSearchQuery,writeDomainIfDoesntExist,writeKeywordIfDoesntExist } from "../service/ClassificationNaiveBayesService";

class NespressoChatbot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            domain: '',
            keyword: '',
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
            console.log("our data");
            console.log(data);
            this.setState({ domain: data.domain, keyword: data.keyword });
        })
    }
    writeDomainIfDoesntExist(NoExistDomainRequest){
        this.writeDomainIfDoesntExist(NoExistDomainRequest,(data)=>{
          this.setState({domain:data})
        });
    }
    writeKeywordIfDoesntExist(NoExistKeywordRequest){
        this.writeKeywordIfDoesntExist(NoExistKeywordRequest,(data)=>{
            this.setState({keyword:data});
        })
    }

    handleNewUserMessage = (query) => {
        const {domainExist,keywordExist,searchQuery}=this.state;
        if(domainExist && keywordExist){
        this.getResponseFromSearchQuery(query);
        this.setState({searchQuery:query});
        }
        if(!domainExist){
            this.setState({clientDomain:query});
            this.writeDomainIfDoesntExist({searchQuery:searchQuery,clientDomain:query});
        }
        if(!keywordExist){
            this.setState({clientKeyword:query});
            this.writeKeywordIfDoesntExist({
                searchQuery:searchQuery,
                clientKeyword:query
            })
        }
    }
    addMessage = (domain, keyword) => {
        if (domain.includes("None")) {
            addResponseMessage("Which domain do you searching for ?")
            this.setState({ domainExist: false, keywordExist: true })
        }
        else if (keyword.includes("None")) {
            addResponseMessage("Wich " + domain + " do you exactly looking for ?");
            this.setState({ domainExist: true, keywordExist: false });
        }
        else {
            addResponseMessage("domain : " + domain + ", keyword :" + keyword);
            this.setState({domainExist:true,keywordExist:true});
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