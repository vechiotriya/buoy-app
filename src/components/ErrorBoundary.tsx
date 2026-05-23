"use client";
import React from "react";
import CustomText from "./CustomText";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, info: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    if (this.props.onError) {
      this.props.onError(error, info);
    }
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div style={{ padding: 16 }}>
          <CustomText size={18} variant="bold" style={{ marginBottom: 8 }}>
          Something went wrong. Try again later.
          </CustomText>
        </div>
      );
    }
    return this.props.children;
  }
}