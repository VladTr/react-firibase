import React, {Component} from 'react';
import Table from './components/Table/Table';
import Loader from './components/Loader/Loader';
import Pagination from './components/Pagination/Pagination';
import {connect} from 'react-redux';
import './App.css';

const recordsPerPage: number = 5;

class App extends Component<{ onInit: (users: any[]) => {}, users: any }> {
    state = {
        table: {
            headers: [
                {name: 'id', order: 'asc'},
                {name: 'email', order: null},
                {name: 'name', order: null},
                {name: 'lastActive', order: null}
            ]
        },
        page: 1,
        sortBy: 'id'
    };

    componentDidMount() {
        fetch('https://react-table.firebaseio.com/users.json')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const users = [];
                for (let id in data) {
                    users.push({
                        id,
                        email: data[id].email,
                        name: data[id].name,
                        lastActive: data[id].lastActive,
                    });
                }
                this.props.onInit(users);
            });
    }

    clickedHandler = (page: number) => {
        this.setState({page})
    };

    orderChangedHandler = (name: string) => {
        const headers = this.state.table.headers;
        headers.forEach((header: any) => {
            if (header.name === name) {
                header.order = header.order === 'asc' ? 'desc' : 'asc';
            } else {
                header.order = null;
            }
        });
        this.setState({
            table: {
                headers
            },
            page: 1,
            sortBy: name
        });
    };

    render() {
        let len: number = 0;
        let allUsers = [];
        let users: any[] = [];
        if (this.props.users && this.props.users.length) {
            allUsers = this.props.users;
            const order = this.state.table.headers
                .find((header: any) => header.name === this.state.sortBy).order;

            allUsers = allUsers.sort((a: any, b: any) => {
                if (order === 'desc') {
                    if (a[this.state.sortBy] > b[this.state.sortBy]) {
                        return 1
                    } else return -1
                } else {
                    if (a[this.state.sortBy] < b[this.state.sortBy]) {
                        return 1
                    } else return -1
                }
            });

            len = Math.ceil(allUsers.length / recordsPerPage);
            const from = recordsPerPage * this.state.page - recordsPerPage;
            const to = from + recordsPerPage;
            users = allUsers.slice(from, to);
        }

        return this.props.users.length ? (
            <div className="App">
                Hi there
                <Table
                    headers={this.state.table.headers}
                    users={users}
                    orderChanged={this.orderChangedHandler}
                />
                <Pagination
                    active={this.state.page}
                    clicked={this.clickedHandler}
                    items={
                        Array.from({length: len}, (v, k) => k + 1)
                    }
                />
            </div>
        ) : <Loader/>
    }
}

const mapStateToProps = (state: any) => ({
    users: state.users
});

const mapDispatchToProps = (dispatch: any) => ({
    onInit: (users: any[]) => dispatch({type: "INIT", payload: users})
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
