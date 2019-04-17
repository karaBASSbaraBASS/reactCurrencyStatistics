import React from 'react';
import { handleResponse } from '../../helpers';
import { API_URL } from '../../config';
import Loading from '../common/Loading';
import Table from '../list/Table';
import Pagination from '../list/Pagination';


class List extends React.Component {
    constructor() {
        super();

        this.state = {
            loading: false,
            currencies: [],
            error: null,
            totalPages: 0,
            page: 1,
        };

        this.handlePaginationClick = this.handlePaginationClick.bind(this);
    }

    componentDidMount() {
        this.fetchCurrencies();
    }

    fetchCurrencies() {
        this.setState({
            loading: true
        });

        const {page} = this.state;

        fetch(`${API_URL}/cryptocurrencies?page=${page}&perPage=20`)
        .then(handleResponse)
        .then((data) => {
            const {currencies, totalPages} = data;

            this.setState({
                currencies,
                totalPages,
                loading: false,
            })
        })
        .catch((error) => {
            this.setState({
                error: error.errorMessage,
                loading: false,
            })
        });
    }

    handlePaginationClick(direction) {
        let nextPage = this.state.page;
        
        //increment nextPage if direction variable is next, otherwise decrement
        nextPage = direction === 'next' ? nextPage + 1 : nextPage - 1; 

        this.setState({
            page: nextPage
        }, () => {
            // call fetchCurrencies function inside setState`s callback
            // because we have to make sure first page state is updated
            this.fetchCurrencies();
        });
    }

    render() {
        const { loading, error, currencies, totalPages, page } = this.state;

        // render only loading component, if loading state is set to true
        if (loading) {
            return <div className="loading-container"><Loading/></div>
        }
        // render only error message, if error occured while fething data
        if (error) {
            return <div className="error">{this.state.error}</div>
        }

        return (
            <div>
                <Table 
                    currencies={currencies}
                />
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    handlePaginationClick={this.handlePaginationClick}
                />
            </div>
            
        )
    }
}

export default List;