import React, { Component } from "react";
import Election from "../../../../build/contracts/Election.json";
const contract = require('truffle-contract')


import { connect } from "react-redux";
class Elections extends Component {
    constructor(props) {
        super(props);
        this.state = {
            candidates: [],
            selected: null,
            voted: false
        }
    }
    connectInstance = (codeBlock) => {
        let election = contract(Election);
        election.setProvider(this.props.web3.currentProvider);
        var candidateInstance;
        election.deployed().then((instance) => {
            candidateInstance = instance;
            console.log(instance);
            let account;
            this.props.web3.eth.getAccounts(console.log);
            setTimeout(() => {
                this.props.web3.eth.getAccounts((err, accounts) => {
                    if (err) return
                    account = accounts[0]
                    console.log(account,"=2");
                    //this.props.web3.eth.getAccounts(console.log)
                    
                    // accountFound()
                    codeBlock(candidateInstance,account);
                })
            }, 1000)
        })
    }
    onSelectCandidate = (event) => {
        this.setState({
            selected: event.target.value
        })
    }
    componentDidMount() {
        // console.log("Mounted",this.props.web3);

        if (this.props.web3 !== null) {
            
            // var account = this.props.web3.eth.accounts[0];
           

            this.connectInstance((candidateInstance,instance) => {
                candidateInstance.voters(instance).then(res => {
                    // console.log(account);
                   
                    console.log(res);
                    this.setState({
                        voted:res
                    })
    
                })


                candidateInstance.candidatesCount().then((res) => {
                    let totalCandidates;
                    totalCandidates = res.toNumber();
                    console.log(totalCandidates);
                    for (var i = 1; i <= totalCandidates; i++) {
                        candidateInstance.candidates(i).then((candidate) => {

                            this.setState({
                                ...this.state,
                                candidates: this.state.candidates.concat(candidate[2].toNumber())
                            })
                        })
                    }
                })
            })
        }
    }


    onVoteSubmit = (event) => {
        event.preventDefault();
        console.log(this.props.web3);
        console.log(this.state.selected);

        this.connectInstance((candidateInstance,instance) => {
            candidateInstance.addVote(this.state.selected, { from: instance }).then((result) => {
                console.log(result);

            })
        })
    }

    render() {
        console.log(this.state.candidates);
        let temp;

        temp = (<div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <form className="pure-form pure-form-stacked" onSubmit={this.onVoteSubmit}>
                <fieldset>
                    {this.state.candidates.map((val, i) => {
                        return ([<label htmlFor={i}>Candidate{i}</label>,
                        <input id={i} type="radio" name="selected" onChange={this.onSelectCandidate} value={i + 1} />])
                    })}

                    <span className="pure-form-message">This is a required field.</span>

                    <br />

                    <button type="submit" className="pure-button pure-button-primary">Vote</button>
                </fieldset>
            </form>
            <table>
                <thead>
                    <tr>
                        {this.state.candidates.map((val, i) => {
                            return (<th key={i} style={{ padding: '10px' }}>Candidate {i}</th>)
                        })}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {this.state.candidates.map((val, i) => {
                            return (<td key={i} style={{ padding: '10px' }}>{val}</td>)
                        })}
                    </tr>
                </tbody>
            </table>
        </div>);
        if (this.state.voted) {
            temp = <h1>You already Voted!</h1>;
        }
        return temp;
    }
}
const mapStateToProps = (state) => {
    return {
        web3: state.web3.web3Instance
    }
}

export default connect(mapStateToProps)(Elections);