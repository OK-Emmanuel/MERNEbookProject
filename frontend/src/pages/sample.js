class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  render() {
    return (
      <div>
        <h1>Calculator</h1>
        <input
          type="number"
          value={this.state.value}
          onChange={(e) => this.setState({ value: e.target.value })}
        />
        <button onClick={() => this.setState({ value: this.state.value + 1 })}>
          Increment
        </button>
      </div>
    );
  }
}