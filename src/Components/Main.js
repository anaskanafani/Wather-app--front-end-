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

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country: "dubai",
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
      .get("/weather", {
        params: {
          q: "dubai",
        },
      })
      .then((response) => {
        console.log(response);
        this.setState({ temp: response.data.temp_c });
        this.setState({ abbr: response.data.parsedBody.sys.country });
        this.setState({
          description: response.data.parsedBody.weather[0].description,
        });
        this.setState({ iconCode: response.data.parsedBody.weather[0].icon });
        this.setState({
          icon:
            "http://openweathermap.org/img/w/" + this.state.iconCode + ".png",
        });

        this.setState({ wind: response.data.parsedBody.wind.speed });
        this.setState({ humidity: response.data.parsedBody.main.humidity });
      });
  }

  handleSubmit(event) {
    axios
      .get("/weather", {
        params: {
          q: this.state.value,
        },
      })
      .then((response) => {
        this.setState({ temp: response.data.temp_c });

        this.setState({ wind: response.data.parsedBody.wind.speed });
        this.setState({ humidity: response.data.parsedBody.main.humidity });

        console.log(response.data.parsedBody);
        console.log(this.state.wind);
        this.setState({
          description: response.data.parsedBody.weather[0].description,
        });
        this.setState({ iconCode: response.data.parsedBody.weather[0].icon });
        this.setState({
          icon:
            "http://openweathermap.org/img/w/" + this.state.iconCode + ".png",
        });
      })
      .catch(function (error) {
        console.log(error);
        alert(error);
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
                    <CardText className="card-text">
                      <img
                        className="card-img"
                        src={this.state.icon}
                        alt={this.state.description}
                      />{" "}
                      {this.state.description}
                    </CardText>
                    <CardText className="card-con">Humidity : {this.state.humidity}%</CardText>
                    <CardText className="card-con">Wind : {this.state.wind} Km/h</CardText>
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
