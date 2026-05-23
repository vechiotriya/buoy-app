import React from 'react'
import ErrorPage from '../components/ErrorPage'

type ErrorProps = {
  message: string;
  retry: () => void;
}
const Error = ({message, retry}: ErrorProps) => {
  return (
    <ErrorPage message={message} retry={retry}/>
  )
}

export default Error