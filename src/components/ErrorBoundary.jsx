import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 bg-red-900 min-h-screen text-white font-mono z-50">
          <h1 className="text-3xl font-bold mb-4">REACT RENDER CRASH</h1>
          <h2 className="text-xl text-red-300">{this.state.error && this.state.error.toString()}</h2>
          <details className="mt-4 whitespace-pre-wrap text-sm bg-black p-4 rounded border border-white/20">
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
