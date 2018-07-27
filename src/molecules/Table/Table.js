import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './Table.styl';

class Table extends Component {
  constructor(props) {
    super(props);
    this.renderCells = this.renderCells.bind(this);
    this.renderRows = this.renderRows.bind(this);
    this.renderCaption = this.renderCaption.bind(this);
  }

  getQA(cells) {
    if (cells.length > 0 && cells[0].qa) {
      return cells[0].qa;
    }

    return undefined;
  }

  renderCells(cells) {
    let colClasses = [];
    let headClasses = [];

    if (this.props.colClasses) {
      colClasses = this.props.colClasses.split(' ');
    }
    colClasses.push('dc-cell');

    if (this.props.headClasses) {
      headClasses = this.props.headClasses.split(' ');
    }

    return cells.map((cell, i) => (
      cell.isHeader ? (
        <th
          key={`cell-${i}`}
          data-element="Cell"
          data-cell-type="Header"
          style={this.props.headStyle}
          className={headClasses.join(' ')}
          dangerouslySetInnerHTML={{ __html: cell.text }}
        />
      ) : (
        <td
          key={`cell-${i}`}
          data-element="Cell"
          style={this.props.colStyle}
          className={colClasses.join(' ')}
          dangerouslySetInnerHTML={{ __html: cell.text }}
        />
      )
    ));
  }

  renderRows() {
    let rowClasses = [];

    if (this.props.rowClasses) {
      rowClasses = this.props.rowClasses.split(' ');
    }

    return this.props.rows.map((row, i) => (
      <tr
        key={`row-${i}`}
        style={this.props.rowStyle}
        className={rowClasses.join(' ')}
        data-qa={this.getQA(row.cells)}
      >
        {this.renderCells(row.cells)}
      </tr>
    ));
  }

  renderCaption() {
    let caption = null;

    if (this.props.caption) {
      caption = (
        <caption data-element="Caption" className="dc-table-caption">
          {this.props.caption}
        </caption>
      );
    }

    return caption;
  }

  render() {
    const header = this.props.children;
    let classes = [];

    if (this.props.classes) {
      classes = this.props.classes.split(' ');
    }

    classes.push('dc-button');

    return (
      <div>
        {header}
        <table data-component="Table" className="dc-table">
          {this.renderCaption()}
          <tbody>
            {this.renderRows()}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.displayName = 'Table';

Table.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  caption: PropTypes.string,
  rowStyle: PropTypes.shape(),
  colStyle: PropTypes.shape(),
  headStyle: PropTypes.shape(),
  classes: PropTypes.string,
  rowClasses: PropTypes.string,
  colClasses: PropTypes.string,
  headClasses: PropTypes.string
};

Table.defaultProps = {
  children: [],
  caption: '',
  rowStyle: {},
  colStyle: {},
  headStyle: {},
  classes: '',
  rowClasses: '',
  colClasses: '',
  headClasses: ''
};

export default Table;
