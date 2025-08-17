export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto"></div>
          <div
            className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-accent rounded-full animate-spin mx-auto"
            style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
          ></div>
        </div>
        <div className="space-y-2">
          <h2 className="font-sans text-xl font-semibold text-foreground">Loading OmniAvatar</h2>
          <p className="font-serif text-muted-foreground">Preparing your AI avatar experience...</p>
        </div>
      </div>
    </div>
  )
}
