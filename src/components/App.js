import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

import Layout from './Layout';
import Form from './Form';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { data: null };
  }

  async componentDidMount() {
    const { API_KEY } = process.env; // get api key from .env file
    const response = await fetch(`http://data.fixer.io/api/latest?access_key=${API_KEY}`); // make a request to fixer.io
    const json = await response.json(); // response is JSON format
    this.setState({ data: json }); // update the component with the new data state
  }

  render () {
    const { data } = this.state;

    return (
      <Layout>
        {data && data.success
          ? <Form base={data.base} rates={data.rates} />
          : <CircularProgress />
        }
      </Layout>
    )
  }
}

export default App;
