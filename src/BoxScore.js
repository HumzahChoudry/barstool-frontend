import React from "react";
import { Header, Table, Container, Grid } from "semantic-ui-react";

class BoxScore extends React.Component {
  renderHeader = () => {
    return (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
          {this.props.data.home_period_scores.map((score, index) => {
            return <Table.HeaderCell>{index + 1}</Table.HeaderCell>;
          })}
          {this.props.renderFunctions.renderSportTotalHeaders()}
        </Table.Row>
      </Table.Header>
    );
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
  renderTeamData = prefix => {
    const logo = this.getTeamLogo(prefix);
    const teamAbbreviation = this.props.data[`${prefix}_team`].abbreviation;
    return (
      <>
        <Table.Cell>
          {teamAbbreviation}{" "}
          <img className="team-icon" alt="team-logo" src={logo} />
        </Table.Cell>
        {this.renderBoxscoreTeamUnits(prefix)}
        {this.props.renderFunctions.renderSportResults.call(this, prefix)}
      </>
    );
  };
  renderBoxscoreDetails = () => {
    return (
      <div className="table-footer">
        {this.renderTeamDetail("away", "#0C2C56")}
        {this.renderGameStatus()}
        {this.renderTeamDetail("home", "#BA0021")}
      </div>
    );
  };
  renderTeamDetail = (prefix, color) => {
    let style = { background: `${color}` };
    return (
      <div className="footer-cell team-footer-cell" style={style}>
        <strong>{this.props.data[`${prefix}_team`].last_name}</strong>
        <br />
        <small>{this.props.data[`${prefix}_team`].abbreviation}</small>
        <p>52 - 28</p>
      </div>
    );
  };
  renderGameStatus = () => {
    const info = this.props.data.event_information;
    switch (info.status) {
      case "completed":
        return <strong className="footer-cell">Final</strong>;
      case "scheduled": //this is me assuming scheduled would be a status
        return (
          <strong className="footer-cell">
            Scheduled: \n${info.start_date_time}
          </strong>
        );
      default:
    }
  };
  renderPlayerStats = () => {
    return this.props.renderFunctions.renderSportStats.call(this);
  };
  getTeamLogo = prefix => {
    switch (this.props.data[`${prefix}_team`].team_id) {
      case "los-angeles-angels":
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Los_Angeles_Angels_of_Anaheim.svg/1200px-Los_Angeles_Angels_of_Anaheim.svg.png";
      case "oklahoma-city-thunder":
        return "https://upload.wikimedia.org/wikipedia/en/thumb/5/5d/Oklahoma_City_Thunder.svg/1200px-Oklahoma_City_Thunder.svg.png";
      case "miami-heat":
        return "https://images.homedepot-static.com/productImages/7f44bdc2-11e4-42e9-b206-6e6020540444/svn/red-applied-icon-wall-decals-nbop1601-64_1000.jpg";
      case "seattle-mariners":
        return "http://www.logospng.com/images/178/seattle-mariners-logo-png-transparent-amp-svg-vector-178132.png";
      default:
    }
  };

  render() {
    return (
      <div>
        <div className="boxscore">
          <Table definition textAlign="center" className="game-summary">
            {this.renderHeader()}
            {this.renderGameData()}
          </Table>
          {this.renderBoxscoreDetails()}
        </div>
        {this.renderPlayerStats()}
      </div>
    );
  }
}
export default BoxScore;
