import React, {Component} from 'react';
import Table from './components/Table/Table';
import Loader from './components/Loader/Loader';
import Pagination from './components/Pagination/Pagination';
import './App.css';

const recordsPerPage: number = 5;

class App extends Component {
    state = {
        table: {
            headers: ['id', 'email', 'name', 'last Active']
        },
        users: [],
        page: 1
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
                this.setState({users});
            });
    }

    clicked = (page: number) => {
        this.setState({page})
    };

    render() {
        let len: number = 0;
        let users: any[] = [];
        if (this.state.users && this.state.users.length) {
            len = Math.ceil(this.state.users.length/recordsPerPage);
            const from = recordsPerPage*this.state.page - recordsPerPage;
            const to = from + recordsPerPage;
            users = this.state.users.slice(from, to);
        }

        return this.state.users.length ? (
            <div className="App">
                Hi there
                <Table headers={this.state.table.headers} users={users}/*users={this.state.users}*//>
                <Pagination
                    active={this.state.page}
                    clicked={this.clicked}
                    items={
                        Array.from({length: len}, (v, k) => k+1)
                    }
                />
            </div>
        ) : <Loader/>
    }
}

export default App;
