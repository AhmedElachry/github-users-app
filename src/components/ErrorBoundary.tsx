import { Component } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
          <h1 className="text-5xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            Oops!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Something went wrong.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">
            {this.state.error?.message || "An unexpected error occurred"}
          </p>
          <Link
            to="/"
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            onClick={() => this.setState({ hasError: false })}
          >
            Back to Home
          </Link>
        </div>
      );
    }

    return this.props.children;
  }
}
