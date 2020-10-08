import React from "react";
import axios from "axios";
import styles from "./Home.module.css";
import imageHeader from "../../images/head.png";
import Typography from "@material-ui/core/Typography";
import PickCountry from "../../components/PickCountry/PickCountry";
import Cards from "../../components/Cards/Cards";

class Home extends React.Component {
  state = {
    name: "",
    data: {},
  };

  componentDidMount() {
    this.getData();
    console.log("Bismillah");
  }

  getData = (country) => {
    let setUrl = "https://covid19.mathdro.id/api";
    setUrl = country ? `${setUrl}/countries/${country}` : setUrl;
    axios
      .get(setUrl)
      .then((response) => {
        // console.log(response);
        this.setState({
          data: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleCountryChange = (event) => {
    let country = event.target.value;
    this.getData(country);
    const setCountry = country ? country : "Global";
    this.props.history.push({
      search: "?country=" + setCountry,
    });
  };

  handleChange = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  render() {
    // console.log(this.state.data);
    const { data } = this.state;
    const lastUpdate = new Date(data.lastUpdate).toDateString();

    return (
      <div className={styles.container}>
        <img className={styles.image} src={imageHeader} alt="" />
        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
          Terakhir Update : {lastUpdate}
        </Typography>
        <PickCountry handleCountryChange={this.handleCountryChange} />
        <Cards data={data} />
        <h4>
          Built with <span className={styles.love}>&#9829;</span> by Galuh
          Prahadi Gumelar
        </h4>
      </div>
    );
  }
}

export default Home;
