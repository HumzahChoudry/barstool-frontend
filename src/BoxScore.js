import React from "react";
import { Header, Table, Container } from "semantic-ui-react";

class BoxScore extends React.Component {
  renderHeader = () => {
    return (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
          {this.props.data.home_period_scores.map((score, index) => {
            console.log("index", index);
            return <Table.HeaderCell>{index + 1}</Table.HeaderCell>;
          })}
          {this.renderSportTotalHeaders()}
        </Table.Row>
      </Table.Header>
    );
  };
  renderSportTotalHeaders = () => {
    switch (this.props.data.league) {
      case "MLB":
        return (
          <>
            <Table.HeaderCell>R</Table.HeaderCell>
            <Table.HeaderCell>H</Table.HeaderCell>
            <Table.HeaderCell>E</Table.HeaderCell>
          </>
        );
      case "NBA":
        return <span>TOTAL</span>;
      default:
    }
  };
  renderGameData = () => {
    return (
      <Table.Body>
        <Table.Row>{this.renderTeamData("home")}</Table.Row>
        <Table.Row>{this.renderTeamData("away")}</Table.Row>
      </Table.Body>
    );
  };
  renderBoxscoreTeamUnits = prefix => {
    return this.props.data[`${prefix}_period_scores`].map(score => (
      <Table.Cell>{score}</Table.Cell>
    ));
  };
  renderSportResults = prefix => {
    switch (this.props.data.league) {
      case "MLB":
        return (
          <>
            <Table.Cell>
              {this.props.data[`${prefix}_batter_totals`].runs}
            </Table.Cell>
            <Table.Cell>
              {this.props.data[`${prefix}_batter_totals`].hits}
            </Table.Cell>
            <Table.Cell>{this.props.data[`${prefix}_errors`]}</Table.Cell>
          </>
        );
      default:
    }
  };
  renderTeamData = prefix => {
    const teamAbbreviation = this.props.data[`${prefix}_team`].abbreviation;
    return (
      <>
        <label>{teamAbbreviation}</label>
        {this.renderBoxscoreTeamUnits(prefix)}
        {this.renderSportResults(prefix)}
      </>
    );
  };
  renderBoxscoreDetails = () => {
    return (
      <Table.Footer fullWidth>
        {this.renderTeamDetail("away")}
        {this.renderGameStatus()}
        {this.renderTeamDetail("home")}
      </Table.Footer>
    );
  };
  renderTeamDetail = prefix => {
    return (
      <Table.HeaderCell colSpan="6">
        <p>{this.props.data[`${prefix}_team`].last_name}</p>
        <small>{this.props.data[`${prefix}_team`].abbreviation}</small>
        <p>No record available</p>
      </Table.HeaderCell>
    );
  };
  renderGameStatus = () => {
    const info = this.props.data.event_information;
    switch (info.status) {
      case "completed":
        return "Final";
      case "scheduled":
        return `Scheduled: \n${info.start_date_time}`;
      default:
    }
  };

  render() {
    console.log(this.props.data);
    // const style1 = { background: "#203731" };
    // const style2 = { background: "#002244" };

    return (
      <>
        <Table className="boxscore container">
          {this.renderHeader()}
          {this.renderGameData()}
          {this.renderBoxscoreDetails()}
        </Table>

        {/*<div className="boxscore">
          <div className="boxscore__team boxscore__team--header">
            <label />
            <div className="boxscore__team__units">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
            </div>
            <div className="boxscore__team__results">
              <span>TOTAL</span>
            </div>
          </div>
          <div className="boxscore__team boxscore__team--away">
            <label>NYJ</label>
            <div className="boxscore__team__units">
              <span>0</span>
              <span>3</span>
              <span>0</span>
              <span>7</span>
            </div>
            <div className="boxscore__team__results">
              <span>10</span>
            </div>
          </div>
          <div className="boxscore__team boxscore__team--home">
            <label>NE</label>
            <div className="boxscore__team__units">
              <span>14</span>
              <span>3</span>
              <span>7</span>
              <span>10</span>
            </div>
            <div className="boxscore__team__results">
              <span>33</span>
            </div>
          </div>
          <div className="boxscore__details">
            <div
              className="boxscore__details__team boxscore__details__team--away"
              style={style1}
            >
              <p>
                <strong>JETS</strong>
                <small>NYJ</small>
              </p>
              <span>56-38</span>
            </div>
            <div className="boxscore__details__info">
              <strong>Final</strong>
            </div>
            <div
              className="boxscore__details__team boxscore__details__team--home"
              style={style2}
            >
              <p>
                <strong>PATRIOTS</strong>
                <small>NE</small>
              </p>
              <span>56-38</span>
            </div>
          </div>
        </div>*/}
      </>
    );
  }
}
export default BoxScore;
