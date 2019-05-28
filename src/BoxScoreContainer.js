import React from "react";
import BoxScore from "./BoxScore";
import NavBar from "./NavBar";
import Loading from "./Loading";
import {
  renderBaseballTotalHeaders,
  renderBaseballResults,
  renderBaseballStats
} from "./sports/baseball";
import {
  renderBasketballTotalHeaders,
  renderBasketballResults,
  renderBasketballStats
} from "./sports/basketball";
class BoxScoreContainer extends React.Component {
  state = {
    data: null
  };
  componentDidMount() {
    //just a default game to display
    fetch("http://localhost:3001/games/eed38457-db28-4658-ae4f-4d4d38e9e212")
      .then(res => res.json())
      .then(data => {
        this.setState({ data });
      });
  }
  setGame = e => {
    fetch(`http://localhost:3001/games/${e.target.dataset.id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ data });
      });
  };
  convertLeagueToSport = league => {
    //this method will make more sense when we have multiple leagues that will render the same info, ex: NCAAF/NFL or all the soccer leagues
    switch (league) {
      case "MLB":
        return "baseball";
      case "NBA":
        return "basketball";
      case "NFL" || "NCAAF":
        return "football";
      default:
        return "something";
    }
  };
  getSportSpecificRenderMethods = () => {
    if (!this.state.data) return null;

    const sport = this.convertLeagueToSport(this.state.data.league);
    switch (sport) {
      case "baseball":
        return {
          renderSportTotalHeaders: renderBaseballTotalHeaders,
          renderSportResults: renderBaseballResults,
          renderSportStats: renderBaseballStats
        };
      case "basketball":
        return {
          renderSportTotalHeaders: renderBasketballTotalHeaders,
          renderSportResults: renderBasketballResults,
          renderSportStats: renderBasketballStats
        };
      default:
        return null;
    }
  };
  render() {
    const functions = this.getSportSpecificRenderMethods();
    return (
      <div>
        <NavBar setGame={this.setGame} />
        {this.state.data ? (
          <BoxScore data={this.state.data} renderFunctions={functions} />
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}
export default BoxScoreContainer;
