import React from 'react';

class Search extends React.Component {
    state = {
        value: "",
        activeListType: 0
    }

    render() {
        return (
            <div>
            <input type="text" 
                value={this.state.value} 
                onChange={(ev) => {this.setState({ value: ev.target.value })}} 
                name="search"
                placeholder="Search..."
                />
            <div>
                <select 
                    defaultValue={this.state.activeListType} 
                    onChange={(ev) => {this.setState({ activeListType: ev.target.value })}}
                    >
                    <option value={0}>Talent</option>
                    <option value={1}>Project</option>
                </select>    
            </div>   
            <span>icon</span> 
        </div>
        )
    }
}

export default Search;