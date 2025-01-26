export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen" aria-label="Loading">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
}

