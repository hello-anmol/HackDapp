import React, { Component } from 'react'
import Elections from '../../ui/elections/elections';


class Vote extends Component {
    render() {
        return (
            <main className="container">
                <div className="pure-g">
                    <div className="pure-u-1-1" style={{textAlign:'center'}}>
                        <h1>Vote</h1>
                        <p>Vote For Your Candidate.</p>
                        <Elections/>
                    </div>
                </div>
            </main>
        )
    }
}

export default Vote;
