import { useRouteError } from 'react-router-dom'

const ErrorBoundaryElement: React.FC = () => {
  const error = useRouteError()

  return <div>{JSON.stringify(error)}</div>
}

export default ErrorBoundaryElement
