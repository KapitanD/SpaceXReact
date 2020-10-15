import React from 'react';

import Header from './components/Header/Header.jsx'
import Main from './components/Main/Main.jsx'
import Features from './components/Features/Features.jsx'
import Footer from './components/Footer/Footer.jsx'
import FetchData from './service/FetchData'


class App extends React.Component {

    fetchData = new FetchData()

    state = {
        rocket: 'Falcon 1',
        rocketFeatures: null,
        rockets: [],
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
    }

    updateLinks() {
        this.fetchData.getCompany().then(comp_info => comp_info.links).then(links => this.setState({links}));
    }

    updateSummary() {
        this.fetchData.getCompany().then(comp_info => comp_info.summary).then(summary => this.setState({summary}));
    }

    updateRocket() {
        this.fetchData.getRocket()
            .then(data => {
                this.setState({rockets: data.map(item => item.name)});
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
            <>
                <Header rockets={this.state.rockets} changeRocket={this.changeRocket}/>
                <Main rocket={this.state.rocket} />
                <Features rocket={this.state.rocket} rocketFeatures={this.state.rocketFeatures} />
                <Footer links={this.state.links} summary={this.state.summary}/>
            </>
        );
    };
}

export default App;
