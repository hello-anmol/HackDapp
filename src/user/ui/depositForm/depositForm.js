import React, { Component } from 'react';
import { connect } from 'react-redux';
import { storeAddress } from './depositFormActions';
class depositForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            num: ""
        }
    }
    onInputChange=(event)=> {
        this.setState({ num: event.target.value })
    }

    handleSubmit=(event)=> {
        console.log(this.state.num);
        
        event.preventDefault()

        if (this.state.num.length < 2) {
            return alert('Please fill in your Deposit Amount.')
        }

        this.props.onFormSubmit(this.state.num)
    }

    render() {
        return (
            <div>
                <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit}>
                    <fieldset>
                        <label htmlFor="deposit">Deposit</label>
                        <input id="deposit" type="number" value={this.state.num} onChange={this.onInputChange} placeholder="Deposit" />
                        <span className="pure-form-message">This is a required field.</span>

                        <br />

                        <button type="submit" className="pure-button pure-button-primary">Update</button>
                    </fieldset>
                </form>
                <h2>Current Balance</h2>
                <table>
                    <thead>
                    <tr>
                        <th style={{ padding: '10px' }}>Eth</th>
                        <th style={{ padding: '10px' }}>Currency</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td style={{ padding: '10px' }}>10</td>
                        <td style={{ padding: '10px' }}>10</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
};
const mapStateToProps = (state) => {
    return {
        storedData: state.deposit.data.storedData
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onFormSubmit: (num) => {
            event.preventDefault();
            dispatch(storeAddress(num))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(depositForm);