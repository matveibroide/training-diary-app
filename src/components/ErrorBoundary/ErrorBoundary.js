import React, { Component } from 'react';

class ErrorBoundary extends Component {

constructor(props) {
super(props);
this.state = { hasError: false };
}

componentDidCatch(error, errorInfo) {
// Update state to display fallback UI
this.setState({ hasError: true });
// You can also log the error to an error reporting service
console.error(error, errorInfo);
}

render() {
if (this.state.hasError) {
    // Fallback UI when an error occurs
    return <div>Something went wrong.</div>;
}
return this.props.children;
}
}

export default ErrorBoundary;