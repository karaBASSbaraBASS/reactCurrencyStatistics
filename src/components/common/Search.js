import React from 'react';
import Loading from './Loading';
import { API_URL } from '../../config';
import { handleResponse } from '../../helpers'
import './Search.css';

class Search extends React.Component {
    constructor() {
        super();

        this.handleChange = this.handleChange.bind(this);
        
        this.state = {
            searchQuery: '',
            loading: false,
        };
    }
   
    handleChange(event) {
        const searchQuery = event.target.value;

        this.setState({ searchQuery })
        
        //if searchQuery isn`t present, don`t send request to server
        //skipping error "cath" in feth metod
        if (!searchQuery) {
            return '';
        }

        this.setState({ loading:true });

        fetch(`${API_URL}/autocomplete?searchQuery=${searchQuery}`)
            .then(handleResponse)
            .then((result) => {
                console.log(result);
                this.setState({ loading:false });
            });
            // .catch((error) => {
            //     this.setState({ 
            //         loading: false,
            //         error: error.errorMessage,
            //     });
            // })
        console.log(this.state);
    }

    render() {
        const { loading } = this.state;

        return (
            <div className="Search">
                <span className="Search-icon"/>
                <input
                    className="Search-input"
                    type="text"
                    placeholder="Currency name" 
                    onChange={this.handleChange}
                />
                {loading &&
                    <div className="Search-loading">
                        <Loading
                            width='12px'
                            height='12px'
                        />
                    </div>
                }
            </div>
        )
    }
}

export default Search;