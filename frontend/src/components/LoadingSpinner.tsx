interface LoadingSpinnerProps {
  cssClasses?: string
  isLoading: boolean
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  isLoading,
  cssClasses
}) => {
  return (
    <>
      {isLoading && (
        <div
          className={`animate-loading-spinner mx-auto box-border rounded-full border-[5px] border-solid border-transparent border-t-gray-300 border-r-gray-300 border-b-gray-300 dark:border-t-stone-800 ${cssClasses}`}
        />
      )}
    </>
  )
}

export default LoadingSpinner
