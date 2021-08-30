import React from "react";
import {
  Row,
  Container,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";
import axios from "axios";

const key = "c17ed300017fc92410981d613c6e7933";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country: "",
      value: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };
  
  componentDidMount() {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=dubai&appid=${key}&units=metric`
      )
      .then((response) => {
        console.log(response);
        this.setState({ temp: response.data.main.temp.toFixed(1).replace(/\.0$/, "") });
        this.setState({ country: response.data.name });
        this.setState({ abbr: response.data.sys.country });
        this.setState({
          description: response.data.weather[0].description,
        });
        this.setState({ iconCode: response.data.weather[0].icon });
        this.setState({
          icon:
            "http://openweathermap.org/img/w/" + this.state.iconCode + ".png",
        });

        this.setState({ wind: response.data.wind.speed.toFixed(1).replace(/\.0$/, "") });
        this.setState({ humidity: response.data.main.humidity });
      });
  }

  handleSubmit(event) {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=${key}&units=metric`
      )
      .then((response) => {
        console.log(response);
        this.setState({ temp: response.data.main.temp.toFixed(1).replace(/\.0$/, "") });
        this.setState({ country: response.data.name });
        this.setState({ abbr: response.data.sys.country });
        this.setState({
          description: response.data.weather[0].description,
        });
        this.setState({ iconCode: response.data.weather[0].icon });
        this.setState({
          icon:
            "http://openweathermap.org/img/w/" + this.state.iconCode + ".png",
        });

        this.setState({ wind: response.data.wind.speed.toFixed(1).replace(/\.0$/, "") });
        this.setState({ humidity: response.data.main.humidity });
      })
      .catch(function (error) {
        console.log(error);
        alert("Please input a valid country or city");
      });
    //
    this.setState({ country: this.state.value });
    event.preventDefault();
  }

  render() {
    return (
      <>
        <Container className="container">
          <Row>
            <Col sm={{ size: 6, offset: 3 }}>
              <Card style={{ height: "60vh" }}>
                <Col sm={{ size: 6, offset: 3 }}>
                  <form onSubmit={this.handleSubmit}>
                    <input
                      className="form__field"
                      type="text"
                      value={this.state.value}
                      placeholder="Search for any country or city"
                      onChange={this.handleChange}
                    />
                    <input
                      className="btn btn--primary btn--inside"
                      onSubmit={this.handleSubmit}
                      type="submit"
                      value="Search"
                    />
                  </form>
                </Col>
                <Col sm={{ size: 12 }}>
                  <CardBody className="card-body">
                    <CardTitle className="title">
                      Weather in {this.state.country}
                    </CardTitle>
                    <CardTitle className="temp-title" tag="h5">
                      {this.state.temp} °C
                    </CardTitle>
                    <CardText className="card-text" style={{fontSize:"1.6em" , fontWeight:"500"}}>
                      {this.state.description}
                      <img
                        className="card-img"
                        src={this.state.icon}
                        alt={this.state.description}
                      />{" "}
                    </CardText>
                    <CardText>Humidity : {this.state.humidity}%</CardText>
                    <CardText>Wind : {this.state.wind} Km/h</CardText>
                  </CardBody>
                </Col>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Main;
