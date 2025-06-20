"use client"

import { Component, type ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("Error caught by boundary:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <Card className="m-4">
            <CardContent className="p-8 text-center">
              <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Something went wrong</h2>
              <p className="text-gray-600 mb-4">We're having trouble loading this content.</p>
              <button
                onClick={() => this.setState({ hasError: false })}
                className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors"
              >
                Try Again
              </button>
            </CardContent>
          </Card>
        )
      )
    }

    return this.props.children
  }
}
