import React from "react";
import { Table } from "semantic-ui-react";

export function renderBaseballTotalHeaders() {
  return (
    <>
      <Table.HeaderCell>R</Table.HeaderCell>
      <Table.HeaderCell>H</Table.HeaderCell>
      <Table.HeaderCell>E</Table.HeaderCell>
    </>
  );
}
export function renderBaseballResults(prefix) {
  return (
    <>
      <Table.Cell active>
        {this.props.data[`${prefix}_batter_totals`].runs}
      </Table.Cell>
      <Table.Cell active>
        {this.props.data[`${prefix}_batter_totals`].hits}
      </Table.Cell>
      <Table.Cell active>{this.props.data[`${prefix}_errors`]}</Table.Cell>
    </>
  );
}

export function renderBaseballStats(data) {
  return (
    <>
      <div className="all-player-stats">
        <div className="team-player-stats">
          {renderBaseballBattingStats(data, "away")}
        </div>
        <div className="team-player-stats">
          {renderBaseballBattingStats(data, "home")}
        </div>
      </div>
      <div className="all-player-stats">
        <div className="team-player-stats">
          {renderBaseballPitchingStats(data, "away")}
        </div>
        <div className="team-player-stats">
          {renderBaseballPitchingStats(data, "home")}
        </div>
      </div>
    </>
  );
}
function renderBaseballBattingStats(data, prefix) {
  const logo = getTeamLogo(data, prefix);
  return (
    <>
      <h3>
        Batting Stats <img className="team-icon" alt="team-logo" src={logo} />
      </h3>
      <Table striped sortable className="stats-table">
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Position</Table.HeaderCell>
        <Table.HeaderCell>AB</Table.HeaderCell>
        <Table.HeaderCell>R</Table.HeaderCell>
        <Table.HeaderCell>H</Table.HeaderCell>
        <Table.HeaderCell>RBI</Table.HeaderCell>
        <Table.HeaderCell>BB</Table.HeaderCell>
        {data[`${prefix}_batters`].map(stats => {
          return (
            <Table.Row>
              <Table.Cell>{stats.display_name}</Table.Cell>
              <Table.Cell>{stats.position}</Table.Cell>
              <Table.Cell>{stats.at_bats}</Table.Cell>
              <Table.Cell>{stats.runs}</Table.Cell>
              <Table.Cell>{stats.hits}</Table.Cell>
              <Table.Cell>{stats.rbi}</Table.Cell>
              <Table.Cell>{stats.walks}</Table.Cell>
            </Table.Row>
          );
        })}
      </Table>
    </>
  );
}
function renderBaseballPitchingStats(data, prefix) {
  const logo = getTeamLogo(data, prefix);
  return (
    <>
      <h3>
        Pitching Stats <img className="team-icon" alt="team-logo" src={logo} />
      </h3>
      <Table striped sortable className="stats-table">
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>IP</Table.HeaderCell>
        <Table.HeaderCell>H</Table.HeaderCell>
        <Table.HeaderCell>R</Table.HeaderCell>
        <Table.HeaderCell>ER</Table.HeaderCell>
        <Table.HeaderCell>BB</Table.HeaderCell>
        <Table.HeaderCell>K</Table.HeaderCell>
        <Table.HeaderCell>HR</Table.HeaderCell>
        <Table.HeaderCell>PC-ST</Table.HeaderCell>
        <Table.HeaderCell>ERA</Table.HeaderCell>
        {data[`${prefix}_pitchers`].map(stats => {
          return (
            <Table.Row>
              <Table.Cell>{stats.display_name}</Table.Cell>
              <Table.Cell>{stats.innings_pitched}</Table.Cell>
              <Table.Cell>{stats.hits_allowed}</Table.Cell>
              <Table.Cell>{stats.runs_allowed}</Table.Cell>
              <Table.Cell>{stats.errors}</Table.Cell>
              <Table.Cell>{stats.walks}</Table.Cell>
              <Table.Cell>{stats.strike_outs}</Table.Cell>
              <Table.Cell>{stats.home_runs_allowed}</Table.Cell>
              <Table.Cell>
                {stats.pitch_count} {stats.pitches_strikes}
              </Table.Cell>
              <Table.Cell>{stats.era}</Table.Cell>
            </Table.Row>
          );
        })}
      </Table>
    </>
  );
}

const getTeamLogo = (data, prefix) => {
  switch (data[`${prefix}_team`].team_id) {
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
