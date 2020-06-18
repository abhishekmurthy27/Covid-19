import React, { Component } from 'react';
import {Api} from '../Api'
import {
    Table,
    Jumbotron,
    Row,
    Col,
    Container,
    CardBody,
    CardSubtitle,
    CardText,
    CardTitle,
    Card,
    Toast,
    ToastHeader,
    ToastBody,
    CardHeader,
    CardFooter,
    Button,
    Badge
} from 'reactstrap'
import { Route } from 'react-router-dom';

class LangingPage extends Component{
    state = {
        cases_time_series:[],
        statewise:[],
        tested:[],
        travelhistory:[],
        mode:"",
        totalcase:0,
        totaldeath:0,
        totalrecovered:0
    }
    overview = () => {
        Api.time_series()
        .then(response => {
            this.setState({
                cases_time_series:response.data.cases_time_series,
                statewise:response.data.statewise,
                tested:response.data.tested,
                mode:'O'
            })
            var count = this.state.cases_time_series.length;
            this.setState({
                totalcase:this.state.cases_time_series[count-1].totalconfirmed,
                totaldeath:this.state.cases_time_series[count-1].totaldeceased,
                totalrecovered:this.state.cases_time_series[count-1].totalrecovered,
            })
            this.dashBoard()
        })
        .catch(error => {
            console.log(error)
        })
    }
    componentDidMount(){
        this.overview()
    }
    stateWise = () => {
        this.setState({
            mode:"S"
        })
        this.dashBoard()
    }
    travelHistory = () => {
        Api.travel_history()
            .then(response => {
                this.setState({
                    travelhistory:response.data.travel_history,
                    mode:"T"
                })
                this.dashBoard()
            })
            .catch(error =>{
                console.log(error)
            })
    }
    logout = () => {
        localStorage.clear();
        window.history.back();
    }
    headerData = () => {
        return(
            <div>
                <Row>
                    <Col xs="6" sm="4">
                        <Card color="primary">
                            <CardBody>
                                <Row>
                                    <Col xs="2" sm="3">
                                        <i class="fa fa-bed fa-4x" aria-hidden="true"></i>
                                    </Col>
                                    <Col xs="6" sm="6">
                                        <CardTitle>Total Confirmed</CardTitle>
                                        <CardSubtitle>{this.state.totalcase}</CardSubtitle>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs="6" sm="4">
                        <Card color="success">
                            <CardBody>
                                <Row>
                                    <Col xs="2" sm="2">
                                        <i class="fa fa-child fa-4x" aria-hidden="true"></i>
                                    </Col>
                                    <Col xs="6" sm="6">
                                        <CardTitle>Total Recovered</CardTitle>
                                        <CardSubtitle>{this.state.totalrecovered}</CardSubtitle>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs="6" sm="4">
                        <Card color="danger">
                            <CardBody>
                                <Row>
                                    <Col xs="2" sm="2">
                                        <i class="fa fa-times fa-4x" aria-hidden="true"></i>
                                    </Col>
                                    <Col xs="6" sm="6">
                                        <CardTitle>Total Death</CardTitle>
                                        <CardSubtitle>{this.state.totaldeath}</CardSubtitle>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
    openMap = (e) => {
        var latlong = e.target.dataset.latlong;
    }
    dashBoard = () => {
        if(this.state.mode === 'O'){
            return(
                <div class="mt-2 overview">
                    <h1 class="h2">Covid Cases till date</h1>
                    {this.headerData()}
                    <div class="table-responsive mt-4 tableFixHead">
                        <table class="table table-striped table-sm">
                            <thead class="thead-dark">
                                <tr>
                                    <th>Date</th>
                                    <th>Daily Confirmed</th>
                                    <th>Daily Deceased</th>
                                    <th>Daily Recovered</th>
                                    <th>Total Confirmed</th>
                                    <th>Total Deceased</th>
                                    <th>Total Recovered</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.cases_time_series && this.state.cases_time_series.map((result,Key) => {
                                    return(
                                        <tr>
                                            <td>{result.date}</td>
                                            <td>{result.dailyconfirmed}</td>
                                            <td>{result.dailydeceased}</td>
                                            <td>{result.dailyrecovered}</td>
                                            <td>{result.totalconfirmed}</td>
                                            <td>{result.totaldeceased}</td>
                                            <td>{result.totalrecovered}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        }else if(this.state.mode === "S"){
            return(
                <div class="statewise">
                    <h1 class="h2 mb-4">State Wise</h1>
                    <Container>
                        <Row xs="3">
                            {this.state.statewise && this.state.statewise.map((result,key) => {
                                    return(
                                        <Col xs="6" sm="4">
                                            <Card>
                                                <CardHeader>
                                                {result.state}
                                                </CardHeader >
                                                <CardBody>
                                                    <CardText>
                                                        Confirmed <Badge color="primary">{result.confirmed}</Badge><br/>
                                                        Active - <Badge color="warning">{result.active}</Badge><br/>
                                                        Recovered - <Badge color="success">{result.recovered}</Badge><br/>
                                                        Death - <Badge color="danger">{result.deaths}</Badge><br/>
                                                        {result.statenotes !== "" ?
                                                            <span>
                                                                Notes - {result.statenotes}
                                                            </span>
                                                            :
                                                            ""
                                                        }
                                                    </CardText>
                                                </CardBody>
                                                <CardFooter>
                                                    Last Update - {result.lastupdatedtime}
                                                </CardFooter>
                                            </Card>
                                        </Col>
                                    )
                            })}
                        </Row>
                    </Container>
                </div>
            )
        }else{
            return(
                <div>
                    <div class="mt-2">
                    <h1 class="h2">Travel History</h1>
                    {this.headerData()}
                        <div class="table-responsive mt-4 tableFixHead">
                            <table class="table table-striped table-sm">
                                <thead class="thead-dark">
                                    <tr>
                                        <th>Case #</th>
                                        <th>Patient ID</th>
                                        <th>Address</th>
                                        <th>Map</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.travelhistory && this.state.travelhistory.map((result,key) => {
                                        return(
                                            <tr>
                                                <td>{result._cn6ca}</td>
                                                <td>{result.pid}</td>
                                                <td>{result.address}</td>
                                                <td><a href="#" onClick={this.openMap} data-latlong = {result.latlong}>View Map</a></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )
        }
    }
    render(){
        return(
            <div >
                <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
                    <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Covid - 19</a>
                    <ul class="navbar-nav px-3">
                        <li class="nav-item text-nowrap">
                            <a class="nav-link" href="#" onClick={this.logout}>Sign out</a>
                        </li>
                    </ul>
                </nav>
                <div class="container-fluid">
                    <div class="row">
                        <nav class="col-md-2 d-none d-md-block bg-light sidebar fixed-left">
                            <div class="sidebar-sticky navbar-fixed-left">
                                <ul class="nav flex-column">
                                    <li class="nav-item">
                                        <a class="nav-link active" href = "#" onClick = {this.overview}>
                                        Overview <span class="sr-only">(current)</span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link active" href = "#" onClick = {this.stateWise}>
                                        State Wise
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href = "#" onClick = {this.travelHistory}>
                                        Travel History
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                        <main role="main" class="col-12 col-md-10  bd-content">
                            {this.dashBoard()}
                        </main>
                    </div>
                </div>
            </div>
        )
    }
}

export default LangingPage