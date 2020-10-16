import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/Header/Header.jsx'
import Main from './components/Main/Main.jsx'
import Features from './components/Features/Features.jsx'
import Footer from './components/Footer/Footer.jsx'
import Home from './components/Home/Home.jsx'
import Calendar from './components/Calendar/Calendar.jsx'
import Details from './components/Details/Details.jsx'
import { createBrowserHistory } from "history";


import FetchData from './service/FetchData'

const history = createBrowserHistory();

class App extends React.Component {

    fetchData = new FetchData()

    state = {
        rocket: 'Falcon 1',
        rocketFeatures: null,
        rockets: [],
        company: null,
        links: {
            website: "https://www.spacex.com/",
            flickr: "https://www.flickr.com/photos/spacex/",
            twitter: "https://twitter.com/SpaceX",
            elon_twitter: "https://twitter.com/elonmusk"
        },
        summary: "SpaceX designs, manufactures and launches advanced rockets and spacecraft. The company was founded in 2002 to revolutionize space technology, with the ultimate goal of enabling people to live on other planets.",
    }

    componentDidMount() {
        this.updateRocket();
        this.updateLinks();
        this.updateSummary();
        this.updateCompany();
    }

    updateCompany() {
        this.fetchData.getCompany().then(company => this.setState({ company }));
    }

    updateLinks() {
        this.fetchData.getCompany().then(comp_info => comp_info.links).then(links => this.setState({ links }));
    }

    updateSummary() {
        this.fetchData.getCompany().then(comp_info => comp_info.summary).then(summary => this.setState({ summary }));
    }

    updateRocket() {
        this.fetchData.getRocket()
            .then(data => {
                this.setState({ rockets: data.map(item => item.name) });
                return data;
            })
            .then(data => data.find(item => item.name === this.state.rocket))
            .then(rocketFeatures => this.setState({ rocketFeatures }))
    }

    changeRocket = rocket => {
        this.setState(
            {
                rocket
            }, this.updateRocket());
    }

    render() {
        console.log(this.state)
        return (
            <BrowserRouter history={history}>
                <Header rockets={this.state.rockets} changeRocket={this.changeRocket} />

                <Route exact path='/'>
                    {this.state.company && <Home company={this.state.company} />}
                </Route>
                <Route path='/rocket'>

                    <Features rocket={this.state.rocket} rocketFeatures={this.state.rocketFeatures} />
                </Route>

                <Route path='/calendar'>
                    <Calendar />
                </Route>

                <Route path="/details/:id" children={<Details history={history} />} />

                <Footer links={this.state.links} />
            </BrowserRouter>
        );
    };
}

export default App;
