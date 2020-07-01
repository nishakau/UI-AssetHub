import React, { Component } from 'react'
import './index.css';
import Form from 'react-bootstrap/Form';
import FiltersList from './filterList';
export class Filters extends Component {
  render() {
    return (
      <div>
        <h5>Filter by</h5>
        <div className="filters">
          <Form>
            <FiltersList />
          </Form>
        </div>
      </div>
    )
  }
}

export default Filters
