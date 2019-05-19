import React,{Component} from "react";
import { addResponseMessage, addUserMessage, Widget } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
class NespressoWidget extends Component{
constructor(props){
    super(props);
    this.state={
        domain:'',
        keyword:'',
        searchQuery:'',
        clientDomain:'',
        clientKeyword:'',
        domainExist:true,
        keywordExist:true,
    }
}
componentDidMount() {
    addResponseMessage("Welcome to nespresso chatbot!");
    addResponseMessage("What are you searching for !?");
}
componentDidUpdate(){
    const {domain,keyword}=this.state;
    if(domain !=='' && keyword!=='')
    this.addMessage(domain,keyword);
}
componentWillReceiveProps(nextProps){
    this.setState({
        domain:nextProps.domain,
        keyword:nextProps.keyword,
        searchQuery:nextProps.searchQuery,
        clientDomain:nextProps.clientDomain,
        clientKeyword:nextProps.clientKeyword
    });
}
handleNewUserMessage = (query) => {
    const {domainExist,keywordExist,searchQuery}=this.state;
    if(domainExist && keywordExist){
    this.props.getResponseFromSearchQuery(query);
    this.setState({searchQuery:query});
    }
    if(!domainExist){
        this.setState({clientDomain:query});
        this.props.writeDomainIfDoesntExist({searchQuery:searchQuery,clientDomain:query});
    }
    if(!keywordExist){
        this.setState({clientKeyword:query});
        this.props.writeKeywordIfDoesntExist({
            searchQuery:searchQuery,
            clientKeyword:query
        })
    }
}
addMessage = (domain, keyword) => {
  let domainExist=true;
  let keywordExist=true;
    if (domain.includes("None")) {
        addResponseMessage("Which domain do you searching for ?")
        domainExist=false;
        keywordExist=true;
    }
    else if (keyword.includes("None")) {
        addResponseMessage("Wich " + domain + " do you exactly looking for ?");
        domainExist=true;
        keywordExist=false;
    }
    else {
        addResponseMessage("domain : " + domain + ", keyword :" + keyword);
        domainExist=true;
        keywordExist=false;
    }
    this.setState({domainExist:domainExist,keywordExist:keywordExist})
}
render(){
    return (
        <Widget handleNewUserMessage={this.handleNewUserMessage} />
    )
}
}
export default NespressoWidget;