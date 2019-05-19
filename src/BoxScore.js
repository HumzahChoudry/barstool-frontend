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
        return <Table.HeaderCell>TOTAL</Table.HeaderCell>;
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
            <Table.Cell active>
              {this.props.data[`${prefix}_batter_totals`].runs}
            </Table.Cell>
            <Table.Cell active>
              {this.props.data[`${prefix}_batter_totals`].hits}
            </Table.Cell>
            <Table.Cell active>
              {this.props.data[`${prefix}_errors`]}
            </Table.Cell>
          </>
        );
      case "NBA":
        return (
          <>
            <Table.Cell active>
              {this.props.data[`${prefix}_totals`].points}
            </Table.Cell>
          </>
        );
      default:
    }
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
        {this.renderSportResults(prefix)}
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
      case "scheduled":
        return (
          <strong className="footer-cell">
            Scheduled: \n${info.start_date_time}
          </strong>
        );
      default:
    }
  };
  renderPlayerStats = () => {
    return this.props.renderFunctions.renderSportStats(this.props.data);
  };
  // renderSportStats = () => {
  //   return
  // switch (this.props.data.league) {
  //   case "MLB":
  //     return this.renderBaseballStats();
  //   case "NBA":
  //     return this.renderBasketballStats();
  //   default:
  // }
  // };
  renderBasketballStats = () => {
    return (
      <>
        <div className="all-player-stats">
          <div className="team-player-stats">
            {this.renderBasketballStarters("away", true)}
          </div>
          <div className="team-player-stats">
            {this.renderBasketballStarters("home", true)}
          </div>
        </div>
        <div className="all-player-stats">
          <div className="team-player-stats">
            {this.renderBasketballStarters("away", false)}
          </div>
          <div className="team-player-stats">
            {this.renderBasketballStarters("home", false)}
          </div>
        </div>
      </>
    );
  };
  renderBasketballBench = () => {};
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
  renderBasketballStarters = (prefix, isStarter) => {
    const logo = this.getTeamLogo(prefix);
    return (
      <>
        <h3>
          {isStarter ? "Starters" : "Bench"}
          <img className="team-icon" alt="team-logo" src={logo} />
        </h3>
        <Table
          striped
          sortable
          textAlign="center"
          attached="top"
          className="stats-table"
        >
          <Table.HeaderCell>Starters</Table.HeaderCell>
          <Table.HeaderCell>MIN</Table.HeaderCell>
          <Table.HeaderCell>FG</Table.HeaderCell>
          <Table.HeaderCell>3PT</Table.HeaderCell>
          <Table.HeaderCell>FT</Table.HeaderCell>

          <Table.HeaderCell>REB</Table.HeaderCell>
          <Table.HeaderCell>AST</Table.HeaderCell>
          <Table.HeaderCell>STL</Table.HeaderCell>
          <Table.HeaderCell>BLK</Table.HeaderCell>
          <Table.HeaderCell>TO</Table.HeaderCell>
          <Table.HeaderCell>PF</Table.HeaderCell>
          <Table.HeaderCell>PTS</Table.HeaderCell>
          {this.props.data[`${prefix}_stats`]
            .filter(s => s.is_starter === isStarter)
            .map(stats => {
              return (
                <Table.Row>
                  <Table.Cell>{stats.display_name}</Table.Cell>
                  <Table.Cell>{stats.minutes}</Table.Cell>
                  <Table.Cell>
                    {stats.field_goals_made} - {stats.field_goals_attempted}
                  </Table.Cell>
                  <Table.Cell>
                    {stats.three_point_field_goals_made} -{" "}
                    {stats.three_point_field_goals_attempted}
                  </Table.Cell>
                  <Table.Cell>
                    {stats.free_throws_made} - {stats.free_throws_attempted}
                  </Table.Cell>

                  <Table.Cell>
                    {stats.offensive_rebounds + stats.defensive_rebounds}
                  </Table.Cell>
                  <Table.Cell>{stats.assists}</Table.Cell>
                  <Table.Cell>{stats.steals}</Table.Cell>
                  <Table.Cell>{stats.blocks}</Table.Cell>
                  <Table.Cell>{stats.turnovers}</Table.Cell>
                  <Table.Cell>{stats.personal_fouls}</Table.Cell>
                  <Table.Cell>{stats.points}</Table.Cell>
                </Table.Row>
              );
            })}
        </Table>
      </>
    );
  };
  // // renderBaseballStats = () => {
  // //   return (
  // //     <>
  // //       <div className="all-player-stats">
  // //         <div className="team-player-stats">
  // //           {this.renderBaseballBattingStats("away")}
  // //         </div>
  // //         <div className="team-player-stats">
  // //           {this.renderBaseballBattingStats("home")}
  // //         </div>
  // //       </div>
  // //       <div className="all-player-stats">
  // //         <div className="team-player-stats">
  // //           {this.renderBaseballPitchingStats("away")}
  // //         </div>
  // //         <div className="team-player-stats">
  // //           {this.renderBaseballPitchingStats("home")}
  // //         </div>
  // //       </div>
  // //     </>
  // //   );
  // // };
  // renderBaseballBattingStats = prefix => {
  //   const logo = this.getTeamLogo(prefix);
  //   return (
  //     <>
  //       <h3>
  //         Batting Stats <img className="team-icon" alt="team-logo" src={logo} />
  //       </h3>
  //       <Table striped sortable className="stats-table">
  //         <Table.HeaderCell>Name</Table.HeaderCell>
  //         <Table.HeaderCell>Position</Table.HeaderCell>
  //         <Table.HeaderCell>AB</Table.HeaderCell>
  //         <Table.HeaderCell>R</Table.HeaderCell>
  //         <Table.HeaderCell>H</Table.HeaderCell>
  //         <Table.HeaderCell>RBI</Table.HeaderCell>
  //         <Table.HeaderCell>BB</Table.HeaderCell>
  //         {this.props.data[`${prefix}_batters`].map(stats => {
  //           return (
  //             <Table.Row>
  //               <Table.Cell>{stats.display_name}</Table.Cell>
  //               <Table.Cell>{stats.position}</Table.Cell>
  //               <Table.Cell>{stats.at_bats}</Table.Cell>
  //               <Table.Cell>{stats.runs}</Table.Cell>
  //               <Table.Cell>{stats.hits}</Table.Cell>
  //               <Table.Cell>{stats.rbi}</Table.Cell>
  //               <Table.Cell>{stats.walks}</Table.Cell>
  //             </Table.Row>
  //           );
  //         })}
  //       </Table>
  //     </>
  //   );
  // };
  // renderBaseballPitchingStats = prefix => {
  //   const logo = this.getTeamLogo(prefix);
  //   return (
  //     <>
  //       <h3>
  //         Pitching Stats{" "}
  //         <img className="team-icon" alt="team-logo" src={logo} />
  //       </h3>
  //       <Table striped sortable className="stats-table">
  //         <Table.HeaderCell>Name</Table.HeaderCell>
  //         <Table.HeaderCell>IP</Table.HeaderCell>
  //         <Table.HeaderCell>H</Table.HeaderCell>
  //         <Table.HeaderCell>R</Table.HeaderCell>
  //         <Table.HeaderCell>ER</Table.HeaderCell>
  //         <Table.HeaderCell>BB</Table.HeaderCell>
  //         <Table.HeaderCell>K</Table.HeaderCell>
  //         <Table.HeaderCell>HR</Table.HeaderCell>
  //         <Table.HeaderCell>PC-ST</Table.HeaderCell>
  //         <Table.HeaderCell>ERA</Table.HeaderCell>
  //         {this.props.data[`${prefix}_pitchers`].map(stats => {
  //           return (
  //             <Table.Row>
  //               <Table.Cell>{stats.display_name}</Table.Cell>
  //               <Table.Cell>{stats.innings_pitched}</Table.Cell>
  //               <Table.Cell>{stats.hits_allowed}</Table.Cell>
  //               <Table.Cell>{stats.runs_allowed}</Table.Cell>
  //               <Table.Cell>{stats.errors}</Table.Cell>
  //               <Table.Cell>{stats.walks}</Table.Cell>
  //               <Table.Cell>{stats.strike_outs}</Table.Cell>
  //               <Table.Cell>{stats.home_runs_allowed}</Table.Cell>
  //               <Table.Cell>
  //                 {stats.pitch_count} {stats.pitches_strikes}
  //               </Table.Cell>
  //               <Table.Cell>{stats.era}</Table.Cell>
  //             </Table.Row>
  //           );
  //         })}
  //       </Table>
  //     </>
  //   );
  // };

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
      </div>
    );
  }
}
export default BoxScore;
